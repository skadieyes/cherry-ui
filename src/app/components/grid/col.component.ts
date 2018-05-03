import {
    Component,
    Input,
    OnInit,
    ElementRef,
    HostBinding,
    OnChanges,
    Renderer2,
    SimpleChange,
    Host,
    Optional
} from '@angular/core';
import { RowComponent } from './row.component';

export abstract class EmbeddedProperty {
    span: number;
    pull: number;
    push: number;
    offset: number;
    order: number;
}

@Component({
    selector: 'cherry-col',
    template: `
      <ng-content></ng-content>
    `,
    styles: []
})

export class ColComponent implements OnInit, OnChanges {
    _classList: Array<string> = [];
    _el: HTMLElement;
    _prefixCls = 'cherry-ui-col';
    _prefix = 'cherry-ui';

    @HostBinding('style.padding-left.px')
    get paddingLeft() {
        return this._uiRow && this._uiRow._gutter / 2;
    }

    @HostBinding('style.padding-right.px')
    get paddingRight() {
        return this._uiRow && this._uiRow._gutter / 2;
    }

    @Input() uiSpan: number;
    @Input() uiOrder: number;
    @Input() uiOffset: number;
    @Input() uiPush: number;
    @Input() uiPull: number;

    @Input() uiXs: number | EmbeddedProperty;
    @Input() uiSm: number | EmbeddedProperty;
    @Input() uiMd: number | EmbeddedProperty;
    @Input() uiLg: number | EmbeddedProperty;
    @Input() uiXl: number | EmbeddedProperty;

    [name: string]: any;

    /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289*/
    setClassMap(): void {
        this._classList.forEach(_className => {
            this._renderer.removeClass(this._el, _className);
        });
        this._classList = [
            this.uiSpan && `${this._prefixCls}-${this.uiSpan}`,
            this.uiOrder && `${this._prefixCls}-order-${this.uiOrder}`,
            this.uiOffset && `${this._prefixCls}-offset-${this.uiOffset}`,
            this.uiPull && `${this._prefixCls}-pull-${this.uiPull}`,
            this.uiPush && `${this._prefixCls}-push-${this.uiPush}`,
            ...this.generateClass()
        ];
        this._classList = this._classList.filter((item) => {
            return !!item;
        });
        this._classList.forEach(_className => {
            this._renderer.addClass(this._el, _className);
        });
    }

    generateClass() {
        const listOfSizeInputName = ['uiXs', 'uiSm', 'uiMd', 'uiLg', 'uiXl'];
        const listOfClassName = new Array();
        listOfSizeInputName.forEach(name => {
            const sizeName = name.replace('ui', '').toLowerCase();
            if ((typeof (this[name]) === 'number') || (typeof (this[name]) === 'string')) {
                listOfClassName.push(this[name] && `${this._prefixCls}-${sizeName}-${this[name]}`);
            } else {
                listOfClassName.push(this[name] && this[name]['span'] && `${this._prefixCls}-${sizeName}-${this[name]['span']}`);
                listOfClassName.push(this[name] && this[name]['pull'] && `${this._prefixCls}-${sizeName}-pull-${this[name]['pull']}`);
                listOfClassName.push(this[name] && this[name]['push'] && `${this._prefixCls}-${sizeName}-push-${this[name]['push']}`);
                listOfClassName.push(this[name] && this[name]['offset'] && `${this._prefixCls}-${sizeName}-offset-${this[name]['offset']}`);
                listOfClassName.push(this[name] && this[name]['order'] && `${this._prefixCls}-${sizeName}-order-${this[name]['order']}`);
                listOfClassName.push(this[name] && this[name]['show'] && `${this._prefix}-${sizeName}-${this[name]['show']}`);
            }
        });
        return listOfClassName;
    }


    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        this.setClassMap();
    }

    constructor(private _elementRef: ElementRef, @Optional() @Host() public _uiRow: RowComponent, private _renderer: Renderer2) {
        this._el = this._elementRef.nativeElement;
    }

    ngOnInit(): any {
        this.setClassMap();
    }
}
