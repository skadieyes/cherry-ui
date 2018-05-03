import {
    Component,
    ViewEncapsulation,
    Input,
    ElementRef,
    HostListener,
    AfterContentInit,
    Renderer2
} from '@angular/core';

export type uiButtonType = 'primary';
export type uiButtonShape = 'circle' | null;
export type uiButtonSize = 'sm' | 'lg';
export type uiButtonOutlineType = 'primary';

@Component({
    selector: '[cherry-button]',
    encapsulation: ViewEncapsulation.None,
    template: `
      <i class="fa fa-spinner fa-spin" *ngIf="uiLoading"></i>
      <ng-content></ng-content>
    `,
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements AfterContentInit {
    _el: HTMLElement;
    nativeElement: HTMLElement;
    _iconElement: HTMLElement;
    _type: uiButtonType;
    _shape: uiButtonShape;
    _size: uiButtonSize;
    _classList: Array<string> = [];
    _iconOnly = false;
    _loading = false;
    _clicked = false;
    _ghost: uiButtonOutlineType;
    _prefixCls = 'cherry-ui-btn';

    @Input()
    set uiOutlineType(value: uiButtonOutlineType) {
        this._ghost = value;
        this._setClassMap();
    }

    get uiOutlineType(): uiButtonOutlineType {
        return this._ghost;
    }

    @Input()
    get uiType(): uiButtonType {
        return this._type;
    }

    set uiType(value: uiButtonType) {
        this._type = value;
        this._setClassMap();
    }

    @Input()
    get uiShape(): uiButtonShape {
        return this._shape;
    }

    set uiShape(value: uiButtonShape) {
        this._shape = value;
        this._setClassMap();
    }

    @Input()
    set uiSize(value: uiButtonSize) {
        this._size = value;
        this._setClassMap();
    }

    get uiSize(): uiButtonSize {
        return this._size;
    }

    @Input()
    set uiLoading(value: boolean) {
        this._loading = value;
        this._setClassMap();
        this._setIconDisplay(value);
    }

    get uiLoading(): boolean {
        return this._loading;
    }

    /** toggle button clicked animation */
    @HostListener('click')
    _onClick() {
        this._clicked = true;
        this._setClassMap();
        setTimeout(() => {
            this._clicked = false;
            this._setClassMap();
        }, 300);
    }


    _setIconDisplay(value: boolean) {
        const innerI = this._iconElement;
        if (innerI) {
            this._renderer.setStyle(innerI, 'display', value ? 'none' : 'inline-block');
        }
    }


    /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289 */
    _setClassMap(): void {
        this._classList.forEach(_className => {
            this._renderer.removeClass(this.nativeElement, _className);
        });
        this._classList = [
            this.uiType && `${this._prefixCls}-${this.uiType}`,
            this.uiShape && `${this._prefixCls}-${this.uiShape}`,
            this.uiSize && `${this._prefixCls}-${this.uiSize}`,
            this.uiLoading && `${this._prefixCls}-loading`,
            this._clicked && `${this._prefixCls}-clicked`,
            this._iconOnly && `${this._prefixCls}-icon-only`,
            this.uiOutlineType && `${this._prefixCls}-outline-${this.uiOutlineType}`,
        ].filter((item) => {
            return !!item;
        });
        this._classList.forEach(_className => {
            this._renderer.addClass(this.nativeElement, _className);
        });
    }

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        this.nativeElement = this._elementRef.nativeElement;
        this._renderer.addClass(this.nativeElement, this._prefixCls);
    }

    ngAfterContentInit() {
        this._iconElement = this._innerIElement;
        /** check if host children only has i element */
        if (this._iconElement && this.nativeElement.children.length === 1 && (this._iconElement.isEqualNode(this.nativeElement.children[0]))) {
            this._iconOnly = true;
            this._setClassMap();
        }
        this._setIconDisplay(this.uiLoading);
    }

    get _innerIElement() {
        return this.nativeElement.querySelector('i');
    }
}
