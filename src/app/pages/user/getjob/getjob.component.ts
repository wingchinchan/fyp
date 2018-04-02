import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {JobService, Job} from '../../../service/jobService';
import {Router} from '@angular/router';

@Component({
    templateUrl: './getjob.html',
    styleUrls: ['./getjob.css'],
})

export class GetjobComponent {
    // public jobs: Observable<Job[]>;
    public jobs: Job[];
    public offset = 50;


    constructor(public jobService: JobService, public router: Router) {
        // this.jobs = this.jobService.getJobs();
        this.jobService.getMoreJob(this.offset).subscribe(jobs => {
            this.jobs = jobs;
        });
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