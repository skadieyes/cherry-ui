import { Component, Input, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TableComponent } from './table.component';
import { DomHandler } from '../dom/domhandler';
import { TableService } from './table.service';

@Component({
    selector: 'cherry-tableradiobutton',
    template: `
        <div class="cherry-ui-radiobutton cherry-ui-widget" (click)="onClick($event)">
            <div class="cherry-ui-helper-hidden-accessible">
                <input type="radio" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()">
            </div>
            <div #box [ngClass]="{'cherry-ui-radiobutton-box cherry-ui-widget cherry-ui-state-default':true,
                'cherry-ui-state-active':checked, 'cherry-ui-state-disabled':disabled}">
                <span class="cherry-ui-radiobutton-icon cherry-ui-clickable" [ngClass]="{'fa fa-circle':checked}"></span>
            </div>
        </div>
    `,

})
export class TableRadioButtonComponent implements OnInit, OnDestroy {

    @Input() disabled: boolean;

    @Input() value: any;

    @ViewChild('box') boxViewChild: ElementRef;

    checked: boolean;

    subscription: Subscription;

    constructor(public dt: TableComponent, public domHandler: DomHandler, public tableService: TableService) {
        this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.dt.isSelected(this.value);
        });
    }

    ngOnInit() {
        this.checked = this.dt.isSelected(this.value);
    }

    onClick(event: Event) {
        this.dt.toggleRowWithRadio(event, this.value);
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

}
