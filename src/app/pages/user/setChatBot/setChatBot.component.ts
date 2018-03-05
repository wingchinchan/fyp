import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserService, User} from '../../../service/userService';
import {JobService, Job, JobApplication} from '../../../service/jobService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Router} from '@angular/router';




@Component({
    templateUrl: './setChatBot.html',
    styleUrls: ['./setChatBot.css'],
})
export class SetChatBotComponent {

    constructor(public userService: UserService, public jobService: JobService, public formBuilder: FormBuilder, public afs: AngularFirestore, public router: Router) {

    }
}

