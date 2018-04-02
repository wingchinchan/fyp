import { NgModule } from '@angular/core';
import { JobPipe } from './jobPipe';
import { UserPipe } from './userPipe';
import { ChatPipe } from './chatPipe';
import { MessagePipe } from './messagePipe';
import { JobApplicationPipe } from './jobApplicationPipe';
import {CommentByCompanyPipe} from './commentByCompanyPipe';

@NgModule({
    imports:        [],
    declarations:   [JobPipe, UserPipe, ChatPipe, MessagePipe, JobApplicationPipe, CommentByCompanyPipe],
    exports:        [JobPipe, UserPipe, ChatPipe, MessagePipe, JobApplicationPipe, CommentByCompanyPipe],
})

export class PipeModule {

    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
}