import { Directive, AfterViewInit, ElementRef, Input } from '@angular/core';
import { DomHandler } from '../dom/domhandler';

@Directive({
    selector: '[cherryReorderableRowHandle]'
})
export class ReorderableRowHandleDirective implements AfterViewInit {

    @Input() index: number;

    constructor(public el: ElementRef, public domHandler: DomHandler) { }

    ngAfterViewInit() {
        this.domHandler.addClass(this.el.nativeElement, 'cherry-ui-table-reorderablerow-handle');
    }
}
