
import { Component} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { JobService, Job} from '../../../service/jobService';
import { Router } from '@angular/router';

@Component({
    templateUrl: './manageJob.html',
    styleUrls: ['./manageJob.scss'],
})

export class ManageJobComponent {
    public jobs: Job[];
    constructor(public jobService: JobService) {
        this.jobService.getJobs().subscribe(jobs =>{
            this.jobs = jobs;
        });
    }
}