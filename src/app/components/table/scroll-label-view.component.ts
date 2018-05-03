import { Component, AfterViewInit, OnDestroy, AfterViewChecked, Input, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ColumnComponent } from '../common/shared';
import { DomHandler } from '../dom/domhandler';
import { TableComponent } from './table.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[cherryScrollableView]',
    template: `
        <div #scrollHeader class="cherry-ui-table-scrollable-header cherry-ui-widget-header">
            <div #scrollHeaderBox class="cherry-ui-table-scrollable-header-box">
                <table class="cherry-ui-table-scrollable-header-table">
                    <ng-container *ngTemplateOutlet="frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <thead class="cherry-ui-table-thead">
                        <ng-container *ngTemplateOutlet="frozen ? dt.frozenHeaderTemplate||dt.headerTemplate : dt.headerTemplate; context {$implicit: columns}"></ng-container>
                    </thead>
                    <tbody class="cherry-ui-table-tbody">
                        <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="dt.frozenValue" [ngForTrackBy]="dt.rowTrackBy">
                            <ng-container *ngTemplateOutlet="dt.frozenRowsTemplate; context: {$implicit: rowData, rowIndex: rowIndex, columns: columns}"></ng-container>
                        </ng-template>
                    </tbody>
                </table>
            </div>
        </div>
        <div #scrollBody class="cherry-ui-table-scrollable-body">
            <table #scrollTable [ngClass]="{'cherry-ui-table-virtual-table': dt.virtualScroll}" class="cherry-ui-table-scrollable-body-table">
                <ng-container *ngTemplateOutlet="frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                <tbody class="cherry-ui-table-tbody" cherryTableBody [columns]="columns" [template]="frozen ? dt.frozenBodyTemplate||dt.bodyTemplate : dt.bodyTemplate"></tbody>
            </table>
            <div #virtualScroller class="cherry-ui-table-virtual-scroller"></div>
        </div>
        <div #scrollFooter *ngIf="dt.footerTemplate" class="cherry-ui-table-scrollable-footer cherry-ui-widget-header">
            <div #scrollFooterBox class="cherry-ui-table-scrollable-footer-box">
                <table class="cherry-ui-table-scrollable-footer-table">
                    <ng-container *ngTemplateOutlet="frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <tfoot class="cherry-ui-table-tfoot">
                        <ng-container *ngTemplateOutlet="frozen ? dt.frozenFooterTemplate||dt.footerTemplate : dt.footerTemplate; context {$implicit: columns}"></ng-container>
                    </tfoot>
                </table>
            </div>
        </div>
    `,

})
export class ScrollableViewComponent implements AfterViewInit, OnDestroy, AfterViewChecked {

    @Input() columns: ColumnComponent;

    @Input() frozen: boolean;

    @ViewChild('scrollHeader') scrollHeaderViewChild: ElementRef;

    @ViewChild('scrollHeaderBox') scrollHeaderBoxViewChild: ElementRef;

    @ViewChild('scrollBody') scrollBodyViewChild: ElementRef;

    @ViewChild('scrollTable') scrollTableViewChild: ElementRef;

    @ViewChild('scrollFooter') scrollFooterViewChild: ElementRef;

    @ViewChild('scrollFooterBox') scrollFooterBoxViewChild: ElementRef;

    @ViewChild('virtualScroller') virtualScrollerViewChild: ElementRef;

    headerScrollListener: Function;

    bodyScrollListener: Function;

    footerScrollListener: Function;

    frozenSiblingBody: Element;

    _scrollHeight: string;

    subscription: Subscription;

    totalRecordsSubscription: Subscription;

    initialized: boolean;

