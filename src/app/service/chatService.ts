import {AngularFirestore} from 'angularfire2/firestore';
import 'rxjs/add/operator/switchMap';
import {Injectable} from '@angular/core';
import {UserService} from './userService';
import {HttpClient, HttpHeaders} from '@angular/common/http';

export interface ChatbotMessage {
    id: string;
    result: {
        fulfillment: {
            speech: string;
        };
    };
}

export interface Message {
    user: string;
    value: string;
    updatedDt: Date;
}

export interface Chat {
    user1: string;
    user2: string;
    id: string;
    messages: Message[];
    lastMessage: string;
    updatedDt: Date;
}

@Injectable()
export class ChatService {
    constructor(public afs: AngularFirestore, public userService: UserService, public http: HttpClient) {

    }

    private baseURL = 'https://api.dialogflow.com/v1/query?v=20150910';
    private token = '9fd10ff6bb9c49ebaff7d087eff7860c';

    getChats() {
        return this.afs.collection<Chat>('chat', ref => ref.orderBy('updatedDt', 'desc')
        ).valueChanges();
    };

    //
    getResponse(query: string) {
        const data = {
            query: query,
            lang: 'en',
            sessionId: '12345'
        };
        const access_token = `Bearer ${this.token}`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': access_token
            })
        };
        return this.http
            .post<ChatbotMessage>(this.baseURL, data, httpOptions).toPromise();

    };

    async sendMessage(message: string, chat: Chat) {

        const user = await this.userService.getUser();
        const chatMessage: Message = {
            user: user.uid,
            value: message,
            updatedDt: new Date()
        };
        chat.updatedDt = new Date();
        let botUser = '';
        if (chat.user1 === user.uid) {
            botUser = chat.user2;
        } else {
            botUser = chat.user1;
        }
        const bot = await this.getResponse(message);
        const botMessage: Message = {
            user: botUser,
            value: bot.result.fulfillment.speech,
            updatedDt: new Date()
        };
        if (chat.messages === undefined) {
            chat.messages = [];
            chat.messages.push(chatMessage);
            chat.messages.push(botMessage);
        } else {
            chat.messages.push(chatMessage);
            chat.messages.push(botMessage);
        }
        chat.lastMessage = bot.result.fulfillment.speech;
        this.afs.doc(`chat/${chat.id}`).update(chat);
    }
}