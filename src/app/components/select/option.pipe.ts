import { Pipe, PipeTransform } from '@angular/core';
import { OptionComponent } from './option.component';

@Pipe({ name: 'uiOptionPipe' })
export class OptionPipe implements PipeTransform {
    transform(options: OptionComponent[], value: any) {
        if (value.searchText) {
            let _options = options.filter(option => option.uiLabel && (option.uiLabel.toLowerCase().indexOf(value.searchText.toLowerCase()) !== -1));
            if (value.tags) {
                _options = options.filter(option => option.uiLabel && (option.uiLabel.toLowerCase() === value.searchText.toLowerCase()));
            }
            if (_options.length) {
                return _options;
            } else {
                return <OptionComponent[]>[{
                    uiValue: value.value,
                    _value: value.value,
                    uiDisabled: value.disabled,
                    _disabled: value.disabled,
                    uiLabel: value.notFoundContent,
                    _label: value.notFoundContent,
                }];
            }
        } else {
            return options;
        }
    }
}
