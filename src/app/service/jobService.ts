import {AngularFirestore} from 'angularfire2/firestore';
import 'rxjs/add/operator/switchMap';
import {Injectable} from '@angular/core';
import {UserService, User} from './userService';

import * as moment from 'moment';

export interface Job {
    name: string;
}

export interface User {
    uid: string;
}

export interface JobApplication {
    uid: string;
}

@Injectable()
export class JobService {

    public currentUser: User;
    public user: User;
    public userForm: User;

    constructor(public afs: AngularFirestore, public userService: UserService) {

    }


    getJobs() {
        return this.afs.collection('job', ref =>
            ref.orderBy('dueDate', 'desc')
        ).snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Job;
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        });
    };

    getJob(id) {
        return this.afs.doc<Job>(`job/${id}`).valueChanges();
    }

    postJob(job) {
        this.userService.getUser().then(user => {
            job.dueDate = new Date(job.dueDate);
            this.afs.collection('job').add(
                {
                    ...job,
                    updatedAt: new Date(),
                    createdAt: new Date(),
                    uid: user.uid
                }
            );
        });

    }

    updateJob(job, id) {
        this.afs.doc(`job/${id}`).update(
            {
                ...job,
                updatedAt: new Date(),
                createdAt: new Date()
            }
        );
    }


    applyJob(id) {
        this.userService.getUser().then(user => {
            this.afs.collection('jobApplication').add(
                {
                    jobid: id,
                    uid: user.uid,
                    status: 'Waiting Reply',
                    updatedAt: new Date(),
                    createdAt: new Date(),
                }
            );
        });
    }

    getApplication(id) {
        return this.afs.collection('jobApplication', ref =>
            ref.where('uid', '==', id)
                // .orderBy('createdAt', 'desc')
        ).snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as JobApplication;
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        });
    };
}