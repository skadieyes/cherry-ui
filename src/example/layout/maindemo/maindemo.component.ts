import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../app/components/common/menuitem';
import { LayoutService } from '../../../app/components/layout/layout.service';

@Component({
    selector: 'cherry-maindemo',
    templateUrl: './maindemo.component.html',
    providers: [LayoutService]
})
export class MainDemoComponent implements OnInit {

    constructor() { }

    footerText: string;
    menuName: string;
    menuIcon: string;
    menuIconHtml: any;
    leftMenu: MenuItem[];

    ngOnInit() {
        this.footerText = '300s后锁定';
        this.menuName = '管理中心';
        // 对菜单大图标的设置有两种方法

        // 这是fontawesome方案 直接写class就可以了
        // [menuHeaderIcon]="menuIcon"
        this.menuIcon = 'fa-file-o';

        // 也可以写进一段html 这样可以放入自己定义的图标
        // [menuHeaderIconHtml]="menuIconHtml"
        this.menuIconHtml = `<span class="cherry-icon cherry-icon-blocks"><span class="cherry-icon path1"></span><span class="cherry-icon path2"></span><span class="cherry-icon path3"></span><span class="cherry-icon path4"></span></span>`;
        this.leftMenu = [{
            label: 'File',
            icon: 'fa-bar-chart',
            items: [
                { 'label': '1', 'icon': 'fa-user' },
                {
                    'label': 'Emaeil', 'icon': 'fa-envelope', items: [
                        { 'label': '1', 'icon': 'fa-user', routerLink: '/dashboard/test4' },
                        { 'label': 'Email', 'icon': 'fa-envelope', routerLink: '/dashboard/test3' }
                    ]
                }
            ]
        },
        {
            label: 'Actions',
            icon: 'fa-gear',
            items: [
                { label: 'Calendar', icon: 'fa-calendar', routerLink: '/dashboard/test' },
                { label: 'Documentation', icon: 'fa-book', routerLink: '/dashboard/test2' },
                { label: 'Support', icon: 'fa-support' }
            ]
        }];
    }
    MenuClick(item: any) {
        console.log('left');
        console.log(item.label);
    }
}
