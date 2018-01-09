import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService, User} from "../../service/userService";

@Component({
    selector: 'ma-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    public user: User;
    constructor(public userService: UserService, public router: Router) {

        this.userService.getUser().then(user => {
            this.user = user;
        });
    }

    logout() {
        this.userService.logout();
        this.router.navigateByUrl('');
    }

}
