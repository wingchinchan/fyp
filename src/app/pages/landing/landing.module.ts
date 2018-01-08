import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {LandingComponet} from './landing.componet';
import {WellcomeComponent} from './wellcome/wellcome.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {GetjobComponent} from './getjob/getjob.component';
import {JobDetailsComponent} from './jobDetails/jobDetails.component';
import {LandingNavigationComponent} from '../../shared/landing-navigation/landing-navigation.component';
import {MomentModule} from 'angular2-moment';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [{
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
            path: 'jobs',
            component: GetjobComponent,
        },
        {
            path: 'job/:id',
            component: JobDetailsComponent,
        }
    ]
}];

@NgModule({
    declarations: [
        LandingComponet,
        WellcomeComponent,
        RegisterComponent,
        LoginComponent,
        GetjobComponent,
        JobDetailsComponent,
        LandingNavigationComponent,
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
        GetjobComponent,
        JobDetailsComponent,
        LandingNavigationComponent
    ]
})
export class LandingModule {
}