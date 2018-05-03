import {
    Component, OnInit, AfterContentInit, Input, Output, EventEmitter, ElementRef, ViewChild, OnDestroy,
    ContentChildren, ContentChild, QueryList, TemplateRef, NgZone
} from '@angular/core';
import { SortMeta } from '../common/sortmeta';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../common/objectutils';
import { TableService } from './table.service';
import { FilterMetadata } from '../common/filtermetadata';
import { TableTemplateDirective } from './table-template.service';

@Component({
    selector: 'cherry-table',
    templateUrl: './table.component.html',
    providers: [DomHandler, ObjectUtils, TableService],

})
export class TableComponent implements OnInit, AfterContentInit, OnDestroy {

    @Input() columns: any[];

    @Input() frozenColumns: any[];

    @Input() frozenValue: any[];

    @Input() style: any;

    @Input() styleClass: string;

    @Input() paginator: boolean;

    @Input() rows: any;

    @Input() first: any = 0;

    @Input() pageLinks: any = 5;

    @Input() rowsPerPageOptions: any[];

    @Input() alwaysShowPaginator: Boolean = true;

    @Input() paginatorPosition: String = 'bottom';

    @Input() paginatorDropdownAppendTo: any;

    @Input() defaultSortOrder: any = 1;

    @Input() sortMode: String = 'single';

    @Input() resetPageOnSort: Boolean = true;

    @Input() selectionMode: string;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter();

    @Input() contextMenuSelection: any;

    @Output() contextMenuSelectionChange: EventEmitter<any> = new EventEmitter();

    @Input() dataKey: string;

    @Input() metaKeySelection: Boolean;

    @Input() lazy: Boolean = false;

    @Input() compareSelectionBy: String = 'deepEquals';

    @Input() csvSeparator: String = ',';

    @Input() exportFilename: String = 'download';

    @Input() filters: { [s: string]: FilterMetadata; } = {};

    @Input() globalFilterFields: string[];

    @Input() filterDelay: any = 300;

    @Input() expandedRowKeys: { [s: string]: any; } = {};

    @Input() rowExpandMode: String = 'multiple';

    @Input() scrollable: boolean;

    @Input() scrollHeight: string;

    @Input() virtualScroll: boolean;

    @Input() virtualScrollDelay: any = 500;

    @Input() virtualRowHeight: any = 27;

    @Input() frozenWidth: string;

    @Input() responsive: boolean;

    @Input() contextMenu: any;

    @Input() resizableColumns: boolean;

    @Input() columnResizeMode: String = 'fit';

    @Input() reorderableColumns: boolean;

    @Input() loading: boolean;

    @Input() loadingIcon: String = 'fa fa-spin fa-2x fa-spinner';

    @Input() rowHover: boolean;

    @Input() customSort: boolean;

    @Input() autoLayout: boolean;

    @Input() exportFunction: any;

    @Input() pagiDisplayDirection: any;

    @Output() onRowSelect: EventEmitter<any> = new EventEmitter();

    @Output() onRowUnselect: EventEmitter<any> = new EventEmitter();

    @Output() onPage: EventEmitter<any> = new EventEmitter();

    @Output() onSort: EventEmitter<any> = new EventEmitter();

    @Output() onFilter: EventEmitter<any> = new EventEmitter();

    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();

    @Output() onRowExpand: EventEmitter<any> = new EventEmitter();

    @Output() onRowCollapse: EventEmitter<any> = new EventEmitter();

    @Output() onContextMenuSelect: EventEmitter<any> = new EventEmitter();

    @Output() onColResize: EventEmitter<any> = new EventEmitter();

    @Output() onColReorder: EventEmitter<any> = new EventEmitter();

    @Output() onRowReorder: EventEmitter<any> = new EventEmitter();

    @Output() onEditInit: EventEmitter<any> = new EventEmitter();

    @Output() onEditComplete: EventEmitter<any> = new EventEmitter();

    @Output() onEditCancel: EventEmitter<any> = new EventEmitter();

    @Output() onHeaderCheckboxToggle: EventEmitter<any> = new EventEmitter();

    @Output() sortFunction: EventEmitter<any> = new EventEmitter();

    @ViewChild('container') containerViewChild: ElementRef;

    @ViewChild('resizeHelper') resizeHelperViewChild: ElementRef;

    @ViewChild('reorderIndicatorUp') reorderIndicatorUpViewChild: ElementRef;

    @ViewChild('reorderIndicatorDown') reorderIndicatorDownViewChild: ElementRef;

    @ViewChild('table') tableViewChild: ElementRef;

    @ContentChildren(TableTemplateDirective) templates: QueryList<TableTemplateDirective>;

    _value: any[] = [];

    _totalRecords: any = 0;

    filteredValue: any[];

    @ContentChild('headerTemplate') headerTemplate: TemplateRef<any>;

