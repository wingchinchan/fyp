import {AngularFirestore} from 'angularfire2/firestore';
import 'rxjs/add/operator/switchMap';
import {Injectable} from '@angular/core';
export interface Chat {
    user1: string;
    user2: string;
}

@Injectable()
export class ChatService {
    constructor(public afs: AngularFirestore) {

    }

    getChats() {
        return this.afs.collection('chat'
        ).snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Chat;
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        });
    };

    // getJob(id) {
    //     return this.afs.doc<Job>(`job/${id}`).valueChanges();
    // }
    //
    // postJob(job) {
    //     job.dueDate = new Date(job.dueDate);
    //     console.log(job);
    //     this.afs.collection('job').add(
    //         {
    //             ...job,
    //             updatedAt: new Date(),
    //             createdAt: new Date()
    //         }
    //     );
    // }
    //
    // updateJob(job, id) {
    //     this.afs.doc(`job/${id}`).update(
    //         {
    //             ...job,
    //             updatedAt: new Date(),
    //             createdAt: new Date()
    //         }
    //     );
    // }

}