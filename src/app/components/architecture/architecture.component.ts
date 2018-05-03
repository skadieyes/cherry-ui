import { NgModule, Component, ElementRef, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem } from '../common/menuitem';
import { ArchitectureItem } from './architecture.model';

@Component({
    selector: 'cherry-template-architecture',
    templateUrl: './architecture.component.html',
    animations: [
        trigger('TopTopAnimation', [
            state('hidden', style({
                height: '0'
            })),
            state('visible', style({
                height: '100px'
            })),
            transition('visible <=> hidden', animate('500ms cubic-bezier(0.23, 1, 0.32, 1)'))
        ]),
        trigger('TopAnimation', [
            state('up', style({
                top: '0'
            })),
            state('down', style({
                top: '100px'
            })),
            transition('up <=> down', animate('500ms cubic-bezier(0.23, 1, 0.32, 1)'))
        ]),
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
            transition('collapse <=> expand', animate('500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'))
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
            transition('collapse <=> expand', animate('500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'))
        ])
    ]
})
export class ArchitectureComponent implements OnInit {
    @Input() model: ArchitectureItem;
    @Output() topCenterMenuClickEvent = new EventEmitter<any>();
    @Output() topTopMenuClickEvent = new EventEmitter<any>();
    @Output() topRightMenuClickEvent = new EventEmitter<any>();
    @Output() leftMenuClickEvent = new EventEmitter<any>();
    @Input() topTopMenuShow: Boolean = true;
    leftShow: Boolean = true;
    rightShow: Boolean = false;
    topBottomShow: Boolean = false;
    topTopShow: Boolean = false;
    leftSmall: Boolean = false;
    leftExpandDone: Boolean = false;
    classname: string;
    left_header_name: string;
    left_header_icon: string;
    bottom_text: string;
    top_left_logo: string;
    top_Center_Menu_HasChild: Boolean = true;
    top_right_menu_items: any;

    public animating: boolean;
    public left_menu_items: MenuItem[];
    public top_center_menu_items: MenuItem[];
    public top_top_menu_items: MenuItem[];

    constructor(public el: ElementRef) {

    }

    ngOnInit() {
        this.topCenterMenuJudge(this.model.top_center_menu_items);
    }

    topCenterMenuClick(item: any) {
        this.topCenterMenuClickEvent.emit(item);
    }
    topTopMenuClick(item: any) {
        this.topTopMenuClickEvent.emit(item);
    }
    topRightMenuClick(item: any) {
        this.topRightMenuClickEvent.emit(item);
    }
    leftMenuClick(item: any) {
        this.leftMenuClickEvent.emit(item);
    }
    topCenterMenuJudge(item: any) {
        for (let i = 0; i < item.length; i++) {
            for (const a in item[i]) {
                if (a === 'items') {
                    this.top_Center_Menu_HasChild = true;
                    return;
                } else {
                    this.top_Center_Menu_HasChild = false;
                }
            }
        }
    }
    toggle(event: any) {
        if (this.animating) {
            return false;
        }
        this.animating = true;
        event.preventDefault();
    }

    expand(event: any) {
        this.topTopShow = true;
    }
    collapse(event: any) {
        this.topTopShow = false;
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

    onToggleDone(event: Event) {
        this.animating = false;
    }
    ChangeClass(classname: any) {
        switch (classname) {
            case 'left':
                this.leftShow = false;
                this.el.nativeElement.querySelector('.architecture-body').style.left = '0px';
                this.el.nativeElement.querySelector('.architecture-body').style.width = '100%';
                break;
            case 'right':
                this.rightShow = false;
                break;
            case 'top-bottom':
                this.topBottomShow = false;
                if (this.topTopShow === false) {
                    this.el.nativeElement.querySelector('.architecture-boxup').style.top = '70px';
                    this.el.nativeElement.querySelector('.architecture-boxup').style.height = 'calc(100% - 100px)';
                } else if (this.topTopShow === true) {
                    this.el.nativeElement.querySelector('.architecture-boxup').style.top = '170px';
                    this.el.nativeElement.querySelector('.architecture-boxup').style.height = 'calc(100% - 100px)';
                }
                break;
            case 'top-top':
                this.topTopShow = false;
                if (this.topBottomShow === false) {
                    this.el.nativeElement.querySelector('.architecture-top').style.top = '0px';
                    this.el.nativeElement.querySelector('.architecture-boxup').style.top = '70px';
                    this.el.nativeElement.querySelector('.architecture-left').style.top = '70px';
                }
                break;
        }
    }
    AddClass(classname: any) {
        switch (classname) {
            case 'left':
                this.leftShow = true;
                this.el.nativeElement.querySelector('.architecture-body').style.left = '300px';
                this.el.nativeElement.querySelector('.architecture-body').style.width = 'calc(100% - 300px)';
                break;
            case 'right':
                this.rightShow = true;
                break;
            case 'top-bottom':
                this.topBottomShow = true;
                if (this.topTopShow === false) {
                    this.el.nativeElement.querySelector('.architecture-boxup').style.top = '110px';
                    this.el.nativeElement.querySelector('.architecture-boxup').style.height = 'calc(100% - 140px)';
                } else if (this.topTopShow === true) {
                    this.el.nativeElement.querySelector('.architecture-boxup').style.top = '210px';
                    this.el.nativeElement.querySelector('.architecture-boxup').style.height = 'calc(100% - 140px)';
                    console.log(this.el.nativeElement.querySelector('.architecture-top-top'));
                    // this.el.nativeElement.querySelector('.architecture-top-bottom').style.top = '170px';
                }
                break;
            case 'top-top':
                this.topTopShow = true;
                if (this.topBottomShow === false) {
                    this.el.nativeElement.querySelector('.architecture-top').style.top = '100px';
                    this.el.nativeElement.querySelector('.architecture-boxup').style.top = '170px';
                    this.el.nativeElement.querySelector('.architecture-left').style.top = '170px';
                } else if (this.topBottomShow === true) {
                    this.el.nativeElement.querySelector('.architecture-top').style.top = '100px';
                    this.el.nativeElement.querySelector('.architecture-top-bottom').style.top = '170px';
                    this.el.nativeElement.querySelector('.architecture-boxup').style.top = '210px';
                }
                break;
        }

    }
}
