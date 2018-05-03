import { NgModule, Component, OnInit, ElementRef, Input, Output, SimpleChange, EventEmitter, TemplateRef } from '@angular/core';

@Component({
    selector: 'cherry-paginator',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

    @Input() pageLinkSize = 5;

    @Output() onPageChange: EventEmitter<any> = new EventEmitter();

    @Input() style: any;

    @Input() styleClass: string;

    @Input() alwaysShow: Boolean = true;

    @Input() templateLeft: TemplateRef<any>;

    @Input() templateRight: TemplateRef<any>;

    @Input() dropdownAppendTo: any;

    @Input() displayDirection: any;

    pageLinks: number[];

    _totalRecords = 0;

    _first = 0;

    _rows = 0;

    _rowsPerPageOptions: number[];

    rowsPerPageItems: any;

    paginatorState: any;

    ngOnInit() {
        this.updatePaginatorState();
    }

    @Input() get totalRecords(): number {
        return this._totalRecords;
    }

    set totalRecords(val: number) {
        this._totalRecords = val;
        this.updatePageLinks();
    }

    @Input() get first(): number {
        return this._first;
    }

    set first(val: number) {
        this._first = val;
        this.updatePageLinks();
    }

    @Input() get rows(): number {
        return this._rows;
    }

    set rows(val: number) {
        this._rows = val;
        this.updatePageLinks();
    }

    @Input() get rowsPerPageOptions(): number[] {
        return this._rowsPerPageOptions;
    }

    set rowsPerPageOptions(val: number[]) {
        this._rowsPerPageOptions = val;
        if (this._rowsPerPageOptions) {
            this.rowsPerPageItems = [];
            for (const opt of this._rowsPerPageOptions) {
                this.rowsPerPageItems.push({ label: String(opt), value: opt });
            }
        }
    }

    isFirstPage() {
        return this.getPage() === 0;
    }

    isLastPage() {
        return this.getPage() === this.getPageCount() - 1;
    }

    getPageCount() {
        return Math.ceil(this.totalRecords / this.rows) || 1;
    }

    calculatePageLinkBoundaries() {
        const numberOfPages = this.getPageCount(),
            visiblePages = Math.min(this.pageLinkSize, numberOfPages);

        let start = Math.max(0, Math.ceil(this.getPage() - ((visiblePages) / 2)));
        const end = Math.min(numberOfPages - 1, start + visiblePages - 1);

        const delta = this.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);

        return [start, end];
    }

    updatePageLinks() {
        this.pageLinks = [];
        const boundaries = this.calculatePageLinkBoundaries(),
            start = boundaries[0],
            end = boundaries[1];

        for (let i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }
    }

    changePage(p: number) {
        const pc = this.getPageCount();

        if (p >= 0 && p < pc) {
            this.first = this.rows * p;
            const state = {
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc
            };
            this.updatePageLinks();

            this.onPageChange.emit(state);
            this.updatePaginatorState();
        }
    }

    getPage(): number {
        return Math.floor(this.first / this.rows);
    }

    changePageToFirst(event) {
        if (!this.isFirstPage()) {
            this.changePage(0);
        }

        event.preventDefault();
    }

    changePageToPrev(event) {
        this.changePage(this.getPage() - 1);
        event.preventDefault();
    }

    changePageToNext(event) {
        this.changePage(this.getPage() + 1);
        event.preventDefault();
    }

    changePageToLast(event) {
        if (!this.isLastPage()) {
            this.changePage(this.getPageCount() - 1);
        }

        event.preventDefault();
    }

    onPageLinkClick(event, page) {
        this.changePage(page);
        event.preventDefault();
    }

    onRppChange(event: any) {
        this.changePage(this.getPage());
    }

    updatePaginatorState() {
        this.paginatorState = {
            page: this.getPage(),
            rows: this.rows,
            first: this.first,
            totalRecords: this.totalRecords
        };
    }
}

