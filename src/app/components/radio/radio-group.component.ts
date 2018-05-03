import {
    forwardRef,
    AfterContentInit,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnInit,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonComponent } from './radio-button.component';
import { RadioComponent } from './radio.component';

@Component({
    selector: 'cherry-radio-group',
    encapsulation: ViewEncapsulation.None,
    template: `
      <ng-content></ng-content>`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioGroupComponent),
            multi: true
        }
    ],
    styleUrls: ['./radio.component.scss']
})
export class RadioGroupComponent
    implements OnInit, AfterContentInit, ControlValueAccessor {
    _el: HTMLElement;
    _value: string;
    _size: string;
    _prefixCls = 'cherry-ui-radio-group';
    radios: Array<RadioComponent | RadioButtonComponent> = [];

    onChange: (_: string) => void = () => null;
    onTouched: () => void = () => null;

    @Input()
    set uiSize(value: string) {
        this._size = value;
    }

    get uiSize(): string {
        return this._size;
    }

    @HostBinding('class.cherry-ui-radio-group-large')
    get isLarge(): boolean {
        return this._size === 'lg';
    }

    @HostBinding('class.cherry-ui-radio-group-small')
    get isSmall(): boolean {
        return this._size === 'sm';
    }

    addRadio(radio: RadioComponent | RadioButtonComponent): void {
        this.radios.push(radio);
        radio.uiChecked = radio.uiValue === this._value;
    }

    checkRadios(): void {
        this.radios.forEach(item => {
            item.uiChecked = item.uiValue === this._value;
        });
    }

    selectRadio(radio: RadioComponent | RadioButtonComponent): void {
        this.updateValue(radio.uiValue);
    }

    updateValue(value: string): void {
        if (this._value === value) {
            return;
        }
        this._value = value;
        this.onChange(value);
        this.checkRadios();
    }

    constructor(private _elementRef: ElementRef, private _render: Renderer2) {
        this._el = this._elementRef.nativeElement;
    }

    ngAfterContentInit(): void {
        /** trim text node between radio button */
        Array.from(this._el.childNodes).forEach(node => {
            if (node.nodeType === 3) {
                this._el.removeChild(node);
            }
        });
    }

    writeValue(value: string): void {
        this._value = value;
        this.checkRadios();
    }

    registerOnChange(fn: (_: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.radios.forEach(radio => {
            radio.uiDisabled = isDisabled;
        });
    }

    ngOnInit(): void {
        this._render.addClass(this._el, `${this._prefixCls}`);
    }
}
