import { Directive, AfterViewInit, OnDestroy, Input, ElementRef, NgZone, HostListener } from '@angular/core';
import { TableComponent } from './table.component';
import { DomHandler } from '../dom/domhandler';

@Directive({
    selector: '[cherryReorderableColumn]'
})
export class ReorderableColumnDirective implements AfterViewInit, OnDestroy {

    @Input() cherryReorderableColumnDisabled: boolean;

    dragStartListener: any;

    dragOverListener: any;

    dragEnterListener: any;

    dragLeaveListener: any;

    mouseDownListener: any;

    constructor(public dt: TableComponent, public el: ElementRef, public domHandler: DomHandler, public zone: NgZone) { }

    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.zone.runOutsideAngular(() => {
            this.mouseDownListener = this.onMouseDown.bind(this);
            this.el.nativeElement.addEventListener('mousedown', this.mouseDownListener);

            this.dragStartListener = this.onDragStart.bind(this);
            this.el.nativeElement.addEventListener('dragstart', this.dragStartListener);

            this.dragOverListener = this.onDragEnter.bind(this);
            this.el.nativeElement.addEventListener('dragover', this.dragOverListener);

            this.dragEnterListener = this.onDragEnter.bind(this);
            this.el.nativeElement.addEventListener('dragenter', this.dragEnterListener);

            this.dragLeaveListener = this.onDragLeave.bind(this);
            this.el.nativeElement.addEventListener('dragleave', this.dragLeaveListener);
        });
    }

    unbindEvents() {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }

        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }

        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }

        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }

        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    }

    onMouseDown(event) {
        if (event.target.nodeName === 'INPUT' || this.domHandler.hasClass(event.target, 'cherry-ui-column-resizer')) {
            this.el.nativeElement.draggable = false;
        } else {
            this.el.nativeElement.draggable = true;
        }
    }

    onDragStart(event) {
        this.dt.onColumnDragStart(event, this.el.nativeElement);
    }

    onDragOver(event) {
        event.preventDefault();
    }

    onDragEnter(event) {
        this.dt.onColumnDragEnter(event, this.el.nativeElement);
    }

    onDragLeave(event) {
        this.dt.onColumnDragLeave(event);
    }

    @HostListener('drop', ['$event'])
    onDrop(event) {
        if (this.isEnabled()) {
            this.dt.onColumnDrop(event, this.el.nativeElement);
        }
    }

    isEnabled() {
        return this.cherryReorderableColumnDisabled !== true;
    }

    ngOnDestroy() {
        this.unbindEvents();
    }

}
