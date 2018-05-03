import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
    selector: 'cherry-input',
    templateUrl: './inputdemo.component.html',
    styleUrls: ['./inputdemo.component.scss']
})
export class InputDemoComponent implements OnInit {

    nzValue: any = '1111111111';

    autosize = {
        minRows: 4,
        maxRows: 6
    };

    constructor() { }

    ngOnInit() {
    }


}
