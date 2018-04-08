import { NgModule } from '@angular/core';
import { JobPipe } from './jobPipe';
import { UserPipe } from './userPipe';
import { ChatPipe } from './chatPipe';
import { MessagePipe } from './messagePipe';
import { JobApplicationPipe } from './jobApplicationPipe';
import {CommentByCompanyPipe} from './commentByCompanyPipe';
import {FormatFileSizePipe} from './testUploadPipe';

@NgModule({
    imports:        [],
    declarations:   [JobPipe, UserPipe, ChatPipe, MessagePipe, JobApplicationPipe, CommentByCompanyPipe, FormatFileSizePipe],
    exports:        [JobPipe, UserPipe, ChatPipe, MessagePipe, JobApplicationPipe, CommentByCompanyPipe, FormatFileSizePipe],
})

export class PipeModule {

    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
}