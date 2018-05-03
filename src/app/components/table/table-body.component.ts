import { Component, OnInit, Input, Output, TemplateRef, } from '@angular/core';
import { ColumnComponent } from '../common/shared';
import { TableComponent } from './table.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[cherryTableBody]',
    template: `
        <ng-container *ngIf="!dt.expandedRowTemplate">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="dt.paginator ?
            ((dt.filteredValue||dt.value) | slice:(dt.lazy ? 0 : dt.first):((dt.lazy ? 0 : dt.first) + dt.rows)) : (dt.filteredValue||dt.value)" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns}"></ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.expandedRowTemplate">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="dt.paginator ?
            ((dt.filteredValue||dt.value) | slice:(dt.lazy ? 0 : dt.first):((dt.lazy ? 0 : dt.first) + dt.rows)) : (dt.filteredValue||dt.value)" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngIf="dt.isRowExpanded(rowData); else collapsedrow">
                    <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: true}"></ng-container>
                    <ng-container *ngTemplateOutlet="dt.expandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns}"></ng-container>
                </ng-container>
                <ng-template #collapsedrow>
                    <ng-container *ngTemplateOutlet="template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, expanded: false, columns: columns}"></ng-container>
                </ng-template>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.isEmpty()">
            <ng-container *ngTemplateOutlet="dt.emptyMessageTemplate; context: {$implicit: columns}"></ng-container>
        </ng-container>
    `,

})
export class TableBodyComponent {

    @Input() columns: ColumnComponent;

    @Input() template: TemplateRef<any>;

    constructor(public dt: TableComponent) { }
}
