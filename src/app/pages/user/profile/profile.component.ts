import {Component} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserService, User} from '../../../service/userService';

@Component({
    templateUrl: './profile.html',
    styleUrls: ['./profile.css'],
})
export class ProfileComponent {
    public user: User;

    constructor(public userService: UserService) {
        this.userService.getUser().then(user => {
            console.log(user);
            this.user = user;
            console.log(user);
        });
    }

    hello() {
        console.log(this.user.uid);

    }
}