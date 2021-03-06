import { Component } from '@angular/core';
import { UserService , User} from '../../service/userService';
import {Router} from "@angular/router";

@Component({
  selector: 'ma-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent{
    public user: User;
    constructor(public userService: UserService, public router: Router) {
        this.userService.getUser().then(user=>{
          this.user = user;
        });
    }

    logout() {
        this.router.navigateByUrl('');
        this.userService.logout();
    }

}
