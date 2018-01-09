import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidator} from '../../landing/email';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {JobService} from '../../../service/jobService'
import {Router} from '@angular/router';

@Component({
    templateUrl: './postjob.html',
    styleUrls: ['./postjob.css'],
})
export class PostjobComponent {
    public jobForm: FormGroup;
    public jobCollection: AngularFirestoreCollection<any>;

    constructor(public formBuilder: FormBuilder, public afs: AngularFirestore, public jobService: JobService, public router: Router) {

        this.jobForm = formBuilder.group({
            title: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            jobCategory: [
                '', Validators.compose([
                    Validators.nullValidator,
                    Validators.required
                ])
            ],
            quota: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            dueDate: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            jobDesc: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            email: [
                '', Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                    EmailValidator.isValid
                ])
            ],
            minRate: [
                'N/A', Validators.compose([
                    Validators.required
                ])
            ],
            salary: [
                '', Validators.compose([
                    Validators.required
                ])
            ]
        });

    }

    postJob() {
        this.jobService.postJob(this.jobForm.value);
        this.router.navigateByUrl('user/profile');
    }
}

