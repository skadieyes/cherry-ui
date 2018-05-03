import { Directive, OnInit, OnDestroy, Input, HostBinding, HostListener } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { Subscription } from 'rxjs/Subscription';
import { TableService } from './table.service';
import { TableComponent } from './table.component';


@Directive({
    selector: '[cherrySelectableRow]',
    providers: [DomHandler]
})
export class SelectableRowDirective implements OnInit, OnDestroy {

    @Input() data: any;

    @Input() index: number;

    @Input() cherrySelectableRowDisabled: boolean;


    @HostBinding('class.cherry-ui-state-highlight') selected ;

    subscription: Subscription;

    constructor(public dt: TableComponent, public domHandler: DomHandler, public tableService: TableService) {
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
                this.selected = this.dt.isSelected(this.data);
            });
        }
    }

    ngOnInit() {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    }

    @HostListener('touchend', ['$event'])
    onTouchEnd(event: Event) {
        if (this.isEnabled()) {
            this.dt.handleRowTouchEnd(event);
        }
    }

    isEnabled() {
        return this.cherrySelectableRowDisabled !== true;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
