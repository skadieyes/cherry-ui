import { Component, OnInit, Output, Input, EventEmitter, ElementRef, ViewChild, AfterViewChecked, ContentChild, TemplateRef, OnChanges, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { MenuItem } from '../../common/menuitem';
import { LayoutService } from '../layout.service';
import { SearchService } from '../../search/search.service';
import { AccordionMenuComponent } from '../../accordionMenu/accordionMenu.component';
import { Observable } from 'rxjs/Observable';
import { currentId } from 'async_hooks';

class BreadItem {
    label: string;
    url: string;
    current: Boolean;
    constructor(label: string, url: string, current: Boolean) {
        this.label = label;
        this.url = url;
        this.current = current;
    }
}
@Component({
    selector: 'cherry-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    animations: [
        trigger('BoxUpAnimation', [
            state('up', style({
                top: '70px'
            })),
            state('down', style({
                top: '170px'
            })),
            transition('up <=> down', animate('500ms cubic-bezier(0.23, 1, 0.32, 1)'))
        ]),
        trigger('LeftAnimation', [
            state('up', style({
                top: '70px'
            })),
            state('down', style({
                top: '170px'
            })),
            transition('up <=> down', animate('500ms cubic-bezier(0.23, 1, 0.32, 1)'))
        ]),
        trigger('leftSmallAnimation', [
            state('collapse', style({
                width: '70px',
                backgroundColor: '#e6e6e6',
                overflow: 'visible'
            })),
            state('expand', style({
                width: '300px',
                backgroundColor: '#fff',
                overflow: 'auto'
            })),
            transition('collapse <=> expand', animate('250ms cubic-bezier(0.47, 0, 0.745, 0.715)'))
        ]),
        trigger('BodyAnimation', [
            state('collapse', style({
                left: '300px',
                width: 'calc(100% - 300px)',
            })),
            state('expand', style({
                left: '70px',
                width: 'calc(100% - 70px)',
            })),
            transition('collapse <=> expand', animate('250ms cubic-bezier(0.47, 0, 0.745, 0.715)'))
        ]),
        trigger('BodySizeAnimation', [
            state('all', style({
                left: '0px',
                width: 'calc(100%)',
            })),
            state('right', style({
                left: '300px',
                width: 'calc(100% - 300px)',
            })),
            transition('collapse <=> expand', animate('250ms cubic-bezier(0.47, 0, 0.745, 0.715)'))
        ]),
        trigger('BottomAnimation', [
            state('collapse', style({
                left: '300x',
                width: 'calc(100% - 300px)',
            })),
            state('expand', style({
                width: 'calc(100% - 70px)',
                left: '70px'
            }))
        ])
    ],
    providers: [SearchService]
})
export class MainComponent implements OnInit {
    constructor(
        public _layout: LayoutService,
        public _search: SearchService,
        public el: ElementRef,
        public _router: Router) { }

    rightShow: Boolean = false;
    leftSmall: Boolean = false;
    leftExpandDone: Boolean = false;
    menuNameSet: Boolean = false;
    theme: String = 'default';
    @Input() menuActiveItemLabel: string;
    breadRouterArray: Array<any>;

    @ViewChild(AccordionMenuComponent) accordionMenu: AccordionMenuComponent;

    @Input() set footerShow(show: Boolean) {
        this._footerShow = show;
        this.footerShowJudge(this.footerShow);
    }
    get footerShow(): Boolean {
        return this._footerShow;
    }
    _footerShow: Boolean = true;
    @Input() set menuShow(show: Boolean) {
        this._menuShow = show;
        this.menuShowJudge(this.menuShow);
    }
    get menuShow(): Boolean {
        return this._menuShow;
    }
    _menuShow: Boolean = true;
    @Input() set menuHeaderName(name: string) {
        this._menuHeaderName = name;
        if (this.menuHeaderName) {
            this.menuNameSet = true;
        } else {
            this.menuNameSet = false;
        }
    }
    get menuHeaderName(): string {
        return this._menuHeaderName;
    }
    _menuHeaderName: string;
    @Input() menuHeaderIcon: string;
    @Input() menuSearchShow: Boolean = true;
    @Input() footerText: string;

