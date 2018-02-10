import { Pipe, PipeTransform } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Pipe({
    name: 'chat'
})

export class ChatPipe implements PipeTransform {
    constructor(
        protected db: AngularFirestore
    ){}

    public transform(chatId: any, eventType: any) {
        return this.db.doc(`/chat/${chatId}`).valueChanges();
    }
}
