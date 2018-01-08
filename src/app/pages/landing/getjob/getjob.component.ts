
import { Component} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { JobService, Job} from '../../../service/jobService';
import { Router } from '@angular/router';

@Component({
    templateUrl: './getjob.html',
    styleUrls: ['./getjob.css'],
})

export class GetjobComponent {
    public jobs: Observable<Job[]>;
    constructor(public jobService: JobService, public router: Router) {
        this.jobs = this.jobService.getJobs();
    }

    goToDetail(job) {
        this.router.navigate(['job', job.id]);
    }
}