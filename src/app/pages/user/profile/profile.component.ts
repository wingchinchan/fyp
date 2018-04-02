import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserService, User} from '../../../service/userService';
import {JobService, Job, JobApplication, CommentCompany} from '../../../service/jobService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Router} from '@angular/router';
import {EmailValidator} from '../../landing/email';
import {Observable} from 'rxjs/Observable';


@Component({
    templateUrl: './profile.html',
    styleUrls: ['./profile.css'],
})
export class ProfileComponent {
    public application: Observable<JobApplication[]>;
    public applicationCompany: Observable<JobApplication[]>;
    public commentocompany: Observable<CommentCompany>;
    public profileForm: FormGroup;
    public user: User;
    public job: Job;
    public userForm: User;
    public jobs: Observable<Job[]>;

    id: string;
    uid: string

    constructor(public userService: UserService, public jobService: JobService, public formBuilder: FormBuilder, public afs: AngularFirestore, public router: Router) {
        this.userService.getUser().then(user => {
            console.log(user);
            this.user = user;
            this.userForm = user;
            this.application = this.jobService.getApplication(user.uid);
            this.applicationCompany = this.jobService.getApplicationByCompany(user.uid);
            this.jobs = this.jobService.getJobsByCompany(user.uid);


            console.log(this.application);
        });



    }

    hello() {
        console.log(this.user.uid);

    }

    updateProfile() {
        console.log('test');
        this.userService.updateProfile(this.userForm, this.user.uid);
        this.router.navigateByUrl('user/profile');
        alert('Update successfully');
    }

    goToDetail(jobApplication) {
        this.router.navigate(['/user/job', jobApplication.jobid]);
    }

    commentToCompany(jobApplication) {
        console.log(jobApplication.id);
        this.router.navigate(['/user/commentRatingToCompany', jobApplication.id]);
    }
    goManageJob(jobApplication) {
        this.router.navigate(['/user/editJob', jobApplication.jobid]);
    }
    viewFreelancerProfile(jobApplication) {
        this.router.navigate(['/user/viewProfileByOther', jobApplication.uid]);

    }
    viewCompanyProfile(jobApplication) {
        this.router.navigate(['/user/viewProfileOfCompany', jobApplication.companyID]);

    }

}

