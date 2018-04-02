import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {JobService, Job, User} from '../../../service/jobService';
import {Router} from '@angular/router';
import {UserService} from '../../../service/userService';

@Component({
    templateUrl: './manageJobByAdmin.html',
    styleUrls: ['./manageJobByAdmin.css'],
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


export class ManageJobByAdminComponent {
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

    goToDetail(job) {
        this.router.navigate(['/user/job', job.id]);
    }
}