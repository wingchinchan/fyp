import { NgModule } from '@angular/core';
import { JobPipe } from './jobPipe';
import { UserPipe } from './userPipe';
import { ChatPipe } from './chatPipe';

@NgModule({
    imports:        [],
    declarations:   [JobPipe, UserPipe, ChatPipe],
    exports:        [JobPipe, UserPipe, ChatPipe],
})

export class PipeModule {

    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
}