import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../service/userService';
import {EmailValidator} from "../email";

@Component({
    templateUrl: './registerAsCom.html',
    styleUrls: ['./registerAsCom.css'],
})
export class RegisterAsComComponent {
    public registerAsCompanyForm: FormGroup;

    constructor(public formBuilder: FormBuilder, public router: Router, public userService: UserService) {
        this.registerAsCompanyForm = formBuilder.group({
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

    registerAsCompany() {
        if (this.registerAsCompanyForm.value.password === this.registerAsCompanyForm.value.repeatPassword) {
            this.userService.registerAsCompany(this.registerAsCompanyForm.value.displayName, this.registerAsCompanyForm.value.email, this.registerAsCompanyForm.value.password)
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