    @ContentChild('bodyTemplate') bodyTemplate: TemplateRef<any>;

    @ContentChild('captionTemplate') captionTemplate: TemplateRef<any>;

    @ContentChild('frozenRowsTemplate') frozenRowsTemplate: TemplateRef<any>;

    @ContentChild('footerTemplate') footerTemplate: TemplateRef<any>;

    @ContentChild('summaryTemplate') summaryTemplate: TemplateRef<any>;

    @ContentChild('colGroupTemplate') colGroupTemplate: TemplateRef<any>;

    @ContentChild('expandedRowTemplate') expandedRowTemplate: TemplateRef<any>;

    @ContentChild('frozenHeaderTemplate') frozenHeaderTemplate: TemplateRef<any>;

    @ContentChild('frozenBodyTemplate') frozenBodyTemplate: TemplateRef<any>;

    @ContentChild('frozenFooterTemplate') frozenFooterTemplate: TemplateRef<any>;

    @ContentChild('frozenColGroupTemplate') frozenColGroupTemplate: TemplateRef<any>;

    @ContentChild('emptyMessageTemplate') emptyMessageTemplate: TemplateRef<any>;

    @ContentChild('paginatorLeftTemplate') paginatorLeftTemplate: TemplateRef<any>;

    @ContentChild('paginatorRightTemplate') paginatorRightTemplate: TemplateRef<any>;

    selectionKeys: any = {};

    lastResizerHelperX: any;

    reorderIconWidth: any;

    reorderIconHeight: any;

    draggedColumn: any;

    draggedRowIndex: any;

    droppedRowIndex: any;

    rowDragging: boolean;

    dropPosition: any;

    editingCell: Element;

    _multiSortMeta: SortMeta[];

    _sortField: string;

    _sortOrder: any = 1;

    virtualScrollTimer: any;

    virtualScrollCallback: Function;

    preventSelectionSetterPropagation: boolean;

    _selection: any;

    anchorRowIndex: any;

    rangeRowIndex: any;

    filterTimeout: any;

    initialized: boolean;

    rowTouched: boolean;

    filterConstraints = {

        startsWith(value, filter): boolean {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            const filterValue = filter.toLowerCase();
            return value.toString().toLowerCase().slice(0, filterValue.length) === filterValue;
        },

        contains(value, filter): boolean {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            return value.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        },

        endsWith(value, filter): boolean {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            const filterValue = filter.toString().toLowerCase();
            return value.toString().toLowerCase().indexOf(filterValue, value.toString().length - filterValue.length) !== -1;
        },

        equals(value, filter): boolean {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            return value.toString().toLowerCase() === filter.toString().toLowerCase();
        },

        notEquals(value, filter): boolean {
            if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                return false;
            }

            if (value === undefined || value === null) {
                return true;
            }

            return value.toString().toLowerCase() !== filter.toString().toLowerCase();
        },

