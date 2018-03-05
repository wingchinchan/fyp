import {AngularFirestore} from 'angularfire2/firestore';
import 'rxjs/add/operator/switchMap';
import {Injectable} from '@angular/core';
import {UserService, User} from './userService';
import {ChatService} from './chatService';

export interface Job {
    name: string;
    ngClass: string;
    id: String;
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

    constructor(public afs: AngularFirestore, public userService: UserService, public chatService: ChatService) {

    }


    getJobs() {
        return this.afs.collection('job', ref =>
            ref.orderBy('createdAt', 'desc')
        ).snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Job;
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        });
    };

    getJobsByCompany(id) {
        return this.afs.collection('job', ref =>
            ref.where('uid', '==', id).orderBy('createdAt', 'desc')
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

    isApplied(jobid, uid) {

        return this.afs.collection('jobApplication', ref =>
            ref.where('jobid', '==', jobid)
                .where('uid', '==', uid)
        ).snapshotChanges();
    }

    postJob(job) {
        let ngClass = '';
        switch (job.jobCategory) {
            case 'Accounting':
                ngClass = 'btn btn-rounded btn-info';
                break;
            case 'Design':
                ngClass = 'btn btn-rounded btn-danger';
                break;
            case 'Programming':
                ngClass = 'btn btn-rounded btn-success';
                break;
            case 'Other':
                ngClass = 'btn btn-rounded btn-secondary';
                break;
        }
        this.userService.getUser().then(user => {
            // job.dueDate = new Date(job.dueDate);
            this.afs.collection('job').add(
                {
                    ...job,
                    ngClass: ngClass,
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


    applyJob(job, jobId) {
        this.userService.getUser().then(user => {
            this.afs.collection('jobApplication').add(
                {
                    jobid: jobId,
                    uid: user.uid,
                    status: 'Waiting Reply',
                    updatedAt: new Date(),
                    createdAt: new Date(),
                }
            );
            this.chatService.createChat(job.uid, user.uid);
        });
    }

    getApplication(id) {
        return this.afs.collection('jobApplication', ref =>
            ref.where('uid', '==', id).orderBy('createdAt', 'desc')
        ).snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as JobApplication;
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        });
    };
}