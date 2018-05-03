import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { SharedModule } from '../common/shared';
import { SortableColumnDirective } from './sortable-column.directive';
import { SelectableRowDirective } from './selectable-row.directive';
import { RowTogglerDirective } from './row-toggler.directive';
import { ContextMenuRowDirective } from './context-menu-row.directive';
import { ResizableColumnDirective } from './resizable-column.directive';
import { ReorderableColumnDirective } from './reorderable-column.directive';
import { EditableColumnDirective } from './editable-column.directive';
import { CellEditorComponent } from './cell-editor.component';
import { SortIconComponent } from './sort-icon.component';
import { TableRadioButtonComponent } from './table-radio-button.component';
import { TableCheckboxComponent } from './table-checkbox.component';
import { TableHeaderCheckboxComponent } from './tableheader-checkbox.component';
import { ReorderableRowHandleDirective } from './reorderable-row-handle.directive';
import { ReorderableRowDirective } from './reorderable-row.directive';
import { SelectableRowDblClickDirective } from './selectable-row-dbclick.directive';
import { PaginatorModule } from 'primeng/paginator';
import { ScrollableViewComponent } from './scroll-label-view.component';
import { TableBodyComponent } from './table-body.component';
import { TableTemplateDirective } from './table-template.service';
import { PaginationModule } from '../pagination/pagination.module';

@NgModule({
    imports: [CommonModule, PaginatorModule, PaginationModule],
    exports: [TableComponent, SharedModule, SortableColumnDirective, SelectableRowDirective, RowTogglerDirective, ContextMenuRowDirective, ResizableColumnDirective,
        ReorderableColumnDirective, EditableColumnDirective, CellEditorComponent, SortIconComponent, TableRadioButtonComponent, ScrollableViewComponent, TableBodyComponent,
        TableCheckboxComponent, TableHeaderCheckboxComponent, ReorderableRowHandleDirective, ReorderableRowDirective, SelectableRowDblClickDirective, TableTemplateDirective],
    declarations: [TableComponent, SortableColumnDirective, SelectableRowDirective, RowTogglerDirective, ContextMenuRowDirective, ResizableColumnDirective,
        ReorderableColumnDirective, EditableColumnDirective, CellEditorComponent, SortIconComponent, TableRadioButtonComponent, ScrollableViewComponent, TableBodyComponent,
        TableCheckboxComponent, TableHeaderCheckboxComponent, ReorderableRowHandleDirective, ReorderableRowDirective, SelectableRowDblClickDirective, TableTemplateDirective]
})
export class TableModule { }
