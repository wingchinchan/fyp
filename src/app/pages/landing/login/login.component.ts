
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
@Component({
    templateUrl: './login.html',
    styleUrls: ['./login.css'],
})
export class LoginComponent {
    public loginForm: FormGroup;

    constructor(public formBuilder: FormBuilder, public afAuth : AngularFireAuth, public router : Router) {
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
        this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password).then(success => {
            console.log(success);
            this.router.navigateByUrl('profile');
        }).catch(error => {
            console.log(error);
        });
    }
}