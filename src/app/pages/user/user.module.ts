import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {MomentModule} from 'angular2-moment';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RightSidebarComponent} from '../../shared/right-sidebar/rightsidebar.component';
import {SidebarComponent} from '../../shared/sidebar/sidebar.component';
import {BreadcrumbComponent} from '../../shared/breadcrumb/breadcrumb.component';
import {NavigationComponent} from '../../shared/navigation/navigation.component';
import { UserComponent } from './user.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [{
    path: 'user',
    component: UserComponent,
    children: [
        {
            path: 'profile',
            component: ProfileComponent,
        },
    ]
}];

@NgModule({
    declarations: [
        ProfileComponent,
        NavigationComponent,
        BreadcrumbComponent,
        SidebarComponent,
        RightSidebarComponent,
        UserComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        MomentModule,
        NgbModule,
        NgbModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        ProfileComponent,
        UserComponent,
    ]
})
export class UserModule {
}