import { Component, OnInit, ViewEncapsulation, } from '@angular/core';
import { BreadCrumbComponent } from './breadCrumb.component';

@Component({
    selector: 'cherry-breadcrumb-item',
    templateUrl: './breadCrumb-item.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./breadCrumb.component.scss']
})
export class BreadCrumbItemComponent implements OnInit {

    constructor(public _bread: BreadCrumbComponent) {
    }

    ngOnInit() {
    }

}
