import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class FlexibleMenuService {
    public childClick: Boolean ;
    public flagchanges: Subject<any> = new Subject<any>();

    constructor() {
    }

    ifChildClick(ifClick: Boolean): void {
        this.childClick = ifClick;
        this.flagchanges.next(this.childClick);
    }
}
