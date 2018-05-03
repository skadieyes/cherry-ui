import { Directive, AfterViewInit, OnDestroy, Input, ElementRef, NgZone } from '@angular/core';
import { TableComponent } from './table.component';
import { DomHandler } from '../dom/domhandler';

@Directive({
    selector: '[cherryResizableColumn]'
})
export class ResizableColumnDirective implements AfterViewInit, OnDestroy {

    @Input() cherryResizableColumnDisabled: boolean;

    resizer: HTMLSpanElement;

    resizerMouseDownListener: any;

    documentMouseMoveListener: any;

    documentMouseUpListener: any;

    constructor(public dt: TableComponent, public el: ElementRef, public domHandler: DomHandler, public zone: NgZone) { }

    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.domHandler.addClass(this.el.nativeElement, 'cherry-ui-resizable-column');
            this.resizer = document.createElement('span');
            this.resizer.className = 'cherry-ui-column-resizer cherry-ui-clickable';
            this.el.nativeElement.appendChild(this.resizer);
            this.zone.runOutsideAngular(() => {
                this.resizerMouseDownListener = this.onMouseDown.bind(this);
                this.resizer.addEventListener('mousedown', this.resizerMouseDownListener);
            });
        }
    }

    bindDocumentEvents() {
        this.zone.runOutsideAngular(() => {
            this.documentMouseMoveListener = this.onDocumentMouseMove.bind(this);
            document.addEventListener('mousemove', this.documentMouseMoveListener);

            this.documentMouseUpListener = this.onDocumentMouseUp.bind(this);
            document.addEventListener('mouseup', this.documentMouseUpListener);
        });
    }

    unbindDocumentEvents() {
        if (this.documentMouseMoveListener) {
            document.removeEventListener('mousemove', this.documentMouseMoveListener);
            this.documentMouseMoveListener = null;
        }

        if (this.documentMouseUpListener) {
            document.removeEventListener('mouseup', this.documentMouseUpListener);
            this.documentMouseUpListener = null;
        }
    }

    onMouseDown(event: Event) {
        this.dt.onColumnResizeBegin(event);
        this.bindDocumentEvents();
    }

    onDocumentMouseMove(event: Event) {
        this.dt.onColumnResize(event);
    }

    onDocumentMouseUp(event: Event) {
        this.dt.onColumnResizeEnd(event, this.el.nativeElement);
        this.unbindDocumentEvents();
    }

    isEnabled() {
        return this.cherryResizableColumnDisabled !== true;
    }

    ngOnDestroy() {
        if (this.resizerMouseDownListener) {
            this.resizer.removeEventListener('mousedown', this.resizerMouseDownListener);
        }

        this.unbindDocumentEvents();
    }
}
