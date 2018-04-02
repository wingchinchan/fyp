import {Component} from '@angular/core';
import {UserService } from '../../../service/userService';
import {JobService, Job } from '../../../service/jobService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore } from 'angularfire2/firestore';
import {Router} from '@angular/router';
import {Observable} from "rxjs/Observable";


@Component({
    templateUrl: './searchJob.html',
    styleUrls: ['./searchJob.css'],
})
export class SearchJobComponent {
    public jobForm: FormGroup;
    public jobs: Observable<Job[]>;

    constructor(public userService: UserService, public jobService: JobService, public formBuilder: FormBuilder, public afs: AngularFirestore, public router: Router) {
        this.jobForm = formBuilder.group({
            title: [
                '', Validators.compose([])
            ],
            jobCategory: [
                '', Validators.compose([])
            ]
        });

    }

    searchJobs() {
        this.jobs = this.jobService.searchJobs(this.jobForm.value.title, this.jobForm.value.jobCategory);
    }
}

