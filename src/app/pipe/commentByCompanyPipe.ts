import { Pipe, PipeTransform } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Pipe({
    name: 'commentRatingForFreelancer'
})

export class CommentByCompanyPipe implements PipeTransform {
    constructor(
        protected db: AngularFirestore
    ){}

    public transform(commentByCompanyID: any, eventType: any) {
        return this.db.doc(`/commentRatingForFreelancer${commentByCompanyID}`).valueChanges();
    }
}
