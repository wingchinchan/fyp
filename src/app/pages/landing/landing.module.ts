import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponet } from './landing.componet';
import {WellcomeComponent} from './wellcome/wellcome.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {PostjobComponent} from './postjob/postjob.component';
import {GetjobComponent} from './getjob/getjob.component';
import {JobDetailsComponent} from './jobDetails/jobDetails.component';
import {NavigationComponent} from '../../shared/navigation/navigation.component';
import {SidebarComponent} from '../../shared/sidebar/sidebar.component';
import {BreadcrumbComponent} from '../../shared/breadcrumb/breadcrumb.component';
import {RightSidebarComponent} from '../../shared/right-sidebar/rightsidebar.component';
import {MomentModule} from 'angular2-moment';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [ {
    path: '',
    component: LandingComponet,
    children: [
        {
            path: '',
            component: WellcomeComponent,
        },
        {
            path: 'landing',
            component: WellcomeComponent,
        },
        {
            path: 'register',
            component: RegisterComponent,
        },
        {
            path: 'login',
            component: LoginComponent,
        },
        {
            path: 'profile',
            component: ProfileComponent,
        },
        {
            path: 'postjob',
            component: PostjobComponent,
        },
        {
            path: 'jobs',
            component: GetjobComponent,
        },
        {
            path: 'job/:id',
            component: JobDetailsComponent,
        },
    ]

}];

@NgModule({
    declarations: [
        LandingComponet,
        WellcomeComponent,
        RegisterComponent,
        LoginComponent,
        ProfileComponent,
        PostjobComponent,
        GetjobComponent,
        JobDetailsComponent,
        NavigationComponent,
        BreadcrumbComponent,
        SidebarComponent,
        RightSidebarComponent,
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
        LandingComponet,
        WellcomeComponent,
        RegisterComponent,
        LoginComponent,
        ProfileComponent,
        PostjobComponent,
        GetjobComponent,
        JobDetailsComponent,
        NavigationComponent,
        BreadcrumbComponent,
        SidebarComponent,
        RightSidebarComponent,
    ]
})
export class LandingModule {
}