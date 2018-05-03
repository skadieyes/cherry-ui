import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cherry-selectdemo',
    templateUrl: './selectdemo.component.html',
    styleUrls: ['./selectdemo.component.scss']
})
export class SelectDemoComponent implements OnInit {

    constructor() { }

    options_1 = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Mike', label: 'Mike' },
        { value: 'Lily', label: 'Lily' },
        { value: 'disabled', label: 'Disabled', disabled: true }
    ];

    selectedOption_1 = this.options_1[0];

    options_2 = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Mike', label: 'Mike' },
        { value: 'Lily', label: 'Lily' },
        { value: 'disabled', label: 'Disabled', disabled: true }
    ];

    selectedOption_2 = this.options_2[0];

    options_3 = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Mike', label: 'Mike' },
        { value: 'Lily', label: 'Lily' },
        { value: 'disabled', label: 'Disabled', disabled: true }
    ];

    selectedOption_3 = this.options_3[0];

    options_4 = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
    ];

    selectedOption_4 = this.options_4[0];

    options_5 = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' }
    ];

    selectedOption_5 = this.options_5[0];

    options_6 = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Mike', label: 'Mike' },
        { value: 'Lily', label: 'Lily' },
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Mike', label: 'Mike' },
        { value: 'Lily', label: 'Lily' },
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Mike', label: 'Mike' },
        { value: 'Lily', label: 'Lily' },
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Mike', label: 'Mike' },
        { value: 'Lily', label: 'Lily' }
    ];

    selectedOption_6 = this.options_6[0];

    options_7 = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Mike', label: 'Mike' },
        { value: 'Lily', label: 'Lily' }
    ];

    selectedOption_7 = this.options_7[0];

    loading = false;
    index = 0;

    ngOnInit() {

    }
    scrollToBottom() {
        if (!this.loading) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 3000);
        }
    }
}
