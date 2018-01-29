import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserService, User} from '../../../service/userService';
import {JobService, Job, JobApplication} from '../../../service/jobService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Router} from '@angular/router';
import {EmailValidator} from '../../landing/email';
import { Observable } from 'rxjs/Observable';



@Component({
    templateUrl: './profile.html',
    styleUrls: ['./profile.css'],
})
export class ProfileComponent {
    public application: Observable<JobApplication[]>;

    public profileForm: FormGroup;
    public user: User;
    public job: Job;
    public userForm: User;
    constructor(public userService: UserService, public jobService: JobService, public formBuilder: FormBuilder, public afs: AngularFirestore, public router: Router) {

        this.userService.getUser().then(user => {
            console.log(user);
            this.user = user;
            this.userForm = user;
            this.application = this.jobService.getApplication(user.uid);
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
}

