import {
    forwardRef,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Optional,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { RadioGroupComponent } from './radio-group.component';

@Component({
    selector: '[cherry-radio]',
    encapsulation: ViewEncapsulation.None,
    template: `
      <span [ngClass]='_classMap'>
        <span [ngClass]='_innerPrefixCls'></span>
        <input type='radio' [ngClass]='_inputPrefixCls' [(ngModel)]='uiChecked' (focus)='uiFocus()' (blur)='uiBlur()'>
      </span>
      <ng-content></ng-content>
    `,
    styleUrls: ['./radio.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioComponent),
            multi: true
        }
    ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {
    private _focused = false;
    _checked = false;
    _disabled = false;
    _el: HTMLElement;
    _classMap: any;
    _value: string;
    _prefixCls = 'cherry-ui-radio';
    _innerPrefixCls = `${this._prefixCls}-inner`;
    _inputPrefixCls = `${this._prefixCls}-input`;
    // ngModel Access
    onChange: (_: boolean) => void = () => null;
    onTouched: () => void = () => null;

    toBoolean(value: boolean | string): boolean {
        return value === '' || (value && value !== 'false');
    }

    @Input()
    @HostBinding('class.cherry-ui-radio-wrapper-checked')
    set uiChecked(value: boolean) {
        this._checked = this.toBoolean(value);
        this.setClassMap();
    }

    get uiChecked(): boolean {
        return this._checked;
    }

    @Input()
    get uiValue(): string {
        return this._value;
    }

    set uiValue(value: string) {
        if (this._value === value) {
            return;
        }
        this._value = value;
    }

    @Input()
    @HostBinding('class.cherry-ui-radio-wrapper-disabled')
    set uiDisabled(value: boolean) {
        this._disabled = this.toBoolean(value);
        this.setClassMap();
    }

    get uiDisabled(): boolean {
        return this._disabled;
    }

    @HostListener('click', ['$event'])
    onClick(e: MouseEvent): void {
        e.preventDefault();
        if (!this._disabled) {
            if (this._radioGroup) {
                this._checked = true;
                this.setClassMap();
                this._radioGroup.selectRadio(this);
            } else {
                this.updateValue(!this._checked);
            }
        }
    }

    uiFocus(): void {
        this._focused = true;
        this.setClassMap();
    }

    uiBlur(): void {
        this._focused = false;
        this.setClassMap();
        if (this._radioGroup) {
            this._radioGroup.onTouched();
        }
    }

    setClassMap(): void {
        this._classMap = {
            [this._prefixCls]: true,
            [`${this._prefixCls}-checked`]: this._checked,
            [`${this._prefixCls}-focused`]: this._focused,
            [`${this._prefixCls}-disabled`]: this._disabled
        };
    }

    constructor(
        private _elementRef: ElementRef,
        public _renderer: Renderer2,
        @Optional() public _radioGroup: RadioGroupComponent
    ) {
        this._el = this._elementRef.nativeElement;
    }

    ngOnInit(): void {
        if (this._radioGroup) {
            this._radioGroup.addRadio(this);
        }
        this._renderer.addClass(this._el, `${this._prefixCls}-wrapper`);
        this.setClassMap();
    }

    // region: value accessor
    updateValue(value: boolean): void {
        if (value === this._checked) {
            return;
        }
        this.onChange(value);
        this._focused = false;
        this._checked = value;
        this.setClassMap();
    }

    writeValue(value: boolean): void {
        this._checked = value;
        this.setClassMap();
    }

    registerOnChange(fn: (_: boolean) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }
    // endregion
}