    constructor(public dt: TableComponent, public el: ElementRef, public domHandler: DomHandler, public zone: NgZone) {
        this.subscription = this.dt.tableService.valueSource$.subscribe(() => {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.alignScrollBar();
                }, 50);
            });
        });

        if (this.dt.virtualScroll) {
            this.totalRecordsSubscription = this.dt.tableService.totalRecordsSource$.subscribe(() => {
                this.zone.runOutsideAngular(() => {
                    setTimeout(() => {
                        this.setVirtualScrollerHeight();
                    }, 50);
                });
            });
        }

        this.initialized = false;
    }

    @Input() get scrollHeight(): string {
        return this._scrollHeight;
    }
    set scrollHeight(val: string) {
        this._scrollHeight = val;
        this.setScrollHeight();
    }

    ngAfterViewChecked() {
        if (!this.initialized && this.el.nativeElement.offsetParent) {
            this.alignScrollBar();
            this.initialized = true;
        }
    }

    ngAfterViewInit() {
        this.bindEvents();
        this.setScrollHeight();
        this.alignScrollBar();

        if (!this.frozen) {
            if (this.dt.frozenColumns || this.dt.frozenBodyTemplate) {
                this.domHandler.addClass(this.el.nativeElement, 'cherry-ui-table-unfrozen-view');
            }

            if (this.dt.frozenWidth) {
                this.el.nativeElement.style.left = this.dt.frozenWidth;
                this.el.nativeElement.style.width = 'calc(100% - ' + this.dt.frozenWidth + ')';
            }

            const frozenView = this.el.nativeElement.previousElementSibling;
            if (frozenView) {
                this.frozenSiblingBody = this.domHandler.findSingle(frozenView, '.cherry-ui-table-scrollable-body');
            }
        } else {
            this.scrollBodyViewChild.nativeElement.style.paddingBottom = this.domHandler.calculateScrollbarWidth() + 'px';
        }

        if (this.dt.virtualScroll) {
            this.setVirtualScrollerHeight();
        }
    }

    bindEvents() {
        this.zone.runOutsideAngular(() => {
            const scrollBarWidth = this.domHandler.calculateScrollbarWidth();

            if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
                this.headerScrollListener = this.onHeaderScroll.bind(this);
                this.scrollHeaderBoxViewChild.nativeElement.addEventListener('scroll', this.headerScrollListener);
            }

            if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
                this.footerScrollListener = this.onFooterScroll.bind(this);
                this.scrollFooterViewChild.nativeElement.addEventListener('scroll', this.footerScrollListener);
            }

            if (!this.frozen) {
                this.bodyScrollListener = this.onBodyScroll.bind(this);
                this.scrollBodyViewChild.nativeElement.addEventListener('scroll', this.bodyScrollListener);
            }
        });
    }

    unbindEvents() {
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderBoxViewChild.nativeElement.removeEventListener('scroll', this.headerScrollListener);
        }

        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterViewChild.nativeElement.removeEventListener('scroll', this.footerScrollListener);
        }

        this.scrollBodyViewChild.nativeElement.addEventListener('scroll', this.bodyScrollListener);
    }

    onHeaderScroll(event) {
        this.scrollHeaderViewChild.nativeElement.scrollLeft = 0;
    }

    onFooterScroll(event) {
        this.scrollFooterViewChild.nativeElement.scrollLeft = 0;
    }

    onBodyScroll(event) {
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }

        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }

        if (this.frozenSiblingBody) {
            this.frozenSiblingBody.scrollTop = this.scrollBodyViewChild.nativeElement.scrollTop;
        }

        if (this.dt.virtualScroll) {
            const viewport = this.domHandler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
            const tableHeight = this.domHandler.getOuterHeight(this.scrollTableViewChild.nativeElement);
            const pageHeight = 28 * this.dt.rows;
            const virtualTableHeight = this.domHandler.getOuterHeight(this.virtualScrollerViewChild.nativeElement);
            const pageCount = (virtualTableHeight / pageHeight) || 1;
            const scrollBodyTop = this.scrollTableViewChild.nativeElement.style.top || '0';

            if ((this.scrollBodyViewChild.nativeElement.scrollTop + viewport > parseFloat(scrollBodyTop) + tableHeight) || (this.scrollBodyViewChild.nativeElement.scrollTop < parseFloat(scrollBodyTop))) {
                const page = Math.floor((this.scrollBodyViewChild.nativeElement.scrollTop * pageCount) / (this.scrollBodyViewChild.nativeElement.scrollHeight)) + 1;
                this.dt.handleVirtualScroll({
                    page: page,
                    callback: () => {
                        this.scrollTableViewChild.nativeElement.style.top = ((page - 1) * pageHeight) + 'px';

                        if (this.frozenSiblingBody) {
                            (<HTMLElement>this.frozenSiblingBody.children[0]).style.top = this.scrollTableViewChild.nativeElement.style.top;
                        }
                    }
                });
            }
        }
    }

    setScrollHeight() {
        if (this.scrollHeight && this.scrollBodyViewChild && this.scrollBodyViewChild.nativeElement) {
            if (this.scrollHeight.indexOf('%') !== -1) {
                this.scrollBodyViewChild.nativeElement.style.visibility = 'hidden';
                this.scrollBodyViewChild.nativeElement.style.height = '100px';
                const containerHeight = this.domHandler.getOuterHeight(this.dt.el.nativeElement.children[0]);
                const relativeHeight = this.domHandler.getOuterHeight(this.dt.el.nativeElement.parentElement) * parseInt(this.scrollHeight, 0) / 100;
                const staticHeight = containerHeight - 100;
                let scrollBodyHeight = (relativeHeight - staticHeight);

                if (this.frozen) {
                    scrollBodyHeight -= this.domHandler.calculateScrollbarWidth();
                }

                this.scrollBodyViewChild.nativeElement.style.height = 'auto';
                this.scrollBodyViewChild.nativeElement.style.maxHeight = scrollBodyHeight + 'px';
                this.scrollBodyViewChild.nativeElement.style.visibility = 'visible';
            } else {
                if (this.frozen) {
                    this.scrollBodyViewChild.nativeElement.style.maxHeight = (parseInt(this.scrollHeight, 0) - this.domHandler.calculateScrollbarWidth()) + 'px';
                } else {
                    this.scrollBodyViewChild.nativeElement.style.maxHeight = this.scrollHeight;
                }
            }
        }
    }

    setVirtualScrollerHeight() {
        if (this.virtualScrollerViewChild.nativeElement) {
            this.virtualScrollerViewChild.nativeElement.style.height = this.dt.totalRecords * this.dt.virtualRowHeight + 'px';
        }
    }

    hasVerticalOverflow() {
        return this.domHandler.getOuterHeight(this.scrollTableViewChild.nativeElement) > this.domHandler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
    }

    alignScrollBar() {
        if (!this.frozen) {
            const scrollBarWidth = this.hasVerticalOverflow() ? this.domHandler.calculateScrollbarWidth() : 0;
            this.scrollHeaderBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';

            if (this.scrollFooterBoxViewChild && this.scrollFooterBoxViewChild.nativeElement) {
                this.scrollFooterBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';
            }
        }
        this.initialized = false;
    }

    ngOnDestroy() {
        this.unbindEvents();

        this.frozenSiblingBody = null;

        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        if (this.totalRecordsSubscription) {
            this.totalRecordsSubscription.unsubscribe();
        }
        this.initialized = false;
    }
}
