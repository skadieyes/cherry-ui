import {
    NgModule, EventEmitter, Directive, ViewContainerRef,
    Input, Output, ContentChildren, ContentChild,
    TemplateRef, OnInit, OnChanges, OnDestroy, AfterContentInit,
    QueryList, SimpleChanges, EmbeddedViewRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'cherry-header',
    template: '<ng-content></ng-content>'
})
export class HeaderComponent { }

@Component({
    selector: 'cherry-footer',
    template: '<ng-content></ng-content>'
})
export class FooterComponent { }

@Directive({
    selector: '[cherryTemplate]',
})
export class TemplateDirective {

    @Input() type: string;

    @Input() name: string;

    constructor(public template: TemplateRef<any>) { }

    getType(): string {
        return this.name;
    }
}

@Directive({
    selector: '[cherryTemplateWrapper]'
})
export class TemplateWrapperDirective implements OnInit, OnDestroy {

    @Input() item: any;

    @Input() index: number;

    @Input() templateRef: TemplateRef<any>;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.templateRef, {
            '\$implicit': this.item,
            'index': this.index
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: 'cherry-column',
    template: ``
})
export class ColumnComponent implements AfterContentInit {
    @Input() field: string;
    @Input() colId: string;
    @Input() sortField: string;
    @Input() filterField: string;
    @Input() header: string;
    @Input() footer: string;
    @Input() sortable: any;
    @Input() editable: boolean;
    @Input() filter: boolean;
    @Input() filterMatchMode: string;
    @Input() filterType: 'text';
    @Input() rowspan: number;
    @Input() colspan: number;
    @Input() style: any;
    @Input() styleClass: string;
    @Input() hidden: boolean;
    @Input() expander: boolean;
    @Input() selectionMode: string;
    @Input() filterPlaceholder: string;
    @Input() filterMaxlength: number;
    @Input() frozen: boolean;
    @Output() sortFunction: EventEmitter<any> = new EventEmitter();
    @ContentChildren(TemplateDirective) templates: QueryList<any>;
    @ContentChild(TemplateRef) template: TemplateRef<any>;

    public headerTemplate: TemplateRef<any>;
    public bodyTemplate: TemplateRef<any>;
    public footerTemplate: TemplateRef<any>;
    public filterTemplate: TemplateRef<any>;
    public editorTemplate: TemplateRef<any>;

    ngAfterContentInit(): void {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'body':
                    this.bodyTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                case 'filter':
                    this.filterTemplate = item.template;
                    break;

                case 'editor':
                    this.editorTemplate = item.template;
                    break;

                default:
                    this.bodyTemplate = item.template;
                    break;
            }
        });
    }
}

@Component({
    selector: 'cherry-row',
    template: ``
})
export class RowComponent {

    @ContentChildren(ColumnComponent) columns: QueryList<ColumnComponent>;

}

@Component({
    selector: 'cherry-headercolumngroup',
    template: ``
})
export class HeaderColumnGroupComponent {

    @ContentChildren(RowComponent) rows: QueryList<any>;
}

@Component({
    selector: 'cherry-footercolumngroup',
    template: ``
})
export class FooterColumnGroupComponent {

    @ContentChildren(RowComponent) rows: QueryList<any>;
}

@Component({
    selector: 'cherry-columnbodytemplateloader',
    template: ``
})
export class ColumnBodyTemplateLoaderComponent implements OnInit, OnChanges, OnDestroy {

    @Input() column: any;

    @Input() rowData: any;

    @Input() rowIndex: number;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.bodyTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.view) {
            return;
        }

        if ('rowIndex' in changes) {
            this.view.context.rowIndex = changes['rowIndex'].currentValue;
        }
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: 'cherry-columnheadertemplateloader',
    template: ``
})
export class ColumnHeaderTemplateLoaderComponent implements OnInit, OnDestroy {

    @Input() column: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.headerTemplate, {
            '\$implicit': this.column
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: 'cherry-columnfootertemplateloader',
    template: ``
})
export class ColumnFooterTemplateLoaderComponent implements OnInit, OnDestroy {

    @Input() column: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.footerTemplate, {
            '\$implicit': this.column
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: 'cherry-columnfiltertemplateloader',
    template: ``
})
export class ColumnFilterTemplateLoaderComponent implements OnInit, OnDestroy {

    @Input() column: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.filterTemplate, {
            '\$implicit': this.column
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: 'cherry-columneditortemplateloader',
    template: ``
})
export class ColumnEditorTemplateLoaderComponent implements OnInit, OnDestroy {

    @Input() column: any;

    @Input() rowData: any;

    @Input() rowIndex: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        this.view = this.viewContainer.createEmbeddedView(this.column.editorTemplate, {
            '\$implicit': this.column,
            'rowData': this.rowData,
            'rowIndex': this.rowIndex
        });
    }

    ngOnDestroy() {
        this.view.destroy();
    }
}

@Component({
    selector: 'cherry-templateloader',
    template: ``
})
export class TemplateLoaderComponent implements OnInit, OnDestroy {

    @Input() template: TemplateRef<any>;

    @Input() data: any;

    view: EmbeddedViewRef<any>;

    constructor(public viewContainer: ViewContainerRef) { }

    ngOnInit() {
        if (this.template) {
            this.view = this.viewContainer.createEmbeddedView(this.template, {
                '\$implicit': this.data
            });
        }
    }

    ngOnDestroy() {
        if (this.view) {
            this.view.destroy();
        }
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [HeaderComponent, FooterComponent, ColumnComponent, TemplateWrapperDirective, ColumnHeaderTemplateLoaderComponent,
        ColumnBodyTemplateLoaderComponent, ColumnFooterTemplateLoaderComponent, ColumnFilterTemplateLoaderComponent, TemplateDirective,
        TemplateLoaderComponent, RowComponent, HeaderColumnGroupComponent, FooterColumnGroupComponent, ColumnEditorTemplateLoaderComponent],
    declarations: [HeaderComponent, FooterComponent, ColumnComponent, TemplateWrapperDirective, ColumnHeaderTemplateLoaderComponent,
        ColumnBodyTemplateLoaderComponent, ColumnFooterTemplateLoaderComponent, ColumnFilterTemplateLoaderComponent, TemplateDirective,
        TemplateLoaderComponent, RowComponent, HeaderColumnGroupComponent, FooterColumnGroupComponent, ColumnEditorTemplateLoaderComponent]
})
export class SharedModule {
}
