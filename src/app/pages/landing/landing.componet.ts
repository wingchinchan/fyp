import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/userService';
import {Router} from '@angular/router';

@Component({
    templateUrl: './landing.html',
    styleUrls: ['./landing.css'],
})
export class LandingComponet implements OnInit {

    constructor(public userService: UserService, public router: Router) {
    }
    ngOnInit() {
        if (this.userService.isLogin() === 'true') {
            this.router.navigateByUrl('user/profile');
        }
    };
};