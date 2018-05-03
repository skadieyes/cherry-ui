/* tslint:disable:no-any */
import {
    forwardRef,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: '[cherry-checkbox]',
    encapsulation: ViewEncapsulation.None,
    template: `
      <span [ngClass]='_classMap'>
        <span [ngClass]='_innerPrefixCls'></span>
        <input type='checkbox'
          [ngClass]='_inputPrefixCls'
          [ngModel]='uiChecked'
          (focus)='uiFocus()'
          (blur)='onTouched();uiBlur()'>
      </span>
      <ng-content></ng-content>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        }
    ],
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent
    implements OnInit, ControlValueAccessor, OnChanges {
    private _disabled = false;
    private _indeterminate = false;
    _el: HTMLElement;
    _prefixCls = 'cherry-ui-checkbox';
    _innerPrefixCls = `${this._prefixCls}-inner`;
    _inputPrefixCls = `${this._prefixCls}-input`;
    _checked = false;
    _focused = false;
    // ngModel Access
    onChange: any = Function.prototype;
    onTouched: any = Function.prototype;

    _classMap = {
        [this._prefixCls]: true,
        [`${this._prefixCls}-checked`]: this._checked && !this.uiIndeterminate,
        [`${this._prefixCls}-focused`]: this._focused,
        [`${this._prefixCls}-disabled`]: this.uiDisabled,
        [`${this._prefixCls}-indeterminate`]: this.uiIndeterminate
    };

    @Input()
    set uiDisabled(value: boolean) {
        this._disabled = this.toBoolean(value);
    }

    get uiDisabled(): boolean {
        return this._disabled;
    }

    @Input()
    set uiIndeterminate(value: boolean) {
        this._indeterminate = this.toBoolean(value);
    }

    get uiIndeterminate(): boolean {
        return this._indeterminate;
    }

    @Input()
    get uiChecked(): boolean {
        return this._checked;
    }

    @HostListener('click', ['$event'])
    onClick(e: MouseEvent): void {
        e.preventDefault();
        if (!this.uiDisabled) {
            this.updateValue(!this._checked);
        }
    }

    updateValue(value: boolean): void {
        if (value === this._checked) {
            return;
        }
        this.onChange(value);
        this._checked = value;
        this.updateClassMap();
    }

    uiFocus(): void {
        this._focused = true;
    }

    uiBlur(): void {
        this._focused = false;
    }

    constructor(private _elementRef: ElementRef, private _render: Renderer2) {
        this._el = this._elementRef.nativeElement;
    }

    toBoolean(value: boolean | string): boolean {
        return value === '' || (value && value !== 'false');
    }

    writeValue(value: any): void {
        this._checked = value;
        this.updateClassMap();
    }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.uiDisabled = isDisabled;
    }

    updateClassMap(): void {
        this._classMap = {
            [this._prefixCls]: true,
            [`${this._prefixCls}-checked`]:
                this._checked && !this.uiIndeterminate,
            [`${this._prefixCls}-focused`]: this._focused,
            [`${this._prefixCls}-disabled`]: this.uiDisabled,
            [`${this._prefixCls}-indeterminate`]: this.uiIndeterminate
        };
    }

    ngOnInit(): void {
        this._render.addClass(this._el, `${this._prefixCls}-wrapper`);
        this.updateClassMap();
    }

    ngOnChanges(): void {
        this.updateClassMap();
    }
}
