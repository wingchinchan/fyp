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
    templateUrl: './commentRatingToCompany.html',
    styleUrls: ['./commentRatingToCompany.css'],
})
export class CommentRatingToCompanyComponent {
    id: string;
    title: string;
    public job: Job;
    public application: Observable<JobApplication>;
    starsCount: number;


    public commentCompanyForm: FormGroup;

    constructor(private route: ActivatedRoute, public userService: UserService, public jobService: JobService, public formBuilder: FormBuilder, public afs: AngularFirestore, public router: Router) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.application = this.jobService.getApplicationByID(this.id);
        this.commentCompanyForm = formBuilder.group({
            rateCompany: [
                '', Validators.compose([
                    Validators.nullValidator,
                    Validators.required
                ])
            ],
            commentCompany: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
        });
    }

    test(jobApplication) {
        console.log(jobApplication.id);
    }

    commentCompany(jobApplication) {
        alert('Comment and rate freelancer successfully');
        this.jobService.commentCompany(this.commentCompanyForm.value, jobApplication.id);
        this.router.navigateByUrl('user/profile');
    }

    redirect() {
        // alert('Comment and rate freelancer successfully');
        this.router.navigateByUrl('user/profile');
    }
}