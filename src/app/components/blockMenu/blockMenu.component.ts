import { Component, ElementRef, AfterViewInit, Input, Output, Renderer2, OnInit, EventEmitter } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';
import { Location } from '@angular/common';

@Component({
    selector: 'cherry-blockmenu',
    templateUrl: './blockMenu.component.html',
    styleUrls: ['./blockMenu.component.scss'],
    providers: [DomHandler]
})
export class BlockMenuComponent implements OnInit {

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
        if (!this.activeItem && this.model && this.model.length) {
            this.activeItem = this.model[0];
        }
    }
    fun() {
        console.log('你的变量');
    }
    mouseHover(item: MenuItem) {
        this.hoverItem = item;
    }
    _getHostElement(): HTMLElement {
        return this._element.nativeElement;
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

}



