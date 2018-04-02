import { Pipe, PipeTransform } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Pipe({
    name: 'jobApplication'
})

export class JobApplicationPipe implements PipeTransform {
    constructor(
        protected db: AngularFirestore
    ){}

    public transform(jobApplicationId: any, eventType: any) {
        return this.db.doc(`/jobApplication${jobApplicationId}`).valueChanges();
    }
}
