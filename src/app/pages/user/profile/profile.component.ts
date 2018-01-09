import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserService, User} from '../../../service/userService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Router} from '@angular/router';
import {EmailValidator} from '../../landing/email';



@Component({
    templateUrl: './profile.html',
    styleUrls: ['./profile.css'],
})
export class ProfileComponent {
    public profileForm: FormGroup;
    public user: User;

    constructor(public userService: UserService, public formBuilder: FormBuilder, public afs: AngularFirestore, public router: Router) {
        this.userService.getUser().then(user => {
            console.log(user);
            this.user = user;
            console.log(user);
        });

        this.profileForm = formBuilder.group({
            displayName: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            introduction: [
                'N/A', Validators.compose([
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
            phone: [
                'N/A', Validators.compose([
                    Validators.required
                ])
            ]
        });
    }

    hello() {
        console.log(this.user.uid);

    }
}

