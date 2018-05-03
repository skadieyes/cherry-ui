import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './breadCrumb.component';
import { BreadCrumbItemComponent } from './breadCrumb-item.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [BreadCrumbComponent,
        BreadCrumbItemComponent
    ],
    exports: [
        BreadCrumbComponent,
        BreadCrumbItemComponent
    ]
})
export class BreadCrumbModule { }
