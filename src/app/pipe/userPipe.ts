import { Pipe, PipeTransform } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Pipe({
    name: 'user'
})

export class UserPipe implements PipeTransform {
    constructor(
        protected db: AngularFirestore
    ){}

    public transform(userId: any, eventType: any) {
        return this.db.doc(`/user/${userId}`).valueChanges();
    }
}
