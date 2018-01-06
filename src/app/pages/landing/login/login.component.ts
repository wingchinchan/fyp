
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { UserService } from '../../../service/userService';
import * as firebase from 'firebase/app';

@Component({
    templateUrl: './login.html',
    styleUrls: ['./login.css'],
})
export class LoginComponent {
    public loginForm: FormGroup;

    constructor(public formBuilder: FormBuilder, public afAuth : AngularFireAuth, public router : Router, public userService: UserService) {
        this.loginForm = formBuilder.group({
            email: [
                '', Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                ])
            ],
            password: [
                '', Validators.compose([
                    Validators.required
                ])
            ]
        });

    }

    loginUser() {
       this.userService.emailLogin(this.loginForm.value.email, this.loginForm.value.password).then(success => {
           this.router.navigateByUrl('profile');
       }).catch(error => {
           console.log(error);
       });
    }

    googleLogin() {
        this.userService.googleLogin().then(success => {
            this.router.navigateByUrl('profile');
        }).catch(error => {
            console.log(error);
        });
    }

}