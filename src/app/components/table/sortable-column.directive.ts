import { DomHandler } from '../dom/domhandler';
import { Directive, OnInit, OnDestroy, Input, HostListener, HostBinding } from '@angular/core';
import { TableComponent } from './table.component';
import { Subscription } from 'rxjs/Subscription';


@Directive({
    selector: '[cherrySortableColumn]',
    providers: [DomHandler]
})
export class SortableColumnDirective  implements OnInit, OnDestroy {

    @HostBinding('class.cherry-ui-sortable-column') _uiColumn   = true;

    @HostBinding('class.cherry-ui-state-highlight') sorted;

    @Input() field: string;

    @Input() cherrySortableColumnDisabled: boolean;

    subscription: Subscription;

    constructor(public dt: TableComponent, public domHandler: DomHandler) {
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.sortSource$.subscribe(sortMeta => {
                this.updateSortState();
            });
        }
    }

    ngOnInit() {
        if (this.isEnabled()) {
            this.updateSortState();
        }
    }

    updateSortState() {
        this.sorted = this.dt.isSorted(this.field);
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.isEnabled()) {
            this.updateSortState();
            this.dt.sort({
                originalEvent: event,
                field: this.field
            });

            this.domHandler.clearSelection();
        }
    }

    isEnabled() {
        return this.cherrySortableColumnDisabled !== true;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