        in(value, filter: any[]): boolean {
            if (filter === undefined || filter === null || filter.length === 0) {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            for (let i = 0; i < filter.length; i++) {
                if (filter[i] === value) {
                    return true;
                }
            }

            return false;
        },

        lt(value, filter): boolean {
            if (filter === undefined || filter === null) {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            return value < filter;
        },

        gt(value, filter): boolean {
            if (filter === undefined || filter === null) {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            return value > filter;
        }
    };

    @Input() rowTrackBy: Function = (index: any, item: any) => item;

    constructor(public el: ElementRef, public domHandler: DomHandler, public objectUtils: ObjectUtils, public zone: NgZone, public tableService: TableService) { }

    ngOnInit() {
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.initialized = true;
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'caption':
                    this.captionTemplate = item.template;
                    break;

                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'body':
                    this.bodyTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                case 'summary':
                    this.summaryTemplate = item.template;
                    break;

                case 'colgroup':
                    this.colGroupTemplate = item.template;
                    break;

                case 'rowexpansion':
                    this.expandedRowTemplate = item.template;
                    break;

                case 'frozenrows':
                    this.frozenRowsTemplate = item.template;
                    break;

                case 'frozenheader':
                    this.frozenHeaderTemplate = item.template;
                    break;

                case 'frozenbody':
                    this.frozenBodyTemplate = item.template;
                    break;

                case 'frozenfooter':
                    this.frozenFooterTemplate = item.template;
                    break;

                case 'frozencolgroup':
                    this.frozenColGroupTemplate = item.template;
                    break;

                case 'emptymessage':
                    this.emptyMessageTemplate = item.template;
                    break;

                case 'paginatorleft':
                    this.paginatorLeftTemplate = item.template;
                    break;

                case 'paginatorright':
                    this.paginatorRightTemplate = item.template;
                    break;
            }
        });
    }

    @Input() get value(): any[] {
        return this._value;
    }
    set value(val: any[]) {
        this._value = val;

        if (!this.lazy) {
            this.totalRecords = (this._value ? this._value.length : 0);

            if (this.sortMode === 'single') {
                this.sortSingle();
            } else if (this.sortMode === 'multiple') {
                this.sortMultiple();
            }
        }

        if (this.virtualScroll && this.virtualScrollCallback) {
            this.virtualScrollCallback();
        }

        this.tableService.onValueChange(val);
    }

    @Input() get totalRecords(): any {
        return this._totalRecords;
    }
    set totalRecords(val: any) {
        this._totalRecords = val;
        this.tableService.onTotalRecordsChange(this._totalRecords);
    }

    @Input() get sortField(): string {
        return this._sortField;
    }

    set sortField(val: string) {
        this._sortField = val;
        if (!this.lazy || this.initialized) {
            if (this.sortMode === 'single') {
                this.sortSingle();
            }
        }
    }

    @Input() get sortOrder(): any {
        return this._sortOrder;
    }
    set sortOrder(val: any) {
        this._sortOrder = val;
        if (!this.lazy || this.initialized) {
            if (this.sortMode === 'single') {
                this.sortSingle();
            }
        }
    }

    @Input() get multiSortMeta(): SortMeta[] {
        return this._multiSortMeta;
    }

    set multiSortMeta(val: SortMeta[]) {
        this._multiSortMeta = val;
        if (this.sortMode === 'multiple') {
            this.sortMultiple();
        }
    }

    @Input() get selection(): any {
        return this._selection;
    }

    set selection(val: any) {
        this._selection = val;

        if (!this.preventSelectionSetterPropagation) {
            this.updateSelectionKeys();
            this.tableService.onSelectionChange();
        }
        this.preventSelectionSetterPropagation = false;
    }

    updateSelectionKeys() {
        if (this.dataKey && this._selection) {
            this.selectionKeys = {};
            if (Array.isArray(this._selection)) {
                for (const data of this._selection) {
                    this.selectionKeys[String(this.objectUtils.resolveFieldData(data, this.dataKey))] = 1;
                }
            } else {
                this.selectionKeys[String(this.objectUtils.resolveFieldData(this._selection, this.dataKey))] = 1;
            }
        }
    }

    onPageChange(event) {
        this.first = event.first;
        this.rows = event.rows;

        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }

        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });

        this.tableService.onValueChange(this.value);
    }

    sort(event) {
        const originalEvent = event.originalEvent;

        if (this.sortMode === 'single') {
            this._sortOrder = (this.sortField === event.field) ? this.sortOrder * -1 : this.defaultSortOrder;
            this._sortField = event.field;
            this.sortSingle();
        }
        if (this.sortMode === 'multiple') {
            const metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
            const sortMeta = this.getSortMeta(event.field);

            if (sortMeta) {
                if (!metaKey) {
                    this._multiSortMeta = [{ field: event.field, order: sortMeta.order * -1 }];
                } else {
                    sortMeta.order = sortMeta.order * -1;
                }
            } else {
                if (!metaKey || !this.multiSortMeta) {
                    this._multiSortMeta = [];
                }
                this.multiSortMeta.push({ field: event.field, order: this.defaultSortOrder });
            }

            this.sortMultiple();
        }
    }

    sortSingle() {
        if (this.sortField && this.sortOrder) {
            this.first = this.resetPageOnSort ? 0 : this.first;

            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            } else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        field: this.sortField,
                        order: this.sortOrder
                    });
                } else {
                    this.value.sort((data1, data2) => {
                        const value1 = this.objectUtils.resolveFieldData(data1, this.sortField);
                        const value2 = this.objectUtils.resolveFieldData(data2, this.sortField);
                        let result = null;

                        if (value1 == null && value2 != null) {
                            result = -1;
                        } else if (value1 != null && value2 == null) {
                            result = 1;
                        } else if (value1 == null && value2 == null) {
                            result = 0;
                        } else if (typeof value1 === 'string' && typeof value2 === 'string') {
                            result = value1.localeCompare(value2);
                        } else {
                            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                        }
                        return (this.sortOrder * result);
                    });
                }

                if (this.hasFilter()) {
                    this._filter();
                }
            }

            const sortMeta: SortMeta = {
                field: this.sortField,
                order: this.sortOrder
            };

            this.onSort.emit(sortMeta);
            this.tableService.onSort(sortMeta);
        }
    }

    sortMultiple() {
        if (this.multiSortMeta) {
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            } else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        multiSortMeta: this.multiSortMeta
                    });
                } else {
                    this.value.sort((data1, data2) => {
                        return this.multisortField(data1, data2, this.multiSortMeta, 0);
                    });
                }

                if (this.hasFilter()) {
                    this._filter();
                }
            }

            this.onSort.emit({
                multisortmeta: this.multiSortMeta
            });
            this.tableService.onSort(this.multiSortMeta);
        }
    }

    multisortField(data1, data2, multiSortMeta, index) {
        const value1 = this.objectUtils.resolveFieldData(data1, multiSortMeta[index].field);
        const value2 = this.objectUtils.resolveFieldData(data2, multiSortMeta[index].field);
        let result = null;

        if (typeof value1 === 'string' || value1 instanceof String) {
            if (value1.localeCompare && (value1 !== value2)) {
                return (multiSortMeta[index].order * value1.localeCompare(value2));
            }
        } else {
            result = (value1 < value2) ? -1 : 1;
        }

        if (value1 === value2) {
            return (multiSortMeta.length - 1) > (index) ? (this.multisortField(data1, data2, multiSortMeta, index + 1)) : 0;
        }

        return (multiSortMeta[index].order * result);
    }

    getSortMeta(field: string) {
        if (this.multiSortMeta && this.multiSortMeta.length) {
            for (let i = 0; i < this.multiSortMeta.length; i++) {
                if (this.multiSortMeta[i].field === field) {
                    return this.multiSortMeta[i];
                }
            }
        }

        return null;
    }

    isSorted(field: string) {
        if (this.sortMode === 'single') {
            return (this.sortField && this.sortField === field);
        } else if (this.sortMode === 'multiple') {
            let sorted = false;
            if (this.multiSortMeta) {
                for (let i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field === field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    }

    handleRowClick(event) {
        const targetNode = (<HTMLElement>event.originalEvent.target).nodeName;
        if (targetNode === 'INPUT' || targetNode === 'BUTTON' || targetNode === 'A' || (this.domHandler.hasClass(event.originalEvent.target, 'cherry-ui-clickable'))) {
            return;
        }

        if (this.selectionMode) {
            this.preventSelectionSetterPropagation = true;
            if (this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex != null) {
                this.domHandler.clearSelection();
                if (this.rangeRowIndex != null) {
                    this.clearSelectionRange(event.originalEvent);
                }

                this.rangeRowIndex = event.rowIndex;
                this.selectRange(event.originalEvent, event.rowIndex);
            } else {
                const rowData = event.rowData;
                const selected = this.isSelected(rowData);
                const metaSelection = this.rowTouched ? false : this.metaKeySelection;
                const dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                this.anchorRowIndex = event.rowIndex;
                this.rangeRowIndex = event.rowIndex;

                if (metaSelection) {
                    const metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;

                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(null);
                        } else {
                            const selectionIndex = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter((val, i) => i !== selectionIndex);
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }

                        this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                    } else {
                        if (this.isSingleSelectionMode()) {
                            this._selection = rowData;
                            this.selectionChange.emit(rowData);
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        } else if (this.isMultipleSelectionMode()) {
                            if (metaKey) {
                                this._selection = this.selection || [];
                            } else {
                                this._selection = [];
                                this.selectionKeys = {};
                            }

                            this._selection = [...this.selection, rowData];
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }

                        this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                    }
                } else {
                    if (this.selectionMode === 'single') {
                        if (selected) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                        } else {
                            this._selection = rowData;
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    } else if (this.selectionMode === 'multiple') {
                        if (selected) {
                            const selectionIndex = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter((val, i) => i !== selectionIndex);
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        } else {
                            this._selection = this.selection ? [...this.selection, rowData] : [rowData];
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                }
            }

            this.tableService.onSelectionChange();
        }

        this.rowTouched = false;
    }

    handleRowTouchEnd(event) {
        this.rowTouched = true;
    }

    handleRowRightClick(event) {
        if (this.contextMenu) {
            this.contextMenuSelection = event.rowData;
            this.contextMenuSelectionChange.emit(event.rowData);
            this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, data: event.rowData });
            this.contextMenu.show(event.originalEvent);
            this.tableService.onContextMenu(event.rowData);
        }
    }

    selectRange(event: MouseEvent, rowIndex: any) {
        let rangeStart, rangeEnd;

        if (this.anchorRowIndex > rowIndex) {
            rangeStart = rowIndex;
            rangeEnd = this.anchorRowIndex;
        } else if (this.anchorRowIndex < rowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = rowIndex;
        } else {
            rangeStart = rowIndex;
            rangeEnd = rowIndex;
        }

        for (let i = rangeStart; i <= rangeEnd; i++) {
            const rangeRowData = this.value[i];
            if (!this.isSelected(rangeRowData)) {
                this._selection = [...this.selection, rangeRowData];
                const dataKeyValue: string = this.dataKey ? String(this.objectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
                if (dataKeyValue) {
                    this.selectionKeys[dataKeyValue] = 1;
                }
                this.onRowSelect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
            }
        }

        this.selectionChange.emit(this.selection);
    }

    clearSelectionRange(event: MouseEvent) {
        let rangeStart, rangeEnd;

        if (this.rangeRowIndex > this.anchorRowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = this.rangeRowIndex;
        } else if (this.rangeRowIndex < this.anchorRowIndex) {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.anchorRowIndex;
        } else {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.rangeRowIndex;
        }

        for (let i = rangeStart; i <= rangeEnd; i++) {
            const rangeRowData = this.value[i];
            const selectionIndex = this.findIndexInSelection(rangeRowData);
            this._selection = this.selection.filter((val: any, index: any = i) => index !== selectionIndex);
            const dataKeyValue: string = this.dataKey ? String(this.objectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
            this.onRowUnselect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
        }
    }

    isSelected(rowData) {
        if (rowData && this.selection) {
            if (this.dataKey) {
                return this.selectionKeys[this.objectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined;
            } else {
                if (this.selection instanceof Array) {
                    return this.findIndexInSelection(rowData) > -1;
                } else {
                    return this.equals(rowData, this.selection);
                }
            }
        }

        return false;
    }

    findIndexInSelection(rowData: any) {
        let index: any = -1;
        if (this.selection && this.selection.length) {
            for (let i = 0; i < this.selection.length; i++) {
                if (this.equals(rowData, this.selection[i])) {
                    index = i;
                    break;
                }
            }
        }

        return index;
    }

    toggleRowWithRadio(event: Event, rowData: any) {
        this.preventSelectionSetterPropagation = true;

        if (this.selection !== rowData) {
            this._selection = rowData;
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event, data: rowData, type: 'radiobutton' });

            if (this.dataKey) {
                this.selectionKeys = {};
                this.selectionKeys[String(this.objectUtils.resolveFieldData(rowData, this.dataKey))] = 1;
            }
        } else {
            this._selection = null;
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event, data: rowData, type: 'radiobutton' });
        }

        this.tableService.onSelectionChange();
    }

    toggleRowWithCheckbox(event, rowData: any) {
        this.selection = this.selection || [];
        const selected = this.isSelected(rowData);
        const dataKeyValue = this.dataKey ? String(this.objectUtils.resolveFieldData(rowData, this.dataKey)) : null;
        this.preventSelectionSetterPropagation = true;

        if (selected) {
            const selectionIndex = this.findIndexInSelection(rowData);
            this._selection = this.selection.filter((val, i) => i !== selectionIndex);
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
        } else {
            this._selection = this.selection ? [...this.selection, rowData] : [rowData];
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
        }

        this.tableService.onSelectionChange();
    }

    toggleRowsWithCheckbox(event: Event, check: boolean) {
        this._selection = check ? this.filteredValue ? this.filteredValue.slice() : this.value.slice() : [];
        this.preventSelectionSetterPropagation = true;
        this.updateSelectionKeys();
        this.selectionChange.emit(this._selection);
        this.tableService.onSelectionChange();
        this.onHeaderCheckboxToggle.emit({ originalEvent: event, checked: check });
    }

    equals(data1, data2) {
        return this.compareSelectionBy === 'equals' ? (data1 === data2) : this.objectUtils.equals(data1, data2, this.dataKey);
    }

    filter(value, field, matchMode) {
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }

        this.filterTimeout = setTimeout(() => {
            if (!this.isFilterBlank(value)) {
                this.filters[field] = { value: value, matchMode: matchMode };
            } else if (this.filters[field]) {
                delete this.filters[field];
            }

            this._filter();
            this.filterTimeout = null;
        }, this.filterDelay);
    }

    filterGlobal(value, matchMode) {
        this.filter(value, 'global', matchMode);
    }

    isFilterBlank(filter: any): boolean {
        if (filter !== null && filter !== undefined) {
            if ((typeof filter === 'string' && filter.trim().length === 0) || (filter instanceof Array && filter.length === 0)) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    }

    _filter() {
        this.first = 0;

        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        } else {
            if (!this.value) {
                return;
            }

            if (!this.hasFilter()) {
                this.filteredValue = null;
                if (this.paginator) {
                    this.totalRecords = this.value ? this.value.length : 0;
                }
            } else {
                let globalFilterFieldsArray;
                if (this.filters['global']) {
                    if (!this.columns && !this.globalFilterFields) {
                        throw new Error('Global filtering requires dynamic columns or globalFilterFields to be defined.');
                    } else {
                        globalFilterFieldsArray = this.globalFilterFields || this.columns;
                    }
                }

                this.filteredValue = [];

                for (let i = 0; i < this.value.length; i++) {
                    let localMatch = true;
                    let globalMatch = false;
                    let localFiltered = false;

                    for (const prop in this.filters) {
                        if (this.filters.hasOwnProperty(prop) && prop !== 'global') {
                            localFiltered = true;
                            const filterMeta = this.filters[prop];
                            const filterField = prop;
                            const filterValue = filterMeta.value;
                            const filterMatchMode = filterMeta.matchMode || 'startsWith';
                            const dataFieldValue = this.objectUtils.resolveFieldData(this.value[i], filterField);
                            const filterConstraint = this.filterConstraints[filterMatchMode];

                            if (!filterConstraint(dataFieldValue, filterValue)) {
                                localMatch = false;
                            }

                            if (!localMatch) {
                                break;
                            }
                        }
                    }

                    if (this.filters['global'] && !globalMatch && globalFilterFieldsArray) {
                        for (let j = 0; j < globalFilterFieldsArray.length; j++) {
                            const globalFilterField = globalFilterFieldsArray[j].field || globalFilterFieldsArray[j];
                            globalMatch = this.filterConstraints[this.filters['global'].matchMode](this.objectUtils.resolveFieldData(this.value[i], globalFilterField), this.filters['global'].value);

                            if (globalMatch) {
                                break;
                            }
                        }
                    }

                    let matches: boolean;
                    if (this.filters['global']) {
                        matches = localFiltered ? (localFiltered && localMatch && globalMatch) : globalMatch;
                    } else {
                        matches = localFiltered && localMatch;
                    }

                    if (matches) {
                        this.filteredValue.push(this.value[i]);
                    }
                }

                if (this.filteredValue.length === this.value.length) {
                    this.filteredValue = null;
                }

                if (this.paginator) {
                    this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
                }
            }
        }

        this.onFilter.emit({
            filters: this.filters,
            filteredValue: this.filteredValue || this.value
        });

        this.tableService.onValueChange(this.value);
    }

    hasFilter() {
        let empty = true;
        for (const prop in this.filters) {
            if (this.filters.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }

        return !empty;
    }

    createLazyLoadMetadata(): any {
        return {
            first: this.first,
            rows: this.virtualScroll ? this.rows * 2 : this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
            multiSortMeta: this.multiSortMeta
        };
    }

    public reset() {
        this._sortField = null;
        this._sortOrder = 1;
        this._multiSortMeta = null;

        this.filteredValue = null;
        this.filters = {};

        this.first = 0;

        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        } else {
            this.totalRecords = (this._value ? this._value.length : 0);
        }
    }

    public exportCSV(options?: any) {
        let data = this.filteredValue || this.value;
        let csv = '\ufeff';

        if (options && options.selectionOnly) {
            data = this.selection || [];
        }
        for (let i = 0; i < this.columns.length; i++) {
            const column = this.columns[i];
            if (column.exportable !== false && column.field) {
                csv += '"' + (column.header || column.field) + '"';

                if (i < (this.columns.length - 1)) {
                    csv += this.csvSeparator;
                }
            }
        }

        data.forEach((record, i) => {
            csv += '\n';
            for (i = 0; i < this.columns.length; i++) {
                const column = this.columns[i];
                if (column.exportable !== false && column.field) {
                    let cellData = this.objectUtils.resolveFieldData(record, column.field);

                    if (cellData != null) {
                        if (this.exportFunction) {
                            cellData = this.exportFunction({
                                data: cellData,
                                field: column.field
                            });
                        } else {
                            cellData = String(cellData).replace(/"/g, '""');
                        }
                    } else {
                        cellData = '';
                    }


                    csv += '"' + cellData + '"';

                    if (i < (this.columns.length - 1)) {
                        csv += this.csvSeparator;
                    }
                }
            }
        });

        const blob = new Blob([csv], {
            type: 'text/csv;charset=utf-8;'
        });

        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, this.exportFilename + '.csv');
        } else {
            const link = document.createElement('a');
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', this.exportFilename + '.csv');
                link.click();
            } else {
                csv = 'data:text/csv;charset=utf-8,' + csv;
                window.open(encodeURI(csv));
            }
            document.body.removeChild(link);
        }
    }

    toggleRow(rowData: any, event?: Event) {
        if (!this.dataKey) {
            throw new Error('dataKey must be defined to use row expansion');
        }

        const dataKeyValue = String(this.objectUtils.resolveFieldData(rowData, this.dataKey));

        if (this.expandedRowKeys[dataKeyValue] != null) {
            delete this.expandedRowKeys[dataKeyValue];
            this.onRowCollapse.emit({
                originalEvent: event,
                data: rowData
            });
        } else {
            if (this.rowExpandMode === 'single') {
                this.expandedRowKeys = {};
            }

            this.expandedRowKeys[dataKeyValue] = 1;
            this.onRowExpand.emit({
                originalEvent: event,
                data: rowData
            });
        }

        if (event) {
            event.preventDefault();
        }
    }

    isRowExpanded(rowData: any): boolean {
        return this.expandedRowKeys[String(this.objectUtils.resolveFieldData(rowData, this.dataKey))] === 1;
    }

    isSingleSelectionMode() {
        return this.selectionMode === 'single';
    }

    isMultipleSelectionMode() {
        return this.selectionMode === 'multiple';
    }

    onColumnResizeBegin(event) {
        const containerLeft = this.domHandler.getOffset(this.containerViewChild.nativeElement).left;
        this.lastResizerHelperX = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft);
    }

    onColumnResize(event) {
        const containerLeft = this.domHandler.getOffset(this.containerViewChild.nativeElement).left;
        this.domHandler.addClass(this.containerViewChild.nativeElement, 'cherry-ui-unselectable-text');
        this.resizeHelperViewChild.nativeElement.style.height = this.containerViewChild.nativeElement.offsetHeight + 'px';
        this.resizeHelperViewChild.nativeElement.style.top = 0 + 'px';
        this.resizeHelperViewChild.nativeElement.style.left = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft) + 'px';

        this.resizeHelperViewChild.nativeElement.style.display = 'block';
    }

    onColumnResizeEnd(event, column) {
        const delta = this.resizeHelperViewChild.nativeElement.offsetLeft - this.lastResizerHelperX;
        const columnWidth = column.offsetWidth;
        const newColumnWidth = columnWidth + delta;
        const minWidth = column.style.minWidth || 15;

        if (columnWidth + delta > parseInt(minWidth, 0)) {
            if (this.columnResizeMode === 'fit') {
                let nextColumn = column.nextElementSibling;
                while (!nextColumn.offsetParent) {
                    nextColumn = nextColumn.nextElementSibling;
                }

                if (nextColumn) {
                    const nextColumnWidth = nextColumn.offsetWidth - delta;
                    const nextColumnMinWidth = nextColumn.style.minWidth || 15;

                    if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth, 0)) {
                        if (this.scrollable) {
                            const scrollableBodyTable = this.domHandler.findSingle(this.el.nativeElement, 'table.cherry-ui-table-scrollable-body-table');
                            const scrollableHeaderTable = this.domHandler.findSingle(this.el.nativeElement, 'table.cherry-ui-table-scrollable-header-table');
                            const scrollableFooterTable = this.domHandler.findSingle(this.el.nativeElement, 'table.cherry-ui-table-scrollable-footer-table');
                            const resizeColumnIndex = this.domHandler.index(column);

                            this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                        } else {
                            column.style.width = newColumnWidth + 'px';
                            if (nextColumn) {
                                nextColumn.style.width = nextColumnWidth + 'px';
                            }
                        }
                    }
                }
            } else if (this.columnResizeMode === 'expand') {
                if (this.scrollable) {
                    const scrollableBodyTable = this.domHandler.findSingle(this.el.nativeElement, 'table.cherry-ui-table-scrollable-body-table');
                    const scrollableHeaderTable = this.domHandler.findSingle(this.el.nativeElement, 'table.cherry-ui-table-scrollable-header-table');
                    const scrollableFooterTable = this.domHandler.findSingle(this.el.nativeElement, 'table.cherry-ui-table-scrollable-footer-table');
                    scrollableBodyTable.style.width = scrollableBodyTable.offsetWidth + delta + 'px';
                    scrollableHeaderTable.style.width = scrollableHeaderTable.offsetWidth + delta + 'px';
                    if (scrollableFooterTable) {
                        scrollableFooterTable.style.width = scrollableHeaderTable.offsetWidth + delta + 'px';
                    }
                    const resizeColumnIndex = this.domHandler.index(column);

                    this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, null);
                    this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, null);
                    this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, null);
                } else {
                    this.tableViewChild.nativeElement.style.width = this.tableViewChild.nativeElement.offsetWidth + delta + 'px';
                    column.style.width = newColumnWidth + 'px';
                    const containerWidth = this.tableViewChild.nativeElement.style.width;
                    this.containerViewChild.nativeElement.style.width = containerWidth + 'px';
                }
            }

            this.onColResize.emit({
                element: column,
                delta: delta
            });
        }

        this.resizeHelperViewChild.nativeElement.style.display = 'none';
        this.domHandler.removeClass(this.containerViewChild.nativeElement, 'cherry-ui-unselectable-text');
    }

    resizeColGroup(table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
        if (table) {
            const colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;

            if (colGroup) {
                const col = colGroup.children[resizeColumnIndex];
                const nextCol = col.nextElementSibling;
                col.style.width = newColumnWidth + 'px';

                if (nextCol && nextColumnWidth) {
                    nextCol.style.width = nextColumnWidth + 'px';
                }
            } else {
                return;
            }
        }
    }

    onColumnDragStart(event, columnElement) {
        this.reorderIconWidth = this.domHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild.nativeElement);
        this.reorderIconHeight = this.domHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild.nativeElement);
        this.draggedColumn = columnElement;
        event.dataTransfer.setData('text', 'b');    // For firefox
    }

    onColumnDragEnter(event, dropHeader) {
        if (this.reorderableColumns && this.draggedColumn && dropHeader) {
            event.preventDefault();
            const containerOffset = this.domHandler.getOffset(this.containerViewChild.nativeElement);
            const dropHeaderOffset = this.domHandler.getOffset(dropHeader);

            if (this.draggedColumn !== dropHeader) {
                const targetLeft = dropHeaderOffset.left - containerOffset.left;
                const targetTop = containerOffset.top - dropHeaderOffset.top;
                const columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;

                this.reorderIndicatorUpViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top - (this.reorderIconHeight - 1) + 'px';
                this.reorderIndicatorDownViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';

                if (event.pageX > columnCenter) {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.dropPosition = 1;
                } else {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.dropPosition = -1;
                }

                this.reorderIndicatorUpViewChild.nativeElement.style.display = 'block';
                this.reorderIndicatorDownViewChild.nativeElement.style.display = 'block';
            } else {
                event.dataTransfer.dropEffect = 'none';
            }
        }
    }

    onColumnDragLeave(event) {
        if (this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
        }
    }

    onColumnDrop(event, dropColumn) {
        event.preventDefault();
        if (this.draggedColumn) {
            const dragIndex = this.domHandler.indexWithinGroup(this.draggedColumn, 'cherryReorderableColumn');
            const dropIndex = this.domHandler.indexWithinGroup(dropColumn, 'cherryReorderableColumn');
            let allowDrop = (dragIndex !== dropIndex);
            if (allowDrop && ((dropIndex - dragIndex === 1 && this.dropPosition === -1) || (dragIndex - dropIndex === 1 && this.dropPosition === 1))) {
                allowDrop = false;
            }

            if (allowDrop) {
                this.objectUtils.reorderArray(this.columns, dragIndex, dropIndex);

                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns
                });
            }

            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    }

    onRowDragStart(event, index) {
        this.rowDragging = true;
        this.draggedRowIndex = index;
        event.dataTransfer.setData('text', 'b');    // For firefox
    }

    onRowDragOver(event, index, rowElement) {
        if (this.rowDragging && this.draggedRowIndex !== index) {
            const rowY = this.domHandler.getOffset(rowElement).top + this.domHandler.getWindowScrollTop();
            const pageY = event.pageY;
            const rowMidY = rowY + this.domHandler.getOuterHeight(rowElement) / 2;
            const prevRowElement = rowElement.previousElementSibling;

            if (pageY < rowMidY) {
                this.domHandler.removeClass(rowElement, 'cherry-ui-table-dragpoint-bottom');

                this.droppedRowIndex = index;
                if (prevRowElement) {
                    this.domHandler.addClass(prevRowElement, 'cherry-ui-table-dragpoint-bottom');
                } else {
                    this.domHandler.addClass(rowElement, 'cherry-ui-table-dragpoint-top');
                }
            } else {
                if (prevRowElement) {
                    this.domHandler.removeClass(prevRowElement, 'cherry-ui-table-dragpoint-bottom');
                } else {
                    this.domHandler.addClass(rowElement, 'cherry-ui-table-dragpoint-top');
                }

                this.droppedRowIndex = index + 1;
                this.domHandler.addClass(rowElement, 'cherry-ui-table-dragpoint-bottom');
            }
        }
    }

    onRowDragLeave(event, rowElement) {
        const prevRowElement = rowElement.previousElementSibling;
        if (prevRowElement) {
            this.domHandler.removeClass(prevRowElement, 'cherry-ui-table-dragpoint-bottom');
        }

        this.domHandler.removeClass(rowElement, 'cherry-ui-table-dragpoint-bottom');
        this.domHandler.removeClass(rowElement, 'cherry-ui-table-dragpoint-top');
    }

    onRowDragEnd(event) {
        this.rowDragging = false;
        this.draggedRowIndex = null;
        this.droppedRowIndex = null;
    }

    onRowDrop(event, rowElement) {
        if (this.droppedRowIndex != null) {
            const dropIndex = (this.draggedRowIndex > this.droppedRowIndex) ? this.droppedRowIndex : (this.droppedRowIndex === 0) ? 0 : this.droppedRowIndex - 1;
            this.objectUtils.reorderArray(this.value, this.draggedRowIndex, dropIndex);

            this.onRowReorder.emit({
                dragIndex: this.draggedRowIndex,
                dropIndex: this.droppedRowIndex
            });
        }

        // cleanup
        this.onRowDragLeave(event, rowElement);
        this.onRowDragEnd(event);
    }

    handleVirtualScroll(event) {
        this.first = (event.page - 1) * this.rows;
        this.virtualScrollCallback = event.callback;

        this.zone.run(() => {
            if (this.virtualScrollTimer) {
                clearTimeout(this.virtualScrollTimer);
            }

            this.virtualScrollTimer = setTimeout(() => {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }, this.virtualScrollDelay);
        });
    }

    isEmpty() {
        const data = this.filteredValue || this.value;
        return data == null || data.length === 0;
    }

    ngOnDestroy() {
        this.editingCell = null;
        this.initialized = null;
    }
}
