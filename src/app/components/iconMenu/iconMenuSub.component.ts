import { Component, ElementRef, AfterViewInit, OnDestroy, Input, Output, Renderer2, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';


@Component({
    selector: 'cherry-iconmenusub',
    templateUrl: './iconMenuSub.component.html',
    styleUrls: ['./iconMenu.component.scss'],
    providers: [DomHandler]
})
export class IconMenuSubComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Output() itemClickEvent = new EventEmitter<any>();

    @Output() itemHoverEvent = new EventEmitter<any>();

    @Output() itemHoverLeaveEvent = new EventEmitter<any>();

    expanded: boolean;

    constructor(public domHandler: DomHandler) { }

    activeItem: HTMLLIElement;

    theme: String = 'default';

    onItemMouseEnter(event: Event, item: HTMLLIElement, menuitem: MenuItem) {
        if (menuitem.disabled) {
            return;
        }
        this.activeItem = item;
        const nextElement: HTMLElement = <HTMLElement>item.children[0].nextElementSibling;
        if (nextElement) {
            const sublist: HTMLElement = <HTMLElement>nextElement.children[0];
            sublist.style.zIndex = String(++DomHandler.zindex);
            sublist.style.top = '0px';
            sublist.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
        }
        this.itemHoverEvent.emit(menuitem);
    }

    onItemMouseLeave(menuitem: MenuItem) {
        this.activeItem = null;

        this.itemHoverLeaveEvent.emit(menuitem);
    }

    itemClick(event: Event, item: MenuItem) {
        this.itemClickEvent.emit(item);
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        if (!item.url) {
            event.preventDefault();
        }

        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
    }

    componentClick(item: any) {
        this.itemClickEvent.emit(item);
    }
    componentHover(item: any) {
        this.itemHoverEvent.emit(item);
    }
    componentHoverLeave(item: any) {
        this.itemHoverLeaveEvent.emit(item);
    }
    listClick(event: Event) {
        this.activeItem = null;
    }
}
