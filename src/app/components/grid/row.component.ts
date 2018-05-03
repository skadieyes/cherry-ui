import {
    Component,
    Input,
    OnInit,
    ElementRef,
    ViewEncapsulation,
    Renderer2,
} from '@angular/core';

export type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
export type Align = 'top' | 'middle' | 'bottom';
export type Type = 'flex' | null;

@Component({
    selector: '[cherry-row],cherry-row',
    encapsulation: ViewEncapsulation.None,
    template: `<ng-content></ng-content>`,
    styleUrls: ['./grid.component.scss']
})

export class RowComponent implements OnInit {
    _classList: Array<string> = [];
    _el: HTMLElement;
    _prefixCls = 'cherry-ui-row';
    _gutter: number;
    _type: Type;
    _align: Align = 'top';
    _justify: Justify = 'start';

    @Input()
    set uiType(value: Type) {
        this._type = value;
        this.setClassMap();
    }

    get uiType(): Type {
        return this._type;
    }

    @Input()
    set uiAlign(value: Align) {
        this._align = value;
        this.setClassMap();
    }

    get uiAlign(): Align {
        return this._align;
    }

    @Input()
    set uiJustify(value: Justify) {
        this._justify = value;
        this.setClassMap();
    }

    get uiJustify(): Justify {
        return this._justify;
    }

    @Input()
    get uiGutter(): number {
        return this._gutter;
    }

    set uiGutter(value: number) {
        this._gutter = value;
       // this.setStyle();
    }

    setStyle() {
        this._renderer.setStyle(this._el, 'margin-left', `-${this._gutter / 2}px`);
        this._renderer.setStyle(this._el, 'margin-right', `-${this._gutter / 2}px`);
    }

    /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289*/
    setClassMap(): void {
        this._classList.forEach(_className => {
            this._renderer.removeClass(this._el, _className);
        });
        this._classList = [
            (!this.uiType) && this._prefixCls,
            this.uiType && `${this._prefixCls}-${this.uiType}`,
            this.uiType && this.uiAlign && `${this._prefixCls}-${this.uiType}-${this.uiAlign}`,
            this.uiType && this.uiJustify && `${this._prefixCls}-${this.uiType}-${this.uiJustify}`
        ].filter((item) => {
            return !!item;
        });
        this._classList.forEach(_className => {
            this._renderer.addClass(this._el, _className);
        });
    }

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        this._el = this._elementRef.nativeElement;
    }

    ngOnInit() {
        this.setClassMap();
    }
}
