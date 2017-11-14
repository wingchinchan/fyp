import * as $ from 'jquery';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavigationComponent} from './shared/navigation/navigation.component';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {BreadcrumbComponent} from './shared/breadcrumb/breadcrumb.component';
import {RightSidebarComponent} from './shared/right-sidebar/rightsidebar.component';
import {AppComponent} from './app.component';
import {LandingComponet} from './pages/landing/landing.componet';
import {WellcomeComponent} from './pages/landing/wellcome/wellcome.component';
import {RegisterComponent} from './pages/landing/register/register.component';
import {LoginComponent} from './pages/landing/login/login.component';
import {ProfileComponent} from './pages/landing/profile/profile.component';
import {PostjobComponent} from './pages/landing/postjob/postjob.component';
import {GetjobComponent} from './pages/landing/getjob/getjob.component';
import { AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFirestoreModule} from "angularfire2/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDhGKcU8rrQ9PSdFrTs9ju5PnE5OFyWd3E",
    authDomain: "cwcfyp.firebaseapp.com",
    databaseURL: "https://cwcfyp.firebaseio.com",
    projectId: "cwcfyp",
    storageBucket: "cwcfyp.appspot.com",
    messagingSenderId: "1083031193263"
}
const routes: Routes = [
    {
        path: '',
        component: LandingComponet,
        children: [
            {
                path: '',
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
              path: 'getjob',
              component: GetjobComponent,
            },
        ]

    }, {
        path: 'blank',
        loadChildren: './pages/blank/blank.module'
    }, {
        path: 'accordion',
        loadChildren: './pages/component/accordion/accordion.module'
    }, {
        path: 'alert',
        loadChildren: './pages/component/alert/alert.module'
    }, {
        path: 'carousel',
        loadChildren: './pages/component/carousel/carousel.module'
    }, {
        path: 'datepicker',
        loadChildren: './pages/component/datepicker/datepicker.module'
    }, {
        path: 'dropdown',
        loadChildren: './pages/component/dropdown-collapse/dropdown-collapse.module'
    }, {
        path: 'modal',
        loadChildren: './pages/component/modal/modal.module'
    }, {
        path: 'pagination',
        loadChildren: './pages/component/pagination/pagination.module'
    }, {
        path: 'Popovertooltip',
        loadChildren: './pages/component/popover-tooltip/popover-tooltip.module'
    }, {
        path: 'progressbar',
        loadChildren: './pages/component/progressbar/progressbar.module'
    }, {
        path: 'rating',
        loadChildren: './pages/component/rating/rating.module'
    }, {
        path: 'tabs',
        loadChildren: './pages/component/tabs/tabs.module'
    }, {
        path: 'timepicker',
        loadChildren: './pages/component/timepicker/timepicker.module'
    }, {
        path: 'typehead',
        loadChildren: './pages/component/typehead/typehead.module'
    }, {
        path: 'fontawesome',
        loadChildren: './pages/icons/fontawesome/fontawesome.module'
    }, {
        path: 'simpleline',
        loadChildren: './pages/icons/simpleline/simpleline.module'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        BreadcrumbComponent,
        SidebarComponent,
        RightSidebarComponent,
        LandingComponet,
        WellcomeComponent,
        RegisterComponent,
        LoginComponent,
        ProfileComponent,
        PostjobComponent,
        GetjobComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
