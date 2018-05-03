import {
    Component,
    HostBinding,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import { RadioComponent } from './radio.component';

@Component({
    selector: '[cherry-radio-button]',
    encapsulation: ViewEncapsulation.None,
    template: `
      <span [ngClass]='_classMap'>
        <span [ngClass]='_innerPrefixCls'></span>
        <input type='radio' [ngClass]='_inputPrefixCls' [(ngModel)]='uiChecked' (focus)='uiFocus()' (blur)='uiBlur()'>
      </span>
      <ng-content></ng-content>
    `,
    styleUrls: ['./radio.component.scss']
})
export class RadioButtonComponent extends RadioComponent implements OnInit {
    _checked = false;
    _disabled = false;
    _prefixCls = 'cherry-ui-radio-button';
    _innerPrefixCls = `${this._prefixCls}-inner`;
    _inputPrefixCls = `${this._prefixCls}-input`;

    toBoolean(value: boolean | string): boolean {
        return value === '' || (value && value !== 'false');
    }

    @Input()
    @HostBinding('class.cherry-ui-radio-button-wrapper-disabled')
    set uiDisabled(value: boolean) {
        this._disabled = this.toBoolean(value);
        this.setClassMap();
    }

    get uiDisabled(): boolean {
        return this._disabled;
    }

    @Input()
    @HostBinding('class.cherry-ui-radio-button-wrapper-checked')
    set uiChecked(value: boolean) {
        this._checked = this.toBoolean(value);
        this.setClassMap();
    }

    get uiChecked(): boolean {
        return this._checked;
    }
}
