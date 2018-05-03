import { Component, OnInit, Input, HostBinding, ViewEncapsulation, } from '@angular/core';

@Component({
    selector: 'cherry-breadcrumb',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./breadCrumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {

    @Input() uiSeparator = '/';
    @HostBinding('class.cherry-ui-breadcrumb') _uiBreadcrumb = true;

    constructor() {
    }


    ngOnInit() {
    }

}
