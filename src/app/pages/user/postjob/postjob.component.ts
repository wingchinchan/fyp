import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidator} from '../../landing/email';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {JobService} from '../../../service/jobService'
import {Router} from '@angular/router';
import {User, UserService} from "../../../service/userService";

@Component({
    templateUrl: './postjob.html',
    styleUrls: ['./postjob.css'],
})
export class PostjobComponent {
    public jobForm: FormGroup;
    public jobCollection: AngularFirestoreCollection<any>;
    public user: User;

    constructor(public formBuilder: FormBuilder, public afs: AngularFirestore, public jobService: JobService, public router: Router, public userService: UserService) {
        this.jobForm = formBuilder.group({
            title: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            jobCategory: [
                '', Validators.compose([
                    Validators.nullValidator,
                    Validators.required
                ])
            ],
            quota: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            jobDesc: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            email: [
                '', Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                    EmailValidator.isValid
                ])
            ],
            eduLv: [
                '', Validators.compose([
                    Validators.nullValidator,
                    Validators.required
                ])
            ],
            salary: [
                '', Validators.compose([
                    Validators.nullValidator,
                    Validators.required
                ])
            ],
            skills: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            expectedExp: [
                '', Validators.compose([
                    Validators.nullValidator,
                    Validators.required
                ])
            ],
            location: [
                '', Validators.compose([
                    Validators.nullValidator,
                    Validators.required
                ])
            ],
        });
        this.userService.getUser().then(user => {
            this.jobForm.setValue({
                email: user.email,
                title: '',
                jobCategory: '',
                eduLv: '',
                salary: '',
                quota: '',
                jobDesc: '',
                skills: '',
                expectedExp: '',
                location: '',

            });
        });


    }

    postJob() {
        this.jobService.postJob(this.jobForm.value);
        this.router.navigateByUrl('user/manageJob');
        alert('Post job successfully');
    }

    redirect() {
        this.router.navigateByUrl('user/manageJob');
    }
}