    @Output() itemClickEvent = new EventEmitter<any>();
    @Output() miniMenuHoverEvent = new EventEmitter<any>();
    @Output() miniMenuHoverLeaveEvent = new EventEmitter<any>();

    @Input() set menuModel(items: MenuItem[]) {
        this._menuModel = items;
    }
    get menuModel() {
        return this._menuModel;
    }
    @Input() _menuModel: MenuItem[];

    @Input() menuHeaderIconHtml: string;
    @Input() breadCrumb: Boolean = true;
    @ViewChild('center') center: ElementRef;

    @ContentChild('bread') _breadcrumb: TemplateRef<any>;

    ngOnInit() {
        // 如果底部不显示做的处理
        this.footerShowJudge(this.footerShow);
        // 如果菜单不显示做的处理
        this.menuShowJudge(this.menuShow);
        // 对需要有搜索功能的数据的处理
        this._search.parentSet(this.menuModel);
        this.breadUrlSet();
        /*        Observable.fromEvent(window, 'load')
                   .subscribe((event) => {
                       // 左侧菜单响应式变化
                       console.log('222');
                   }); */
        this._router.events.subscribe((event) => {
            this.breadUrlSet();
        });
    }

    breadUrlSet() {
        const breadUrl = this._router.routerState.snapshot.url;
        const urlHandle = breadUrl.replace(/\//g, '//') + '/';
        const patt = /\/[^/]+\//g;
        const urlHandleArray = urlHandle.match(patt);
        this.breadRouterArray = new Array(urlHandleArray.length);
        for (let i = 0; i < urlHandleArray.length; i++) {
            const label = urlHandleArray[i].replace(/\//g, '');
            switch (i) {
                case 0:
                    this.breadRouterArray[i] = new BreadItem(label, '', false);
                    break;
                case 1:
                    this.breadRouterArray[i] = new BreadItem(label, label, false);
                    break;
                default:
                    this.breadRouterArray[i] = new BreadItem(label, this.breadRouterArray[i - 1].url + '/' + label, false);
            }
            if (i === urlHandleArray.length - 1) {
                switch (i) {
                    case 0:
                        this.breadRouterArray[i] = new BreadItem(label, '', true);
                        break;
                    case 1:
                        this.breadRouterArray[i] = new BreadItem(label, label, true);
                        break;
                    default:
                        this.breadRouterArray[i] = new BreadItem(label, this.breadRouterArray[i - 1].url + '/' + label, true);
                }
            }
        }
    }
    searchMenu(result: MenuItem) {
        if (result.parents) {
            const parent = result.parents;
            for (let i = 0; i < parent.length; i++) {
                parent[i].expanded = true;
            }
        }
    }
    labelSet() {
        this.menuActiveItemLabel = '';
    }
    leftMenuClick(item: any) {
        if (item.label && item.routerLink) {
            this.menuActiveItemLabel = item.label;
            this._layout.onlyParentRoute(false);
            this.breadUrlSet();
        }
        this.itemClickEvent.emit(item);
    }

    miniMenuHover(item: MenuItem) {
        this.miniMenuHoverEvent.emit(item);
    }

    miniMenuHoverLeave(item: MenuItem) {
        this.miniMenuHoverLeaveEvent.emit(item);
    }
    leftScollDone(event: any) {
        if (event.toState === 'expand') {
            this.leftExpandDone = true;
        }
    }
    leftExpand(event: any) {
        this.leftSmall = false;
        this.leftExpandDone = false;
    }
    leftCollapse(event: any) {
        this.leftSmall = true;
    }
    menuShowJudge(menushow: Boolean) {
        if (menushow === true) {
            this.el.nativeElement.querySelector('.architecture-body').style.width = 'calc(100% - 300px)';
            this.el.nativeElement.querySelector('.architecture-body').style.left = '300px';
        } else if (menushow === false) {
            this.el.nativeElement.querySelector('.architecture-body').style.width = '100%';
            this.el.nativeElement.querySelector('.architecture-body').style.left = '0';
        }

    }
    footerShowJudge(footshow: Boolean) {
        if (footshow) {
            this.el.nativeElement.querySelector('.architecture-center-body').style.height = 'calc(100% - 30px)';
        } else {
            this.el.nativeElement.querySelector('.architecture-center-body').style.height = 'calc(100%)';
        }

    }
}
