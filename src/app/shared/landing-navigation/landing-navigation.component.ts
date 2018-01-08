import {Component} from '@angular/core';
import { UserService , User} from '../../service/userService';
import { Router } from '@angular/router';

@Component({
    selector: 'landing-nav',
    templateUrl: './landing-navigation.component.html',
    styleUrls: ['./landing-nav.css'],
})
export class LandingNavigationComponent {
    public user: Boolean;
    constructor(public userService: UserService, public router: Router) {
        if (this.userService.isLogin() === 'true') {
            this.user = true;
        } else {
            this.user = false;
        }
    }

    logout() {
        this.router.navigateByUrl('');
        this.userService.logout();
    }

}
