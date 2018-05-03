import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';
import { FlexibleMenuService } from './flexibleMenu.service';
@Component({
    selector: 'cherry-flexiblemenusub',
    templateUrl: './flexibleMenuSub.component.html',
    styleUrls: ['./flexibleMenu.component.scss'],
    providers: [DomHandler],
})
export class FlexibleMenuSubComponent {

    @Input() item: any;
    @Input() root: boolean;
    @Output() itemClickEvent = new EventEmitter<any>();

    constructor(public domHandler: DomHandler,
        public _flexMenu: FlexibleMenuService) { }
    activeItem: any;
    clickItem: any;
    @Input() childClickItem: MenuItem;
    theme: String = 'default';
    @ViewChild('list') list: ElementRef;
    @Input() menuParent: MenuItem;


    onItemMouseEnter(event: Event, item: HTMLLIElement, menuitem: MenuItem) {
        if (menuitem.disabled) {
            return;
        }
        this.activeItem = item;
        const nextElement = <HTMLLIElement>item.children[0].nextElementSibling;
        if (nextElement) {
            const sublist = <HTMLUListElement>nextElement.children[0];
            sublist.style.zIndex = String(++DomHandler.zindex);
            if (this.root) {
                sublist.style.top = this.domHandler.getOuterHeight(item.children[0]) + 'px';
                sublist.style.left = '-' + this.list.nativeElement.getBoundingClientRect().left + 'px';
                sublist.style.width = window.innerWidth + 'px';
                sublist.style.paddingLeft = '350px';
                sublist.style.paddingRight = window.innerWidth * 0.18 + 'px';
                sublist.style.paddingTop = '15px';
                sublist.style.paddingBottom = '15px';
            } else {
                sublist.style.top = '0px';
                sublist.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
            }
        }
    }

    onItemMouseLeave(event: Event) {
        this.activeItem = null;
        this.clickItem = null;
    }
    componentClick(item: any) {
        this.itemClickEvent.emit(item);
    }
    itemClick(event: any, item: MenuItem) {
        this.itemClickEvent.emit(item);
        if (item.disabled) {
            event.preventDefault();
            return;
        } if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
        this.activeItem = null;
        this.childClickItem = item;
        this._flexMenu.ifChildClick(false);
    }
    onItemClick(event: any, item: MenuItem) {
        this.clickItem = item;
    }
    listClick(event: any) {
        this.activeItem = null;
    }

}
