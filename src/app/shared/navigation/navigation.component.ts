import {Component} from '@angular/core';
import { UserService , User} from '../../service/userService';
import { Router } from '@angular/router';

@Component({
    selector: 'ma-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./nav.css'],
})
export class NavigationComponent {
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
