import { Directive, AfterViewInit, Input, HostListener, ElementRef, NgZone } from '@angular/core';
import { TableComponent } from './table.component';
import { DomHandler } from '../dom/domhandler';

@Directive({
    selector: '[cherryEditableColumn]'
})
export class EditableColumnDirective implements AfterViewInit {

    @Input() data: any;

    @Input() field: any;

    @Input() cherryEditableColumnDisabled: boolean;

    constructor(public dt: TableComponent, public el: ElementRef, public domHandler: DomHandler, public zone: NgZone) { }

    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.domHandler.addClass(this.el.nativeElement, 'cherry-ui-editable-column');
        }
    }

    isValid() {
        return (this.dt.editingCell && this.domHandler.find(this.dt.editingCell, '.ng-invalid.ng-dirty').length === 0);
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.isEnabled()) {
            if (this.dt.editingCell) {
                if (this.dt.editingCell !== this.el.nativeElement) {
                    if (!this.isValid()) {
                        return;
                    }
                    this.domHandler.removeClass(this.dt.editingCell, 'cherry-ui-editing-cell');
                    this.openCell();
                }
            } else {
                this.openCell();
            }
        }
    }

    openCell() {
        this.dt.editingCell = this.el.nativeElement;
        this.domHandler.addClass(this.el.nativeElement, 'cherry-ui-editing-cell');
        this.dt.onEditInit.emit({ field: this.field, data: this.data });
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                const focusable = this.domHandler.findSingle(this.el.nativeElement, 'input, textarea');
                if (focusable) {
                    focusable.focus();
                }
            }, 50);
        });
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (this.isEnabled()) {
            if (event.keyCode === 13) {
                if (this.isValid()) {
                    this.domHandler.removeClass(this.dt.editingCell, 'cherry-ui-editing-cell');
                    this.dt.editingCell = null;
                    this.dt.onEditComplete.emit({ field: this.field, data: this.data });
                }

                event.preventDefault();
            } else if (event.keyCode === 27) {
                if (this.isValid()) {
                    this.domHandler.removeClass(this.dt.editingCell, 'cherry-ui-editing-cell');
                    this.dt.editingCell = null;
                    this.dt.onEditCancel.emit({ field: this.field, data: this.data });
                }

                event.preventDefault();
            } else if (event.keyCode === 9) {
                if (event.shiftKey) {
                    this.moveToPreviousCell(event);
                } else {
                    this.moveToNextCell(event);
                }
            }
        }
    }

    findCell(element) {
        if (element) {
            let cell = element;
            while (cell && !this.domHandler.hasClass(cell, 'cherry-ui-editing-cell')) {
                cell = cell.parentElement;
            }

            return cell;
        } else {
            return null;
        }
    }

    moveToPreviousCell(event: KeyboardEvent) {
        const currentCell = this.findCell(event.target);
        const row = currentCell.parentElement;
        const targetCell = this.findPreviousEditableColumn(currentCell);

        if (targetCell) {
            this.domHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    }

    moveToNextCell(event: KeyboardEvent) {
        const currentCell = this.findCell(event.target);
        const row = currentCell.parentElement;
        const targetCell = this.findNextEditableColumn(currentCell);

        if (targetCell) {
            this.domHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    }

    findPreviousEditableColumn(cell: Element) {
        let prevCell = cell.previousElementSibling;

        if (!prevCell) {
            const previousRow = cell.parentElement.previousElementSibling;
            if (previousRow) {
                prevCell = previousRow.lastElementChild;
            }
        }

        if (prevCell) {
            if (this.domHandler.hasClass(prevCell, 'cherry-ui-editable-column')) {
                return prevCell;
            } else {
                return this.findPreviousEditableColumn(prevCell);
            }
        } else {
            return null;
        }
    }

    findNextEditableColumn(cell: Element) {
        let nextCell = cell.nextElementSibling;

        if (!nextCell) {
            const nextRow = cell.parentElement.nextElementSibling;
            if (nextRow) {
                nextCell = nextRow.firstElementChild;
            }
        }

        if (nextCell) {
            if (this.domHandler.hasClass(nextCell, 'cherry-ui-editable-column')) {
                return nextCell;
            } else {
                return this.findNextEditableColumn(nextCell);
            }
        } else {
            return null;
        }
    }

    isEnabled() {
        return this.cherryEditableColumnDisabled !== true;
    }

}
