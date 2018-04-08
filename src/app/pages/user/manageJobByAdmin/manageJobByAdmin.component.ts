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
    // public jobs: Observable<Job[]>;
    public jobs: Job[];
    public offset = 50;

    constructor(public jobService: JobService, public router: Router, public userService: UserService) {
        // this.jobs = this.jobService.getJobs();
        this.jobService.getMoreJob(this.offset).subscribe(jobs => {
            this.jobs = jobs;
        });

        this.userService.getUser().then(user => {
            console.log(user);
            this.user = user;
            // this.jobs = this.jobService.getJobsByCompany(user.uid);
        });
    }

    goToManageJobByAdmin(job) {
        this.router.navigate(['/user/deleteJobByAdmin', job.id]);
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