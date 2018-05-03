import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TableComponent } from './table.component';

@Component({
    selector: 'cherry-sorticon',
    template: `
        <span class="cherry-ui-sortable-column-icon fa fa-fw fa-sort" [ngClass]="{'fa-sort-asc': sortOrder === 1, 'fa-sort-desc': sortOrder === -1}"></span>
    `,

})
export class SortIconComponent implements OnInit, OnDestroy {

    @Input() field: string;

    subscription: Subscription;

    sortOrder: number;

    sorted: boolean;

    constructor(public dt: TableComponent) {
        this.subscription = this.dt.tableService.sortSource$.subscribe(sortMeta => {
            this.updateSortState();
        });
    }

    ngOnInit() {
        this.updateSortState();
    }

    updateSortState() {
        if (this.dt.sortMode === 'single') {
            this.sortOrder = this.dt.isSorted(this.field) ? this.dt.sortOrder : 0;
        } else if (this.dt.sortMode === 'multiple') {
            const sortMeta = this.dt.getSortMeta(this.field);
            this.sortOrder = sortMeta ? sortMeta.order : 0;
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
