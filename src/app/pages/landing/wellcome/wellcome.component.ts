
import { Component} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Job {
    name : string;
}
@Component({
    templateUrl: './wellcome.html',
    styleUrls: ['./wellcome.css'],
})

export class WellcomeComponent {
    public jobs : Observable<Job[]>
    constructor(public afs: AngularFirestore) {
        this.jobs = this.afs.collection('job').valueChanges();
    }

}