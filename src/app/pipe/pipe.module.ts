import { NgModule } from '@angular/core';
import { JobPipe } from './jobPipe';
import { UserPipe } from './userPipe';
import { ChatPipe } from './chatPipe';
import { MessagePipe } from './messagePipe';

@NgModule({
    imports:        [],
    declarations:   [JobPipe, UserPipe, ChatPipe, MessagePipe],
    exports:        [JobPipe, UserPipe, ChatPipe, MessagePipe],
})

export class PipeModule {

    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
}