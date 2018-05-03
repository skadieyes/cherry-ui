
import {
    Component, ElementRef, ViewChild, Input, AfterViewInit, OnDestroy, Renderer2, Output, EventEmitter
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DomRenderer } from '../common/dom';

@Component({
    selector: 'cherry-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    animations: [
        trigger('dropdownState', [
            state('active', style({
                transform: 'scale(1)',
                opacity: 1
            })),
            state('inactive', style({
                transform: 'scale(0)',
                opacity: 0
            })),
            transition('inactive <=> active', animate('300ms ease'))
        ])
    ],
    providers: [DomRenderer]
})
export class DropdownComponent implements AfterViewInit, OnDestroy {
    @Input() menus: any;
    @Input() header: string;
    @Input() direction = 'bottom-right';
    @Input() theme: string;
    @Input() caret = true;
    @Input() hover: boolean;
    @Output() itemClickEvent = new EventEmitter<any>();
    @ViewChild('container') container: ElementRef;
    @ViewChild('dropdownMenu') dropdownMenu: ElementRef;

    isOpen: boolean;
    selfClick: boolean;
    itemClick: boolean;
    documentClickListener: any;
    modal: any;
    clickitem: any;
    constructor(public domRenderer: DomRenderer, public renderer2: Renderer2) { }

    clickDisabled(event: any, item: any) {
        if (!item.url) {
            event.preventDefault();
            return false;
        }
    }

    ngAfterViewInit() {
        this.domRenderer.addClass(this.dropdownMenu.nativeElement, `cherry-ui-dropdown-${this.direction}`);
    }

    open(menu: any, event?: any) {
        this.clickitem = menu;
        if (!this.hover) {
            this.selfClick = true;
            if (!this.isOpen) {
                this.isOpen = true;
            } else {
                this.close();
                this.isOpen = false;
            }
            this.onDocumentClickListener();
        }
    }

    onMouseover() {
        if (this.hover) {
            this.isOpen = true;
        }
    }

    onMouseout() {
        if (this.hover) {
            this.isOpen = false;
        }
    }

    onItemClick(item: any) {
        this.itemClickEvent.emit(item);
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
        if (this.hover) {
            this.isOpen = false;
        } else {
            this.close();
        }
    }
    onParentClick(item: any) {
        this.itemClickEvent.emit(item);
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
    }

    onDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer2.listen('body', 'click', () => {
                if (!this.selfClick && !this.itemClick) {
                    this.close();
                }
                this.selfClick = false;
                this.itemClick = false;
            });
        }
    }

    close() {
        this.isOpen = false;
        this.offDocumentClickListener();
    }

    offDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    ngOnDestroy() {
        this.offDocumentClickListener();
    }
}
