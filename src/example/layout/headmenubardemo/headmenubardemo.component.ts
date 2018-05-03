import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../app/components/common/menuitem';

@Component({
    selector: 'cherry-headmenubardemo',
    templateUrl: './headmenubardemo.component.html',
    styleUrls: ['./headmenubardemo.component.scss']
})
export class HeadMenuBarDemoComponent implements OnInit {

    constructor() { }

    logo: string;
    mainMenu: MenuItem[];
    rightMenu: MenuItem[];

    ngOnInit() {
        this.logo = 'assets/img/kylinLogo.png';
        this.mainMenu = [
            { label: '文件管理', icon: 'fa-bar-chart' },
            { label: '查询列表', icon: 'fa-calendar' },
            { label: 'Documentation', icon: 'fa-book' },
            { label: 'Support', icon: 'fa-support' },
            { label: 'Social', icon: 'fa-twitter' }
        ];
        this.rightMenu = [{
            label: 'File',
            icon: 'fa-bar-chart',
            expanded: false,
            items: [
                { label: '1', icon: 'fa-user' },
                {
                    'label': 'FBEmail', 'icon': 'fa-envelope', expanded: false, items: [
                        { 'label': '1', 'icon': 'fa-user' },
                        { 'label': 'FCEmail', 'icon': 'fa-envelope' }
                    ]
                },
                {
                    'label': 'FB2Email', 'icon': 'fa-user'
                }
            ]
        },
        {
            label: 'AEdit', icon: 'fa-edit', expanded: false, items: [
                { 'label': '1', 'icon': 'fa-user' },
                {
                    'label': 'bEmail', 'icon': 'fa-envelope', expanded: false, items: [
                        { 'label': '1', 'icon': 'fa-user' },
                        { 'label': 'CEmail', 'icon': 'fa-envelope' }
                    ]
                }
            ]
        },
        {
            label: 'Actions',
            icon: 'fa-gear',
            expanded: false,
            items: [
                { label: 'Calendar', icon: 'fa-calendar', url: 'http://www.baidu.com' },
                { label: 'Documentation', icon: 'fa-book', routerLink: '/menudemo' },
                { label: 'Support', icon: 'fa-support' }
            ]
        }];
    }

    topCenterMenuClick(item: any) {
        console.log('top-center');
        console.log(item);
    }
    topRightMenuClick(item: any) {
        console.log('top-right');
        console.log(item);
    }

}
