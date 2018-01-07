import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/switchMap';
import {Injectable} from '@angular/core';

export interface Job {
    name: string;
}

@Injectable()
export class JobService {
    constructor(public afs: AngularFirestore) {

    }

    getJobs() {
        return this.afs.collection('job').snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Job;
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });
    };

    getJob(id) {
        return this.afs.doc<Job>(`job/${id}`).valueChanges();
    }
}