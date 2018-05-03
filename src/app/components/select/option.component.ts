import {
    Component,
    ViewEncapsulation,
    Input,
    OnDestroy,
    OnInit,
    ContentChild,
    TemplateRef
} from '@angular/core';

import { SelectComponent } from './select.component';

@Component({
    selector: 'cherry-option',
    encapsulation: ViewEncapsulation.None,
    template: `
      <ng-content></ng-content>
    `,
    styleUrls: []
})
export class OptionComponent implements OnDestroy, OnInit {

    _value: string;
    _label: string;
    _disabled = false;
    @ContentChild('uiOptionTemplate') uiOptionTemplate: TemplateRef<any>;

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
    get uiLabel(): string {
        return this._label;
    }

    set uiLabel(value: string) {
        if (this._label === value) {
            return;
        }
        this._label = value;
    }

    @Input()
    get uiDisabled(): boolean {
        return this._disabled;
    }

    set uiDisabled(value: boolean) {
        this._disabled = value;
    }

    constructor(private _Select: SelectComponent) {
    }

    ngOnInit(): void {
        this._Select.addOption(this);
    }

    ngOnDestroy() {
        this._Select.removeOption(this);
    }
}
