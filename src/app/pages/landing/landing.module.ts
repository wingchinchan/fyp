import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponet } from './landing.componet';

const routes: Routes = [{
    path: '',
    data: {
        title: 'Landing page',
        urls: [{title: 'Landing', url: '/'}, {title: 'Landing page'}]
    },
    component: LandingComponet
}];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [LandingComponet]
})
export default class LandingModule { }