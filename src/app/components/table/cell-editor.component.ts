import { Component, AfterContentInit, ContentChildren, QueryList, TemplateRef, ContentChild } from '@angular/core';
import { TableComponent } from './table.component';
import { EditableColumnDirective } from './editable-column.directive';
import { TableTemplateDirective } from './table-template.service';

@Component({
    selector: 'cherry-celleditor',
    template: `
        <ng-container *ngIf="dt.editingCell === editableColumn.el.nativeElement">
            <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
        </ng-container>
        <ng-container *ngIf="!dt.editingCell || dt.editingCell !== editableColumn.el.nativeElement">
            <ng-container *ngTemplateOutlet="outputTemplate"></ng-container>
        </ng-container>
    `,

})
export class CellEditorComponent implements AfterContentInit {

    @ContentChildren(TableTemplateDirective) templates: QueryList<TableTemplateDirective>;

    @ContentChild('inputTemplate') inputTemplate: TemplateRef<any>;

    @ContentChild('outputTemplate') outputTemplate: TemplateRef<any>;

    constructor(public dt: TableComponent, public editableColumn: EditableColumnDirective) { }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'input':
                    this.inputTemplate = item.template;
                    break;

                case 'output':
                    this.outputTemplate = item.template;
                    break;
            }
        });
    }

}
