import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {JobService, Job} from '../../../service/jobService';
import {Router} from '@angular/router';
import {User, UserService} from "../../../service/userService";

@Component({
    templateUrl: './getjob.html',
    styleUrls: ['./getjob.css'],
})

export class GetjobComponent {
    // public jobs: Observable<Job[]>;
    public jobs: Job[];
    public offset = 50;
    public preferenceJob: Observable<Job[]>;
    public user: User;
    uid: string;
    preference_jobCategory: string;


    constructor(public userService: UserService, public jobService: JobService, public router: Router) {
        this.userService.getUser().then(user => {
            console.log(user);
            this.user = user;

            console.log(user.preference_jobCategory);

            this.preferenceJob = this.jobService.generateRecommendResult(user.preference_jobCategory);
        });

        // this.jobs = this.jobService.getJobs();
        this.jobService.getMoreJob(this.offset).subscribe(jobs => {
            this.jobs = jobs;
        });
        // this.preferenceJob = this.jobService.getJobs();

    }


    goToDetail(job) {
        this.router.navigate(['/user/job', job.id]);
    }

    scrollHandler(e) {
        console.log(e);
        if (e === 'bottom') {
            this.offset += 5;
            this.jobService.getMoreJob(this.offset).subscribe(jobs => {
                this.jobs = jobs;
            });
        }
    }
}