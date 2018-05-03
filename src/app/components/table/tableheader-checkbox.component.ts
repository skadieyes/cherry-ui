import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TableComponent } from './table.component';
import { DomHandler } from '../dom/domhandler';
import { TableService } from './table.service';

@Component({
    selector: 'cherry-tableheadercheckbox',
    template: `
        <div class="cherry-ui-chkbox cherry-ui-widget" (click)="onClick($event, cb.checked)">
            <div class="cherry-ui-helper-hidden-accessible">
                <input #cb type="checkbox" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="!dt.value || dt.value.length === 0">
            </div>
            <div #box [ngClass]="{'cherry-ui-chkbox-box cherry-ui-widget cherry-ui-state-default':true,
                'cherry-ui-state-active':checked, 'cherry-ui-state-disabled': (!dt.value || dt.value.length === 0)}">
                <span class="cherry-ui-chkbox-icon cherry-ui-clickable" [ngClass]="{'fa fa-check':checked}"></span>
            </div>
        </div>
    `,

})
export class TableHeaderCheckboxComponent implements OnDestroy, OnInit {

    @ViewChild('box') boxViewChild: ElementRef;

    checked: boolean;

    disabled: boolean;

    subscription: Subscription;

    constructor(public dt: TableComponent, public domHandler: DomHandler, public tableService: TableService) {
        this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.updateCheckedState();
        });
    }

    ngOnInit() {
        this.checked = this.updateCheckedState();
    }

    onClick(event: Event, checked) {
        if (this.dt.value && this.dt.value.length > 0) {
            this.dt.toggleRowsWithCheckbox(event, !checked);
        }

        this.domHandler.clearSelection();
    }

    onFocus() {
        this.domHandler.addClass(this.boxViewChild.nativeElement, 'cherry-ui-state-focus');
    }

    onBlur() {
        this.domHandler.removeClass(this.boxViewChild.nativeElement, 'cherry-ui-state-focus');
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    updateCheckedState() {
        return (this.dt.value && this.dt.value.length > 0 && this.dt.selection && this.dt.selection.length > 0 && this.dt.selection.length === this.dt.value.length);
    }

}
