import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../app/components/common/menuitem';
import { LayoutService } from '../app/components/layout/layout.service';
@Component({
    selector: 'cherry-components',
    templateUrl: './components.component.html',
    styleUrls: ['./components.component.scss'],
    providers: [LayoutService]
})
export class ComponentsComponent implements OnInit {
    header_items: MenuItem[];

    constructor(public _layout: LayoutService) {
        function foo(x) { return x ; }

    }

    expand(event: any) {
        this._layout.expand(event);
    }
    collapse(event) {
        this._layout.collapse(event);
    }

    ngOnInit() {
        this.header_items = [
            { label: 'Dashboard', icon: 'fa-envelope fa-2x' },
            { label: 'CRM', icon: 'fa-bar-chart fa-2x' },
            { label: '功能中心', icon: 'fa-calendar fa-2x', routerLink: '/dashboard' },
            { label: '风险管理', icon: 'fa-book fa-2x' },
            { label: 'test', icon: 'fa-support fa-2x', routerLink: '/test' },
            { label: 'Social', icon: 'fa-twitter fa-2x', url: 'http://www.baidu.com' }
        ];
    }
    topTopMenuClick(item: any) {
        console.log('top-top');
        console.log(item);
    }


}
