import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {JobService, Job} from '../../../service/jobService';
import {Router} from '@angular/router';

@Component({
    templateUrl: './getjob.html',
    styleUrls: ['./getjob.css'],
})

export class GetjobComponent {
    public jobs: Job[];
    public offset = 10;

    constructor(public jobService: JobService, public router: Router) {
        this.jobService.getMoreJob(this.offset).subscribe(jobs => {
            this.jobs = jobs;
        });
    }

    goToDetail(job) {
        this.router.navigate(['job', job.id]);
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