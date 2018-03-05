import {Component, ElementRef, DoCheck, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {ChatService, Chat} from '../../../service/chatService';
import {UserService, User} from '../../../service/userService';

@Component({
    templateUrl: './chat.html',
    styleUrls: ['./chat.css'],
})

export class ChatComponent implements DoCheck {
    public chats: Observable<Chat[]>;
    public currentChat: Chat;
    public message: string;
    public currentUser: User;
    public findLastChat = false;
    public currentTarget: any;
    @ViewChild('messageScroll') private myScrollContainer: ElementRef;

    constructor(public router: Router, public chatService: ChatService, public userService: UserService) {
        this.chats = this.chatService.getChats();
        this.userService.getUser().then(user => {
            this.currentUser = user;
            this.chats.subscribe(chats => {
                console.log(chats);
                chats.forEach(chat => {
                    if (chat.user1 === this.currentUser.uid) {
                        if (this.findLastChat === false) {
                            this.currentChat = chat;
                            this.findLastChat = true;

                        }
                    }
                    ;
                    if (chat.user2 === this.currentUser.uid) {
                        if (this.findLastChat === false) {
                            this.findLastChat = true;
                            this.currentChat = chat;
                        }
                    }
                    ;
                });
            });
        });
    }

    ngDoCheck() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
            return true;
        } catch(err) { }

    }

    async sendMessage() {
        this.chatService.sendMessage(this.message, this.currentChat);
        this.message = '';
    }

    selectedChat(chat, event) {
        var target = event.currentTarget;
        if (this.currentTarget !== undefined) {
            if (target !== this.currentTarget) {
                this.currentTarget.className = "chat-row";
                this.currentTarget = target;
                target.className = "chat-row-active";
            }
        } else {
            this.currentTarget = target;
            this.currentTarget.className = "chat-row-active";
        }
        console.log(chat);
        this.currentChat = chat;
    }

}