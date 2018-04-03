import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JobService, Job} from '../../../service/jobService';
import {UserService} from '../../../service/userService';

import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';


@Component({
    templateUrl: './jobDetails.html',
    styleUrls: ['./jobDetails.css'],
})
export class JobDetailsComponent {
    id: string;
    private sub: any;
    public Ojob: Observable<Job>;
    public canApplied = true;
    constructor(private route: ActivatedRoute, public jobService: JobService, public router: Router, public userService: UserService) {
        this.id = this.route.snapshot.paramMap.get('id');

        this.Ojob = this.jobService.getJob(this.id);
        this.userService.getUser().then(user => {
            this.jobService.isApplied(this.id, user.uid).subscribe(application => {
                if (application.length > 0 ) {
                    this.canApplied = false;
                }
            });
        });
    }

    applyJob(job) {
        this.jobService.applyJob(job, this.id);
        this.router.navigateByUrl('user/profile');
    }
    viewCompanyProfile(job) {
        this.router.navigate(['/user/viewProfileOfCompany', job.uid]);

    }
}