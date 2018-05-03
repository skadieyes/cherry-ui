import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { routing } from './not-found.routes';

@NgModule({
    imports: [
        // routing
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        NotFoundComponent
    ]
})
export class NotFoundModule { }
