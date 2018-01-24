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

    constructor(public router: Router, public chatService: ChatService, public userService: UserService) {
        this.chats = this.chatService.getChats();
        this.chatService.getChats().subscribe(chat => {
            console.log(chat);
            this.currentChat = chat[0];
        });
        this.userService.getUser().then(user => {
            this.currentUser = user;
        });
    }

    sendMessage() {
        this.chatService.sendMessage(this.message, this.currentChat);
        this.message = '';
    }

}