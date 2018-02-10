import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {ChatService, Chat} from '../../../service/chatService';
import {UserService, User} from '../../../service/userService';

@Component({
    templateUrl: './chat.html',
    styleUrls: ['./chat.css'],
})

export class ChatComponent {
    public chats: Observable<Chat[]>;
    public currentChat: Chat;
    public message: string;
    public currentUser: User;
    public findLastChat = false;

    constructor(public router: Router, public chatService: ChatService, public userService: UserService) {
        this.chats = this.chatService.getChats();
        this.userService.getUser().then(user => {
            this.chats.subscribe(chats => {
                console.log(chats);
                chats.forEach(chat => {
                    console.log(chat);
                    if (chat.user1 === user.uid) {
                        if (this.findLastChat === false) {
                            this.currentChat = chat;
                            this.findLastChat = true;
                        }
                    }
                    ;
                    if (chat.user2 === user.uid) {
                        if (this.findLastChat === false) {
                            this.findLastChat = true;
                            this.currentChat = chat;
                        }
                    }
                    ;
                });
            });
            this.currentUser = user;
        });
    }

    sendMessage() {
        this.chatService.sendMessage(this.message, this.currentChat);
        this.message = '';
    }

    selectedChat(chat) {
        this.currentChat = chat;
    }

}