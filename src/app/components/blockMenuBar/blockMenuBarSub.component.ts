import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';

@Component({
    selector: 'cherry-blockmenubarsub',
    templateUrl: './blockMenuBarSub.component.html',
    styleUrls: ['./blockMenuBar.component.scss'],
    providers: [DomHandler],
})
export class BlockMenuBarSubComponent {

    @Input() item: MenuItem;
    @Input() root: boolean;
    @Output() itemClickEvent = new EventEmitter<any>();
    constructor(public domHandler: DomHandler) { }
    activeItem: any;
    clickItem: any;
    theme: String = 'default';
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
                sublist.style.left = '0px';
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
    }
    onItemClick(event: any, item: MenuItem) {
        this.clickItem = item;
    }
    listClick(event: any) {
        this.activeItem = null;
    }

}
