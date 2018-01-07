
import { Component} from '@angular/core';
import { JobService, Job} from '../../../service/jobService';
import {Observable} from 'rxjs/Observable';
@Component({
    templateUrl: './getjob.html',
    styleUrls: ['./getjob.css'],
})

export class GetjobComponent {
    public jobs: Observable<Job[]>
    constructor(public jobService: JobService) {
        this.jobs = this.jobService.getJobs();
    }
}