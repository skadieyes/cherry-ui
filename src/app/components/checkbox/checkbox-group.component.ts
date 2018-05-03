/* tslint:disable:no-any */
import {
    forwardRef,
    AfterContentInit,
    Component,
    ElementRef,
    Input,
    OnInit,
    Renderer,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'cherry-checkbox-group',
    encapsulation: ViewEncapsulation.None,
    template: `
      <label
        cherry-checkbox
        *ngFor='let option of _options'
        [uiDisabled]='option.disabled||uiDisabled'
        [(ngModel)]='option.checked'
        (ngModelChange)='_optionChange()'>
        <span>{{ option.label }}</span>
      </label>`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxGroupComponent),
            multi: true
        }
    ],
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxGroupComponent implements ControlValueAccessor {
    private _disabled = false;
    private _type: string;
    _el: HTMLElement;
    _options: any[];
    _prefixCls = 'cherry-ui-checkbox-group';
    // ngModel Access
    onChange: any = Function.prototype;
    onTouched: any = Function.prototype;
    @Input()
    set uiType(value: string) {
        this._render.setElementClass(this._el, `${this._prefixCls}` + '-' + value, true);
    }

    get uiType(): string {
        return this._type;
    }

    @Input()
    set uiDisabled(value: boolean) {
        this._disabled = this.toBoolean(value);
    }

    get uiDisabled(): boolean {
        return this._disabled;
    }

    _optionChange(): void {
        this.onChange(this._options);
    }

    constructor(private _elementRef: ElementRef, private _render: Renderer) {
        this._el = this._elementRef.nativeElement;
        this._render.setElementClass(this._el, `${this._prefixCls}`, true);
    }
    toBoolean(value: boolean | string): boolean {
        return value === '' || (value && value !== 'false');
    }
    writeValue(value: any): void {
        this._options = value;
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
}
