import { Directive, Input, AfterViewInit, ElementRef, NgZone, HostListener } from '@angular/core';
import { TableComponent } from './table.component';
import { DomHandler } from '../dom/domhandler';

@Directive({
    selector: '[cherryReorderableRow]'
})
export class ReorderableRowDirective implements AfterViewInit {

    @Input() index: number;

    @Input() cherryReorderableRowDisabled: boolean;

    mouseDownListener: any;

    dragStartListener: any;

    dragEndListener: any;

    dragOverListener: any;

    dragLeaveListener: any;

    dropListener: any;

    constructor(public dt: TableComponent, public el: ElementRef, public domHandler: DomHandler, public zone: NgZone) { }

    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.el.nativeElement.droppable = true;
            this.bindEvents();
        }
    }

    bindEvents() {
        this.zone.runOutsideAngular(() => {
            this.mouseDownListener = this.onMouseDown.bind(this);
            this.el.nativeElement.addEventListener('mousedown', this.mouseDownListener);

            this.dragStartListener = this.onDragStart.bind(this);
            this.el.nativeElement.addEventListener('dragstart', this.dragStartListener);

            this.dragEndListener = this.onDragEnd.bind(this);
            this.el.nativeElement.addEventListener('dragend', this.dragEndListener);

            this.dragOverListener = this.onDragOver.bind(this);
            this.el.nativeElement.addEventListener('dragover', this.dragOverListener);

            this.dragLeaveListener = this.onDragLeave.bind(this);
            this.el.nativeElement.addEventListener('dragleave', this.dragLeaveListener);
        });
    }

    unbindEvents() {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }

        if (this.dragStartListener) {
            document.removeEventListener('dragstart', this.dragStartListener);
            this.dragStartListener = null;
        }

        if (this.dragEndListener) {
            document.removeEventListener('dragend', this.dragEndListener);
            this.dragEndListener = null;
        }

        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }

        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    }

    onMouseDown(event) {
        if (this.domHandler.hasClass(event.target, 'cherry-ui-table-reorderablerow-handle')) {
            this.el.nativeElement.draggable = true;
        } else {
            this.el.nativeElement.draggable = false;
        }
    }

    onDragStart(event) {
        this.dt.onRowDragStart(event, this.index);
    }

    onDragEnd(event) {
        this.dt.onRowDragEnd(event);
        this.el.nativeElement.draggable = false;
    }

    onDragOver(event) {
        this.dt.onRowDragOver(event, this.index, this.el.nativeElement);
        event.preventDefault();
    }

    onDragLeave(event) {
        this.dt.onRowDragLeave(event, this.el.nativeElement);
    }

    isEnabled() {
        return this.cherryReorderableRowDisabled !== true;
    }

    @HostListener('drop', ['$event'])
    onDrop(event) {
        if (this.isEnabled() && this.dt.rowDragging) {
            this.dt.onRowDrop(event, this.el.nativeElement);
        }
    }
}
