import { Component, ElementRef, AfterViewInit, OnDestroy, Input, Output, Renderer2, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';

@Component({
    selector: 'cherry-iconmenu',
    templateUrl: './iconMenu.component.html',
    styleUrls: ['./iconMenu.component.scss'] ,
    providers: [DomHandler]
})
export class IconMenuComponent implements AfterViewInit, OnDestroy {

    @Input() model: MenuItem[];

    @Input() popup: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() appendTo: any;

    @Output() itemClickEvent = new EventEmitter<any>();

    @Output() itemHoverEvent = new EventEmitter<any>();

    @Output() itemHoverLeaveEvent = new EventEmitter<any>();

    container: any;

    documentClickListener: any;

    preventDocumentDefault: any;

    theme: String = 'default';

    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2) { }

    ngAfterViewInit() {
        this.container = this.el.nativeElement.children[0];

        if (this.popup) {
            if (this.appendTo) {
                if (this.appendTo === 'body') {
                    document.body.appendChild(this.container);
                } else {
                    this.domHandler.appendChild(this.container, this.appendTo);
                }
            }
        }
    }

    toggle(event: Event) {
        if (this.container.offsetParent) {
            this.hide();
        } else {
            this.show(event);
        }
    }

    show(event: Event) {
        this.preventDocumentDefault = true;
        this.container.style.display = 'block';
        this.domHandler.absolutePosition(this.container, event.currentTarget);
        this.domHandler.fadeIn(this.container, 250);
        this.bindDocumentClickListener();
    }

    hide() {
        this.container.style.display = 'none';
        this.unbindDocumentClickListener();
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if (!this.preventDocumentDefault) {
                    this.hide();
                }
                this.preventDocumentDefault = false;
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
    ngOnDestroy() {
        if (this.popup && this.documentClickListener) {
            this.unbindDocumentClickListener();

            if (this.appendTo) {
                this.el.nativeElement.appendChild(this.container);
            }
        }
    }

}
