import { Component, ElementRef, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';
import { Location } from '@angular/common';


@Component({
    selector: 'cherry-verticaltabmenu',
    templateUrl: './verticaltabmenu.component.html',
    styleUrls: ['./verticalTabMenu.component.scss'],
    providers: [DomHandler]
})
export class VerticalTabMenuComponent implements OnInit {

    @Input() model: MenuItem[];

    @Input() activeItem: MenuItem;

    @Input() popup: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Output() itemClickEvent = new EventEmitter<any>();

    hoverItem: any;

    theme: String = 'default';

    constructor(public _element: ElementRef) {
    }

    ngOnInit() {

    }

    itemClick(event: Event, item: MenuItem) {
        this.itemClickEvent.emit(item);
        if (item.disabled) {
            event.preventDefault();
            return;
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

        this.activeItem = item;
    }
    mouseHover(item: MenuItem) {
        this.hoverItem = item;
    }
    _getHostElement(): HTMLElement {
        return this._element.nativeElement;
    }
}
