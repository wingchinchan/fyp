import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../service/userService';
import {EmailValidator} from "../email";

@Component({
    templateUrl: './register.html',
    styleUrls: ['./register.css'],
})
export class RegisterComponent {
    public registerAsFreelancerForm: FormGroup;

    constructor(public formBuilder: FormBuilder, public router: Router, public userService: UserService) {
        this.registerAsFreelancerForm = formBuilder.group({
            email: [
                '', Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                    EmailValidator.isValid
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

    registerAsFreelancer() {
        if (this.registerAsFreelancerForm.value.password === this.registerAsFreelancerForm.value.repeatPassword) {
            this.userService.registerAsFreelancer(this.registerAsFreelancerForm.value.displayName, this.registerAsFreelancerForm.value.email, this.registerAsFreelancerForm.value.password)
                .then(user => {
                    this.router.navigateByUrl('user/profile');
                }).catch(error => {
                alert(error);
            });
        } else {
            alert('Password not the same');
        }
    }
}
