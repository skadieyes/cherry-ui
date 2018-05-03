import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from '../../components/common/menuitem';
import { LayoutService } from '../../components';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';

@Component({
    selector: 'cherry-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [LayoutService, DashboardService]
})
export class DashboardComponent implements OnInit, OnDestroy {

    header_items: MenuItem[];
    logo: string;
    mainMenu: any;
    rightMenu: MenuItem[];
    footerText: string;
    menuName: string;
    menuIcon: string;
    leftMenu: MenuItem[];
    menuIconHtml: string;
    keyword: any;
    options: Array<any>;
    selectedOption: object;
    menuParent: MenuItem;
    menuShow: Boolean = true;
    menuActiveItem: MenuItem;
    menuActiveItemLabel: string;

    menuDataUrls = 'assets/config/menu.json';
    result: MenuItem[];

    menuFixed: Boolean = false;

    constructor(public _layout: LayoutService,
        public _dashboard: DashboardService,
        public _router: Router) {

    }

    expand(event: any) {
        this._layout.expand(event);
    }
    collapse(event: any) {
        this._layout.collapse(event);
    }
    ngOnInit() {
        // 工作区标题设置
        // this.menuActiveItemLabel = sessionStorage.getItem('menuActiveItemLabel');

        this.menuParent = { label: '列表', icon: 'fa-list-alt' };
        this.options = [
            { value: '中文', label: '中文' },
            { value: 'English', label: 'English' },
            { value: 'Other', label: 'Disabled', disabled: true }
        ];
        this.selectedOption = this.options[0];
        this.header_items = [
            { label: 'UI框架', icon: 'fa-envelope fa-2x', routerLink: '/dashboard' },
            { label: 'CRM', icon: 'fa-bar-chart fa-2x' },
            { label: '功能中心', icon: 'fa-calendar fa-2x' },
            { label: '风险管理', icon: 'fa-book fa-2x' },
            { label: 'Support', icon: 'fa-support fa-2x' },
            { label: 'Social', icon: 'fa-twitter fa-2x', url: 'http://www.baidu.com' }
        ];
        this.logo = 'assets/img/cherry.png';
        this.mainMenu = [
            { label: '组件', icon: 'fa-calendar', routerLink: 'component' },
            { label: '模式', icon: 'fa-paste', routerLink: 'pattern' },
            { label: '应用', icon: 'fa-book', routerLink: 'app' }
        ];
        this.rightMenu = [{
            label: '切换菜单',
            icon: 'fa-exchange',
            expanded: false,
            command: () => { this.menuFixed = !this.menuFixed; }
        },
        {
            label: 'AEdit', icon: 'fa-edit', expanded: false, items: [
                { 'label': '1', 'icon': 'fa-user' }
            ]
        },
        {
            label: '功能点',
            icon: 'fa-gear',
            expanded: false,
            items: [
                { label: 'Calendar', icon: 'fa-calendar', url: 'http://www.baidu.com' },
                { label: 'Documentation', icon: 'fa-book', routerLink: '/menudemo' },
                { label: 'Support', icon: 'fa-support' }
            ]
        }];
        this.footerText = '300s后锁定';
        // 对菜单大图标的设置有两种方法

        // 这是fontawesome方案 直接写class就可以了
        // [menuHeaderIcon]='menuIcon'
        this.menuIcon = 'fa-file-o';

        // 也可以写进一段html 这样可以放入自己定义的图标
        // [menuHeaderIconHtml]='menuIconHtml'
        this.menuIconHtml = `<span class='cherry-icon cherry-icon-blocks'><span class='cherry-icon path1'></span><span class='cherry-icon path2'></span><span class='cherry-icon path3'></span><span class='cherry-icon path4'></span></span>`;
        const initMenu = this.MenuNameMatch(this._router.url);
        this._dashboard.get(this.menuDataUrls).subscribe(data => {
            this.result = data[initMenu];
            this.leftMenu = this.result;
        });

        if (this._router.routerState.snapshot.url === '/dashboard') {
            this.menuShow = false;
            this.menuActiveItemLabel = '';
        } else {
            this.menuShow = true;
            this.menuActiveItemLabel = sessionStorage.getItem('menuActiveItemLabel');
        }

        const menuName = localStorage.getItem('menuTitle');
        this._layout.menuHeader = menuName;
    }

    ngOnDestroy() {
        localStorage.removeItem('menuTitle');
        sessionStorage.removeItem('menuActiveItemLabel');
    }
    topCenterMenuClick(item: MenuItem) {
        this.MenuSet(item);
        this.menuShow = true;
        localStorage.setItem('menuTitle', this._layout.menuHeader);
    }
    MenuSet(item: MenuItem) {
        this._dashboard.get(this.menuDataUrls).subscribe(data => {
            const initMenu = this._router.url.replace('/dashboard/', '');
            this.result = data[initMenu];
            this.leftMenu = this.result;
        });
    }
    miniMenuHover(item: MenuItem) {

    }
    miniMenuHoverLeave(item: MenuItem) {

    }
    MenuNameMatch(url: string) {
        for (let i = 0; i < this.mainMenu.length; i++) {
            const ifMatch = url.indexOf(this.mainMenu[i].routerLink);
            if (ifMatch > -1) {
                return this.mainMenu[i].routerLink;
            }
        }
    }

    topTopMenuClick(item: any) {
        console.log('top-top');
        console.log(item.label);
    }
    topRightMenuClick(item: any) {
        console.log('top-right');
        console.log(item.label);
    }
    MenuClick(item: any) {
        console.log('left');
        console.log(item.label);
        if (item.label && item.routerLink) {
            this.menuActiveItemLabel = item.label;
            sessionStorage.setItem('menuActiveItemLabel', this.menuActiveItemLabel);
        }
    }

}
