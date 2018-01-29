import { Pipe, PipeTransform } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Pipe({
    name: 'job'
})

export class JobPipe implements PipeTransform {
    constructor(
        protected db: AngularFirestore
    ){}

    public transform(jobId: any, eventType: any) {
        return this.db.doc(`/job/${jobId}`).valueChanges();
    }
}
