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
import {UserComponent} from './user.component';
import {ProfileComponent} from './profile/profile.component';
import {PostjobComponent} from './postjob/postjob.component';
import {GetjobComponent} from './getjob/getjob.component';
import {JobDetailsComponent} from './jobDetails/jobDetails.component';
import {ChatComponent} from './chat/chat.component';
import {ManageJobComponent} from './manageJob/manageJob.component';
import {ManageChatbotComponent} from './manageChatbot/manageChatbot.component';
import {ManageJobByAdminComponent} from './manageJobByAdmin/manageJobByAdmin.component';
import {EditJobDetailsComponent} from './editJobDetails/editJobDetails.component';
import {CommentRatingComponent} from './commentRating/commentRating.component';
import {CommentRatingToCompanyComponent} from './commentRatingToCompany/commentRatingToCompany.component';
import {ViewCommentFromCompanyComponent} from './viewCommentFromCompany/viewCommentFromCompany.component';
import {ManageJobApplicationComponent} from './manageJobApplication/manageJobApplication.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {PipeModule} from '../../pipe/pipe.module';
import {ViewProfileByOtherComponent} from './viewProfileByOther/viewProfileByOther.component';
import {ViewProfileOfCompanyComponent} from './viewProfileOfCompany/viewProfileOfCompany.component';
import {SetPreferenceComponent} from './setPreference/setPreference.component';
import {DeleteJobByAdminComponent} from './deleteJobByAdmin/deleteJobByAdmin.component';
import {SearchJobByFreelancerComponent} from './searchJobByFreelancer/searchJobByFreelancer.component';
import {SearchResultByCompanyComponent} from './searchResultByCompany/searchResultByCompany.component';

const routes: Routes = [{
    path: 'user',
    component: UserComponent,
    children: [
        {
            path: 'profile',
            component: ProfileComponent,
        }, {
            path: 'postJob',
            component: PostjobComponent,
        }, {
            path: 'jobs',
            component: GetjobComponent,
        }, {
            path: 'job/:id',
            component: JobDetailsComponent,
        }, {
            path: 'chat',
            component: ChatComponent,
        }, {
            path: 'manageJob',
            component: ManageJobComponent,
        }, {
            path: 'commentRating/:id',
            component: CommentRatingComponent
        }, {
            path: 'manageChatbot',
            component: ManageChatbotComponent,
        }, {
            path: 'manageJobByAdmin',
            component: ManageJobByAdminComponent,
        }, {
            path: 'editJob/:id',
            component: EditJobDetailsComponent,

        }, {
            path: 'manageJobApplication',
            component: ManageJobApplicationComponent,
        }, {
            path: 'commentRatingToCompany/:id',
            component: CommentRatingToCompanyComponent,
        }, {
            path: 'viewCommentFromCompany/:id',
            component: ViewCommentFromCompanyComponent,
        }, {
            path: 'viewProfileByOther/:id',
            component: ViewProfileByOtherComponent,
        },  {
            path: 'viewProfileOfCompany/:id',
            component: ViewProfileOfCompanyComponent,
        }, {
            path: 'setPreference',
            component: SetPreferenceComponent,
        }, {
            path: 'deleteJobByAdmin/:id',
            component: DeleteJobByAdminComponent,
        }, {
            path: 'searchJobByFreelancer',
            component: SearchJobByFreelancerComponent,
        }, {
            path: 'searchResultByCompany',
            component: SearchResultByCompanyComponent,
        }
    ]
}];

@NgModule({
    declarations: [
        ProfileComponent,
        NavigationComponent,
        BreadcrumbComponent,
        SidebarComponent,
        RightSidebarComponent,
        UserComponent,
        PostjobComponent,
        GetjobComponent,
        JobDetailsComponent,
        ChatComponent,
        ManageJobComponent,
        CommentRatingComponent,
        ManageChatbotComponent,
        ManageJobByAdminComponent,
        EditJobDetailsComponent,
        ManageJobApplicationComponent,
        CommentRatingToCompanyComponent,
        ViewCommentFromCompanyComponent,
        ViewProfileByOtherComponent,
        ViewProfileOfCompanyComponent,
        SetPreferenceComponent,
        DeleteJobByAdminComponent,
        SearchJobByFreelancerComponent,
        SearchResultByCompanyComponent
    ],
    imports: [
        FormsModule,
        NgxDatatableModule,
        CommonModule,
        MomentModule,
        NgbModule,
        NgbModule.forRoot(),
        PipeModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        ProfileComponent,
        UserComponent,
        PostjobComponent,
        GetjobComponent,
        JobDetailsComponent,
        ManageJobComponent,
        ManageChatbotComponent,
        ManageJobByAdminComponent,
        EditJobDetailsComponent,
        ManageJobApplicationComponent,
        CommentRatingComponent,
        CommentRatingToCompanyComponent,
        ViewCommentFromCompanyComponent,
        ViewProfileByOtherComponent,
        ViewProfileOfCompanyComponent,
        SetPreferenceComponent,
        DeleteJobByAdminComponent,
        SearchJobByFreelancerComponent,
        SearchResultByCompanyComponent
    ]
})
export class UserModule {
}