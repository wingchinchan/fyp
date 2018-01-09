
import { Component} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {ChatService, Chat} from '../../../service/chatService';
@Component({
    templateUrl: './chat.html',
    styleUrls: ['./chat.css'],
})

export class ChatComponent {
    public chats: Observable<Chat[]>;
    constructor(public router: Router, public chatService: ChatService) {
        this.chats = this.chatService.getChats();
    }

}