import * as $ from 'jquery';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LandingModule } from './pages/landing/landing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {MomentModule} from 'angular2-moment';
import {UserService} from './service/userService';
import {ChatService} from './service/chatService';
import {JobService} from './service/jobService';
import {UserModule} from './pages/user/user.module';
import {HttpClientModule} from '@angular/common/http';
import { PipeModule } from './pipe/pipe.module';


const firebaseConfig = {
    apiKey: "AIzaSyDhGKcU8rrQ9PSdFrTs9ju5PnE5OFyWd3E",
    authDomain: "cwcfyp.firebaseapp.com",
    databaseURL: "https://cwcfyp.firebaseio.com",
    projectId: "cwcfyp",
    storageBucket: "cwcfyp.appspot.com",
    messagingSenderId: "1083031193263"
};

const routes: Routes = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '404'
    },
    {
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
    },
];


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        LandingModule,
        UserModule,
        PipeModule.forRoot(),
        NgbModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features
        MomentModule,
        HttpClientModule,
    ],
    providers: [
        UserService,
        JobService,
        ChatService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
