import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../app/components/layout/layout.service';
import { MenuItem } from '../../../app/components/common/menuitem';

@Component({
    selector: 'cherry-headerdemo',
    templateUrl: './headerdemo.component.html',
    styleUrls: ['./headerdemo.component.scss']
})
export class HeaderDemoComponent implements OnInit {

    header_items: MenuItem[];

    constructor(public _layout: LayoutService) {

    }

    expand(event: any) {
        this._layout.expand(event);
    }
    collapse(event: any) {
        this._layout.collapse(event);
    }
    ngOnInit() {
        this.header_items = [
            { label: 'CRM', icon: 'fa-bar-chart fa-2x' },
            { label: 'Calendar', icon: 'fa-calendar fa-2x' },
            { label: 'Documentation', icon: 'fa-book fa-2x' },
            { label: 'Support', icon: 'fa-support fa-2x', routerLink: '/menudemo' },
            { label: 'Social', icon: 'fa-twitter fa-2x', url: 'http://www.baidu.com' }
        ];
    }
    topTopMenuClick(item: any) {
        console.log('top-top');
        console.log(item);
    }

}

