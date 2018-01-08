
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
    templateUrl: './user.html',
    styleUrls: ['./user.css'],
})
export class UserComponent {
    constructor(public formBuilder: FormBuilder, public afs: AngularFirestore) {



    }


}

