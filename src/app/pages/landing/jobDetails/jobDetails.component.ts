import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JobService, Job} from '../../../service/jobService';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';


@Component({
    templateUrl: './jobDetails.html',
    styleUrls: ['./jobDetails.css'],
})
export class JobDetailsComponent implements OnInit, OnDestroy {
    id: number;
    private sub: any;
    public Ojob: Observable<Job>;

    constructor(private route: ActivatedRoute, public jobService: JobService, public router: Router) {

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params.id;
            this.Ojob = this.jobService.getJob(params.id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    goBackJobList() {
        this.router.navigateByUrl('jobs');
    }
}