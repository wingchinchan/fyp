import { NgModule } from '@angular/core';
import { JobPipe } from './jobPipe';

@NgModule({
    imports:        [],
    declarations:   [JobPipe],
    exports:        [JobPipe],
})

export class PipeModule {

    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
}