import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JobService, Job, JobApplication} from '../../../service/jobService';
import {UserService} from '../../../service/userService';

import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidator} from '../../landing/email';
import {AngularFirestore} from "angularfire2/firestore";


@Component({
    templateUrl: './commentRating.html',
    styleUrls: ['./commentRating.css'],
})
export class CommentRatingComponent {
    id: string;
    title: string;
    public job: Job;
    public application: Observable<JobApplication>;
    starsCount: number;


    public commentFreelancerForm: FormGroup;

    constructor(private route: ActivatedRoute, public userService: UserService, public jobService: JobService, public formBuilder: FormBuilder, public afs: AngularFirestore, public router: Router) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.application = this.jobService.getApplicationByID(this.id);
        this.commentFreelancerForm = formBuilder.group({
            rateFreelancer: [
                '', Validators.compose([
                    Validators.nullValidator,
                    Validators.required
                ])
            ],
            commentFreelancer: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
        });
    }

    test(jobApplication) {
        console.log(jobApplication.id);
    }
    commentFreelancer(jobApplication) {
        alert('Comment and rate freelancer successfully');
        this.jobService.commentFreelancer(this.commentFreelancerForm.value, jobApplication.id);
        this.router.navigateByUrl('user/manageJob');
    }
    redirect() {
        // alert('Comment and rate freelancer successfully');
        this.router.navigateByUrl('user/manageJob');
    }
}