
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EmailValidator } from '../email';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
    templateUrl: './postjob.html',
    styleUrls: ['./postjob.css'],
})
export class PostjobComponent {
    public jobForm: FormGroup;
    public jobCollection: AngularFirestoreCollection<any>;
    constructor(public formBuilder: FormBuilder, public afs: AngularFirestore) {

         //add job to collection
         // this.jobCollection = this.afs.collection('job');
         // const job = {
         //     name: '123',
         //     price: 45
         // }
         //
         // this.jobCollection.add(job);

        // this.jobCollection = this.afs.collection('job');
        // const job = {
        //     no: '1',
        //     title: 'Mobile app project',
        //     jobCategory: 'programming',
        //     quota: '1',
        //     dueDate:'31/12/2018',
        //     jobDesc: 'app',
        //     email: 'test@gmail.com',
        //     minRate: 'N/A',
        //     minSal: '3000',
        //     maxSal: '8000',
        //     comName: 'abe',
        //     website: 'N/A',
        //     comDesc: 'APP',
        //     name: '123',
        // }
        //
        // this.jobCollection.add(job);

        this.jobForm = formBuilder.group({
            title:[
                '', Validators.compose([
                    Validators.required
                ])
            ],
            jobCategory:[
                '', Validators.compose([
                    Validators.nullValidator,
                    Validators.required
                ])
            ],
            quota: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            dueDate: [
                '', Validators.compose([
                    Validators.required
                ])
            ],
            jobDesc:[
                '', Validators.compose([
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
            minRate: [
                'N/A', Validators.compose([
                    Validators.required
                ])
            ],
            minSal:[
                '', Validators.compose([
                    Validators.required
                ])
            ],
            maxSal:[
                '', Validators.compose([
                    Validators.required
                ])
            ],
            comName:[
                '', Validators.compose([
                    Validators.required
                ])
            ],
            website: [
                'N/A', Validators.compose([
                    Validators.required
                ])
            ],
            comDesc:[
                '', Validators.compose([
                    Validators.required
                ])
            ]
        });

    }

    hello(){
        console.log(this.jobForm.value.email);
    }
}

