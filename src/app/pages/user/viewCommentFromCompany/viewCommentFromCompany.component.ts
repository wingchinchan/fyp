import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserService, User} from '../../../service/userService';
// import {JobService, Job, JobApplication, CommentCompany, ViewFreelancerComment} from '../../../service/jobService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {ActivatedRoute} from '@angular/router';
import {EmailValidator} from '../../landing/email';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';



@Component({
    templateUrl: './viewCommentFromCompany.html',
    styleUrls: ['./viewCommentFromCompany.css'],
})

export class ViewCommentFromCompanyComponent {
    // public application: Observable<JobApplication[]>;
    // public user: User;
    // public job: Job;
    // id: string;
    // uid: string;
    // public viewFreelancerComment: Observable<ViewFreelancerComment[]>;
    // public viewCommentID: Observable<ViewFreelancerComment>;
    // // public commentToFreelancer: Observable<ViewFreelancerComment>;
    //
    // constructor(private route: ActivatedRoute, public userService: UserService, public jobService: JobService, public formBuilder: FormBuilder, public afs: AngularFirestore, public router: Router) {
    //     this.id = this.route.snapshot.paramMap.get('id');
    //     this.viewFreelancerComment = this.jobService.getCommentRecordByCompanyByApplication(this.id);
    //     this.application = this.jobService.getApplicationByJob(this.id);
    //     this.viewCommentID = this.jobService.getCommentRecordByCompany(this.id);
    //
    //     console.log(this.id);
    //
    //     // this.application = this.jobService.getApplicationByID(this.id);
    //
    //     // this.commentToFreelancer = this.jobService.getCommentRecordByCompany(this.id);
    //
    //     // this.userService.getUser().then(user => {
    //     //     console.log(user);
    //     //     this.user = user;
    //     //     this.application = this.jobService.getApplication(user.uid);
    //     // });
    //
    //
    // }
    //
    //
    // //
    // // updateProfile() {
    // //     console.log('test');
    // //     this.userService.updateProfile(this.userForm, this.user.uid);
    // //     this.router.navigateByUrl('user/profile');
    // //     alert('Update successfully');
    // // }
    // //
    // // goToDetail(jobApplication) {
    // //     this.router.navigate(['/user/job', jobApplication.jobid]);
    // // }
    // //
    // // commentToCompany(jobApplication) {
    // //     console.log(jobApplication.id);
    // //     this.router.navigate(['/user/commentRatingToCompany', jobApplication.id]);
    // // }
    // // viewCommentFromCompany(jobApplication){
    // //     console.log(jobApplication.id);
    // //     this.router.navigate(['/user/viewCommentFromCompany', jobApplication.id]);
    // //
    // // }
}

