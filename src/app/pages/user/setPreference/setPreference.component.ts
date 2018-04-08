import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidator} from '../../landing/email';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {JobApplication, JobService, Preference} from '../../../service/jobService'
import {Router} from '@angular/router';
import {UserService, User} from "../../../service/userService";
import {logging} from "selenium-webdriver";
import {Observable} from "rxjs/Observable";

@Component({
    templateUrl: './setPreference.html',
    styleUrls: ['./setPreference.css'],
})
export class SetPreferenceComponent {
    public preferenceForm: FormGroup;
    public application: Observable<JobApplication[]>;
    public user: User;
    public jobCollection: AngularFirestoreCollection<any>;

    // public PreferenceList: Observable<Preference[]>;
    id: string;
    uid: string;

    constructor(public formBuilder: FormBuilder, public afs: AngularFirestore, public jobService: JobService, public router: Router, public userService: UserService) {
        this.userService.getUser().then(user => {
            this.user = user;
            console.log(user);
            console.log(user.uid);

            // this.PreferenceList = this.jobService.getPreference(user.id);
        });

        this.preferenceForm = formBuilder.group({
            preference_jobCategory: [
                '', Validators.compose([
                    Validators.nullValidator,
                    Validators.required
                ])
            ],
            preference_eduLv: [
                '', Validators.compose([
                    Validators.nullValidator,
                    Validators.required
                ])
            ],
            preference_salary: [
                '', Validators.compose([
                    Validators.nullValidator,
                    Validators.required
                ])
            ],
            preference_expectedExp: [
                '', Validators.compose([
                    Validators.nullValidator,
                    Validators.required
                ])
            ],
            preference_location: [
                '', Validators.compose([
                    Validators.nullValidator,
                    Validators.required
                ])
            ],
        });
        this.userService.getUser().then(user => {
            this.preferenceForm.setValue({
                preference_jobCategory: '',
                preference_eduLv: '',
                preference_salary: '',
                preference_expectedExp: '',
                preference_location: '',

            });
        });

    }
    setPreference() {
        console.log('test');
        this.userService.setPreference(this.preferenceForm.value, this.user.uid);
        this.router.navigateByUrl('user/profile');
        alert('Set Preference successfully');
    }
    redirect() {
        this.router.navigateByUrl('user/profile');
    }
}

