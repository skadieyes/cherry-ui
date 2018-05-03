import { Component, Input, ViewEncapsulation, AfterContentInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

export type uiButtonGroupSize = 'sm' | 'lg' | 'default';

@Component({
    selector: 'cherry-button-group',
    encapsulation: ViewEncapsulation.None,
    template: `
    <div #groupWrapper>
      <ng-content></ng-content>
    </div>
  `
})
export class ButtonGroupComponent implements AfterContentInit {
    _size: uiButtonGroupSize;
    _el: HTMLElement;
    _vertical: Boolean = false;
    _prefixCls = 'cherry-ui-btn-group';
    _classList: Array<string> = [];
    @ViewChild('groupWrapper') _groupWrapper: ElementRef;

    @Input()
    get uiSize(): uiButtonGroupSize {
        return this._size;
    }

    set uiSize(value: uiButtonGroupSize) {
        this._size = value;
        this._setClassMap();
    }

    @Input()
    get uiVertical(): Boolean {
        return this._vertical;
    }

    set uiVertical(value: Boolean) {
        this._vertical = value;
        this._setClassMap();
    }

    _setClassMap(): void {
        this._classList.forEach(_className => {
            this._renderer.addClass(this._groupWrapper, _className);
        });
        this._classList = [
            this.uiSize && `${this._prefixCls}-${this.uiSize}`,
            this.uiVertical && `${this._prefixCls}-vertical`
        ].filter((item) => {
            return !!item;
        });
        this._classList.forEach(_className => {
            this._renderer.addClass(this._groupWrapper.nativeElement, _className);
        });
    }


    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    }

    ngAfterContentInit() {
        this._renderer.addClass(this._groupWrapper.nativeElement, this._prefixCls);
    }

}
