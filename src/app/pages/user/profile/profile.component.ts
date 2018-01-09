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
    public userForm: User;
    constructor(public userService: UserService, public formBuilder: FormBuilder, public afs: AngularFirestore, public router: Router) {
        this.userService.getUser().then(user => {
            console.log(user);
            this.user = user;
            this.userForm = user;
        });

    }

    hello() {
        console.log(this.user.uid);

    }

    updateProfile() {
        console.log('test');
        this.userService.updateProfile(this.userForm, this.user.uid);
        this.router.navigateByUrl('user/profile');
    }
}

