import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserService, User} from '../../../service/userService';
import {JobService, Job, JobApplication, CommentCompany} from '../../../service/jobService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Router} from '@angular/router';
import {EmailValidator} from '../../landing/email';
import {Observable} from 'rxjs/Observable';
// import {AngularFireStorage} from "angularfire2/storage";


@Component({
    templateUrl: './profile.html',
    styleUrls: ['./profile.css'],
})

export class ProfileComponent {
    public application: Observable<JobApplication[]>;
    public applicationCompany: Observable<JobApplication[]>;
    // public commentocompany: Observable<CommentCompany>;
    // public profileForm: FormGroup;
    public user: User;
    public job: Job;
    // public userForm: User;
    public jobs: Observable<Job[]>;
    public preferenceForm: FormGroup;
    public companyForm: FormGroup;
    id: string;
    uid: string;
    photoURL: string;

    uploadPercent: Observable<number>;

    constructor(public userService: UserService, public jobService: JobService, public formBuilder: FormBuilder, public afs: AngularFirestore, public router: Router) {
        this.userService.getUser().then(user => {
            console.log(user);
            this.user = user;
            // this.userForm = user;
            this.application = this.jobService.getApplication(user.uid);
            this.applicationCompany = this.jobService.getApplicationByCompany(user.uid);
            this.jobs = this.jobService.getJobsByCompany(user.uid);

            console.log(this.application);
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
            preference_expectedExp: [
                '', Validators.compose([
                    Validators.nullValidator,
                    Validators.required
                ])
            ],
            displayName: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            email: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            introduction: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            skills: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            workExp: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            photoURL: [
                '', Validators.compose([
                    Validators.required
                ])
            ]
        });
        this.userService.getUser().then(user => {
            this.preferenceForm.setValue({
                preference_jobCategory: '',
                preference_eduLv: '',
                photoURL: user.photoURL,
                // preference_salary: '',
                preference_expectedExp: '',
                // preference_location: '',
                displayName: '',
                email: '',
                introduction: '',
                skills: '',
                workExp: '',

            });
        });

        this.companyForm = formBuilder.group({
            displayName: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            email: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            introduction: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            skills: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            photoURL: [
                '', Validators.compose([
                    Validators.required
                ])
            ]
        });
        this.userService.getUser().then(user => {
            this.companyForm.setValue({
                displayName: user.displayName,
                email: user.email,
                introduction: user.introduction,
                skills: user.skills,
                photoURL: user.photoURL
            });
        });

    }

    setPreference() {
        console.log('test');
        this.userService.setPreference(this.preferenceForm.value, this.user.uid);
        this.user.photoURL = this.preferenceForm.value.photoURL;
        this.router.navigateByUrl('user/profile');
        alert('Set Preference successfully');
    }

    setCompany() {
        console.log('test');
        console.log(this.companyForm.value);
        this.userService.setPreference(this.companyForm.value, this.user.uid);
        this.user.photoURL = this.companyForm.value.photoURL;
        this.router.navigateByUrl('user/profile');
        alert('Set Preference successfully');
    }


    hello() {
        console.log(this.user.uid);

    }

    updateProfile() {
        console.log('test');
        //this.userService.updateProfile(this.userForm, this.user.uid);
        this.router.navigateByUrl('user/profile');
        alert('Update successfully');
    }

    goToDetail(jobApplication) {
        this.router.navigate(['/user/job', jobApplication.jobid]);
    }

    commentToCompany(jobApplication) {
        console.log(jobApplication.id);
        this.router.navigate(['/user/commentRatingToCompany', jobApplication.id]);
    }

    commentToFreelancer(jobApplication) {
        console.log(jobApplication.id);
        this.router.navigate(['/user/commentRating', jobApplication.id]);
    }

    goManageJob(jobApplication) {
        this.router.navigate(['/user/editJob', jobApplication.jobid]);
    }

    viewFreelancerProfile(jobApplication) {
        this.router.navigate(['/user/viewProfileByOther', jobApplication.uid]);

    }

    viewCompanyProfile(jobApplication) {
        this.router.navigate(['/user/viewProfileOfCompany', jobApplication.companyID]);

    }

    // uploadFile(event) {
    //     const file = event.target.files[0];
    //     const filePath = this.user.uid;
    //     const task = this.storage.upload(filePath, file);
    //
    //     // observe percentage changes
    //     this.uploadPercent = task.percentageChanges();
    //     // get notified when the download URL is available
    //     const downloadURL = task.downloadURL();
    //     downloadURL.subscribe(url => {
    //         console.log(url);
    //         if (this.user.userType === 'company') {
    //             this.companyForm.patchValue({
    //                 photoURL: url
    //             });
    //         } else {
    //             this.preferenceForm.patchValue({
    //                 photoURL: url
    //             });
    //         }
    //     });
    // }

}

