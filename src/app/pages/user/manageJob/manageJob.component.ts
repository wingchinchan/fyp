
import { Component} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {JobService, Job, User} from '../../../service/jobService';
import { Router } from '@angular/router';
import {UserService} from '../../../service/userService';

@Component({
    templateUrl: './manageJob.html',
    styleUrls: ['./manageJob.scss'],
})
//
// export class ManageJobComponent {
//     public jobs: Job[];
//     constructor(public jobService: JobService) {
//         this.jobService.getJobs().subscribe(jobs =>{
//             this.jobs = jobs;
//         });
//     }
// }




export class ManageJobComponent {
    public user: User;
    public jobs: Observable<Job[]>;
    constructor(public jobService: JobService, public router: Router, public userService: UserService) {
        // this.jobs = this.jobService.getJobs();

        this.userService.getUser().then(user => {
            console.log(user);
            this.user = user;
            this.jobs = this.jobService.getJobsByCompany(user.uid);
        });
    }

    goToEditJobDetail(job) {
        this.router.navigate(['/user/editJob', job.id]);
    }
}