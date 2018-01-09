import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../service/userService';

@Component({
    templateUrl: './register.html',
    styleUrls: ['./register.css'],
})
export class RegisterComponent {
    public registerForm: FormGroup;

    constructor(public formBuilder: FormBuilder, public router: Router, public userService: UserService) {
        this.registerForm = formBuilder.group({
            email: [
                '', Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                ])
            ],
            password: [
                '', Validators.compose([
                    Validators.required,
                    Validators.minLength(8),
                ])
            ],
            repeatPassword: [
                '', Validators.compose([
                    Validators.required,
                    Validators.minLength(8),
                ])
            ],
            displayName: [
                '', Validators.compose([
                    Validators.required,
                ])
            ]
        });

    }

    register() {
        if (this.registerForm.value.password === this.registerForm.value.repeatPassword) {
            this.userService.register(this.registerForm.value.displayName, this.registerForm.value.email, this.registerForm.value.password)
                .then(user => {
                    this.router.navigateByUrl('user/profile');
                }).catch(error => {
                    alert(error);
                });
        }
    }
}
