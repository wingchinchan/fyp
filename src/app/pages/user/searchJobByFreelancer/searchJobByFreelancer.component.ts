import { Component, OnInit } from '@angular/core';
import {UserService } from '../../../service/userService';
import {JobService, Job } from '../../../service/jobService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore } from 'angularfire2/firestore';
import {Router} from '@angular/router';
import {Observable} from "rxjs/Observable";
import { Subject } from "rxjs/Subject"


@Component({
    templateUrl: './searchJobByFreelancer.html',
    styleUrls: ['./searchJobByFreelancer.css'],

})
export class SearchJobByFreelancerComponent {
    public jobForm: FormGroup;
    public jobs: Observable<Job[]>;

    // job;
    // startAt = new Subject()
    // endAt = new Subject()

    constructor(public userService: UserService, private jobService: JobService, public formBuilder: FormBuilder, public afs: AngularFirestore, public router: Router) {
        this.jobForm = formBuilder.group({
            title: [
                '', Validators.compose([])
            ],
            jobCategory: [
                '', Validators.compose([])
            ]
        });

    }

    // ngOnInit() {
    //     this.jobService.getJobsBysearch(this.startAt, this.endAt)
    //         .subscribe(job => this.job = job);


    // search($event) {
    //     let q = $event.target.value
    //     this.startAt.next(q)
    //     this.endAt.next(q + '\uf8ff');
    // }

    searchJobs() {
        this.jobs = this.jobService.searchJobs(this.jobForm.value.title, this.jobForm.value.jobCategory);
    }
    goToDetail(job) {
        this.router.navigate(['/user/job', job.id]);
    }
}

