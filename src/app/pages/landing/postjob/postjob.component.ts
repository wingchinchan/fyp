
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EmailValidator } from '../email';

@Component({
    templateUrl: './postjob.html',
    styleUrls: ['./postjob.css'],
})
export class PostjobComponent {
    public jobForm: FormGroup;
    constructor(public formBuilder: FormBuilder) {

        this.jobForm = formBuilder.group({
            email: [
                '', Validators.compose([
                    Validators.required,
                    Validators.minLength(4),
                    EmailValidator.isValid
                ])
            ],
            website: [
                'N/A', Validators.compose([
                    Validators.required
                ])
            ],
            jobCategory:[
                '', Validators.compose([
                    Validators.nullValidator,
                    Validators.required
                ])
            ]
        });

    }

    hello(){
        console.log(this.jobForm.value.email);
    }
}

