import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-alertdemo',
    templateUrl: './alertdemo.component.html',
    styleUrls: ['./alertdemo.component.scss']
})
export class AlertdemoComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        console.log(`
        <div cherry-col [uiSpan]="6">
        <cherry-alert [uiType]="'success'" [uiMessage]="'Success Tips'" [uiShowIcon]="true" >
        </cherry-alert>
    </div>
        `);

    }

}
