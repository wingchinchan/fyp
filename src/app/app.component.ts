import {Component, OnInit} from '@angular/core';
import {UserService} from './service/userService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
//     constructor(public userService: UserService, public router: Router) {
//         if (this.userService.isLogin() === 'true') {
//             this.router.navigateByUrl('user/profile');
//         } else {
//             this.router.navigateByUrl('us');
//         }
//     }
}


// export class AppComponent implements OnInit {
//
//     constructor(public userService: UserService, public router: Router) {
//
//     }
//     ngOnInit() {
//         if (this.userService.isLogin() === 'true') {
//         this.router.navigateByUrl('user/profile');
//     } else {
//         this.router.navigateByUrl('us');
//     }}
//
// }


