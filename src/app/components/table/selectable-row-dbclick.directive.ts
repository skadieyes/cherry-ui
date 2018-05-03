import { Directive, Input, OnInit, OnDestroy, HostListener, HostBinding } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { Subscription } from 'rxjs/Subscription';
import { TableComponent } from './table.component';
import { TableService } from './table.service';


@Directive({
    selector: '[cherrySelectableRowDblClick]',
    providers: [DomHandler]
})
export class SelectableRowDblClickDirective implements OnInit, OnDestroy {

    @Input() data: any;

    @Input() index: number;

    @Input() cherrySelectableRowDisabled: boolean;

    @HostBinding('class.cherry-ui-state-highlight') selected;

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

    @HostListener('dblclick', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
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
