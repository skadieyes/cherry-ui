import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-radio',
    templateUrl: './radiodemo.component.html',
    styleUrls: ['./radiodemo.component.scss']
})
export class RadioDemoComponent implements OnInit {
    singleValue = true;
    radioValue = 'A';

    singleValueDisabled = true;
    radioValueDisabled = 'A';

    buttonValue = 'A';
    buttonValueDisabled = 'A';

    buttonSizeValue = 'A';

    constructor() { }

    ngOnInit() { }
}
