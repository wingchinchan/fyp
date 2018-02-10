import {AngularFirestore} from 'angularfire2/firestore';
import 'rxjs/add/operator/switchMap';
import {Injectable} from '@angular/core';
import {UserService} from './userService';
import {HttpClient} from '@angular/common/http';

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

    private baseURL: string = 'https://api.dialogflow.com/v1/query?v=20150910';
    private token: string = '9fd10ff6bb9c49ebaff7d087eff7860c';

    getChats() {
        return this.afs.collection('chat', ref => ref.orderBy('updatedDt', 'desc')
        ).snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Chat;
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        });
    };
    //
    // public getResponse(query: string) {
    //     let data = {
    //         query: query,
    //         lang: 'en',
    //         sessionId: '12345'
    //     };
    //     let access_token = `Bearer ${this.token}`;
    //     return this.http
    //         .post<ChatbotMessage>(this.baseURL, data, {
    //             headers: {
    //                 'Authorization': access_token,
    //             }
    //         });
    //
    // };

    public sendMessage(message: string, chat: Chat) {

        this.userService.getUser().then(user => {
            const chatMessage: Message = {
                user: user.uid,
                value: message,
                updatedDt: new Date()
            };
            chat.updatedDt = new Date();
            chat.lastMessage = message;
            chat.messages.push(chatMessage);
            this.afs.doc(`chat/${chat.id}`).update(chat);
        });
    }


// getJob(id) {
//     return this.afs.doc<Job>(`job/${id}`).valueChanges();
// }
//
// postJob(job) {
//     job.dueDate = new Date(job.dueDate);
//     console.log(job);
//     this.afs.collection('job').add(
//         {
//             ...job,
//             updatedAt: new Date(),
//             createdAt: new Date()
//         }
//     );
// }
//
// updateJob(job, id) {
//     this.afs.doc(`job/${id}`).update(
//         {
//             ...job,
//             updatedAt: new Date(),
//             createdAt: new Date()
//         }
//     );
// }

}