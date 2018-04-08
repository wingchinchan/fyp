import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JobService, Job, JobApplication, CommentFreelancer} from '../../../service/jobService';
import {User, UserService} from '../../../service/userService';

import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
import {EmailValidator} from "../../landing/email";



@Component({
    templateUrl: './editJobDetails.html',
    styleUrls: ['./editJobDetails.css'],
})
export class EditJobDetailsComponent {
    id: string;
    uid: string;
    title: string;
    public application: Observable<JobApplication[]>;
    public commentofreelancer: Observable<CommentFreelancer>;
    // public job: Job;
    public EditJob: Observable<Job>;
    public userForm: User;
    public user: User;
    public jobForm: FormGroup;



    constructor(private route: ActivatedRoute, public userService: UserService, public jobService: JobService, public formBuilder: FormBuilder, public afs: AngularFirestore, public router: Router) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.EditJob = this.jobService.getJob(this.id);
        this.application = this.jobService.getApplicationByJob(this.id);
        this.commentofreelancer = this.jobService.getCommentRecordByCompany(this.id);
        console.log(this.id);

        // console.log(commentRatingForFreelancer);


        // console.log(jobApplication.id);

        // this.jobService.getEditJob().then(job => {
        //     console.log(job);
        //     this.job = job;
        //     this.editJobForm = job;
        // });


        // this.userService.getUser().then(user => {
        //     console.log(user);
        //     this.user = user;
        //     this.userForm = user;
        // });

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

    updateJobDetails(job) {
        console.log('test');
        this.jobService.updateJobDetails(job, this.id);
        this.router.navigateByUrl('user/manageJob');
        alert('Edit job details successfully');
    }

    hello(commentRatingForFreelancer) {
        // console.log(this.application);
    }

    updateJobApplicationStatus(jobApplication) {
        console.log(jobApplication.id);
        this.jobService.updateJobApplicationStatus(jobApplication, jobApplication.id);
        // this.router.navigateByUrl('user/manageJob');
        alert('Update job application successfully');
    }

    commentToFreelancer(jobApplication) {
        console.log(jobApplication.id);
        this.router.navigate(['/user/commentRating', jobApplication.id]);
    }
    viewFreelancerProfile(jobApplication) {
        this.router.navigate(['/user/viewProfileByOther', jobApplication.uid]);

    }


}

