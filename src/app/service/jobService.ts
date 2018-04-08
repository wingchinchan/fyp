import {AngularFirestore} from 'angularfire2/firestore';
import 'rxjs/add/operator/switchMap';
import {Injectable} from '@angular/core';
import {UserService, User} from './userService';
import {ChatService} from './chatService';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';

export interface Job {
    name: string;
    ngClass: string;
    id: String;
    title: string;
}

export interface User {
    uid: string;
}

export interface JobApplication {
    uid: string;
    id: string;
}

export interface CommentFreelancer {
    uid: string;
    id: string;
}

export interface CommentCompany {
    uid: string;
    id: string;
}

export interface viewFreelancerComment {
    uid: string;
    id: string;
}

export interface Preference {
    uid: string;
    id: string;
}

@Injectable()
export class JobService {

    public currentUser: User;
    public user: User;
    public userForm: User;


    public jobs: Observable<Job>;

    // public currentJob: Job;
    // public jobSync = false;
    public job: Job;
    public jobApplication: JobApplication;

    // public commentRatingForFreelancer: CommentToFreelancer;

    constructor(private db: AngularFireDatabase, public afs: AngularFirestore, public userService: UserService, public chatService: ChatService) {
    }

    // getJobsBysearch(start, end): FirebaseListObservable<any> {
    //     return this.db.list('/job', {
    //         // return this.afs.collection('job', {
    //             query: {
    //             oderByChild: 'title',
    //             limitToFirst: 10,
    //             startAt: start,
    //             endAt: end
    //         }
    //     });
    //
    // }

    generateRecommendResult(jobCategory) {
        return this.afs.collection('job', ref =>
            ref.where('jobCategory', '==', jobCategory).orderBy('createdAt', 'desc')
        ).snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Job;
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        });
    };

    getJobs() {
        return this.afs.collection('job', ref =>
            ref.orderBy('createdAt', 'desc').limit(5)
        ).snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Job;
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        });
    };

    getMoreJob(offset: number) {
        return this.afs.collection('job', ref =>
            ref.orderBy('createdAt', 'desc').limit(offset)
        ).snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Job;
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        });
    }

    searchJobs(title, category) {
        return this.afs.collection('job', ref => {
                if (title !== '' && category !== '') {
                    return ref.where('jobCategory', '==', category).orderBy('title').startAt(title);
                } else if (title !== '') {
                    return ref.orderBy('title').startAt(title);
                } else if (category !== '') {
                    return ref.where('jobCategory', '==', category);
                }
            }
        ).snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Job;
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        });
    }

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
            case 'Banking':
                ngClass = 'btn btn-rounded btn-info';
                break;
            case 'Fashion Design':
                ngClass = 'btn btn-rounded btn-danger';
                break;
            case 'Graphics Design':
                ngClass = 'btn btn-rounded btn-danger';
                break;
            case 'Mobile Application Development':
                ngClass = 'btn btn-rounded btn-success';
                break;
            case 'Website Development':
                ngClass = 'btn btn-rounded btn-success';
                break;
            case 'Other':
                ngClass = 'btn btn-rounded btn-secondary';
                break;
            case 'Education':
                ngClass = 'btn btn-rounded btn-secondary';
                break;
        }
        this.userService.getUser().then(user => {
            // job.dueDate = new Date(job.dueDate);
            // const jobRef = this.afs.doc(`job/${job.id}`);
            // console.log(jobRef);
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
                    ngClass: 'btn btn-primary',
                    companyID: job.uid,
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

    getApplicationByCompany(id) {
        return this.afs.collection('jobApplication', ref =>
            ref.where('companyID', '==', id).orderBy('createdAt', 'desc')
        ).snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as JobApplication;
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        });
    };

    updateJobDetails(job, id) {
        this.afs.doc(`job/${id}`).update(
            {
                // title: job.title,
                ...job,
            }
        );
        console.log(...job);

    };

    deleteJob(job, id) {
        this.afs.doc(`job/${id}`).delete();
        console.log(...job);

    };

    updateJobApplicationStatus(jobApplication, id) {
        let ngClass = '';
        switch (jobApplication.status) {
            case 'Job Processing':
                ngClass = 'btn btn-info';
                break;
            case 'Job Finished':
                ngClass = 'btn btn-danger';
                break;
            case 'Accepted':
                ngClass = 'btn btn-success';
                break;
            case 'Rejected':
                ngClass = 'btn btn-secondary';
                break;
            case 'Waiting Reply':
                ngClass = 'btn btn-primary';
                break;
        }
        this.afs.doc(`jobApplication/${id}`).update(
            {
                // title: job.title,
                ...jobApplication,
                ngClass: ngClass,
            }
        );

        console.log(...jobApplication);

    };

    // getApplicationID(id) {
    //     return this.afs.doc<Job>(`jobApplication/${id}`).valueChanges();
    // }

    getApplicationByJob(id) {
        return this.afs.collection('jobApplication', ref =>
            ref.where('jobid', '==', id).orderBy('createdAt', 'desc')
        ).snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as JobApplication;
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        });
    };

    getApplicationByID(id) {
        return this.afs.doc<JobApplication>(`jobApplication/${id}`).valueChanges();
    }

    commentFreelancer(jobApplication, id) {
        this.userService.getUser().then(user => {
            this.afs.doc(`jobApplication/${id}`).update(
                {
                    ...jobApplication,
                    updatedAt: new Date(),
                    createdAt: new Date(),
                    // uid: user.uid,
                    jobApplicationID: id,
                }
            );
        });
    }

    commentCompany(jobApplication, id) {
        this.userService.getUser().then(user => {
            this.afs.doc(`jobApplication/${id}`).update(
                {
                    ...jobApplication,
                    updatedAt: new Date(),
                    createdAt: new Date(),
                    // uid: user.uid,
                    jobApplicationID: id,
                }
            );
        });
    }

    getCommentRecordByCompany(id) {
        return this.afs.doc<CommentFreelancer>(`commentRatingForFreelancer/${id}`).valueChanges();
    }

    // getCommentRecordByFreelancer(id) {
    //     return this.afs.doc<CommentCompany>(`commentRatingForCompany/${id}`).valueChanges();
    // }
    // setPreference(preference) {
    //     this.userService.getUser().then(user => {
    //         this.afs.collection('preference').add(
    //             {
    //                 ...preference,
    //                 updatedAt: new Date(),
    //                 createdAt: new Date(),
    //                 uid: user.uid
    //             }
    //         );
    //     });
    // }

}

