import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class LayoutService {
    public parentRoute: boolean;
    public flagchanges: Subject<any> = new Subject<any>();

    public topTopShow: Boolean = false;
    public topTopShowchanges: Subject<any> = new Subject<any>();

    private _menuHeader: any = '';
    public menuHeaderchanges: Subject<any> = new Subject<any>();

    constructor() {
    }

    set menuHeader(name: any) {
        this._menuHeader = name;
        this.menuHeaderchanges.next(this._menuHeader);
    }

    get menuHeader() {
        return this._menuHeader;
    }
    expand(event: any) {
        this.topTopShow = true;
        this.topTopShowchanges.next(this.topTopShow);
    }
    collapse(event: any) {
        this.topTopShow = false;
        this.topTopShowchanges.next(this.topTopShow);
    }
    onlyParentRoute(only: boolean): void {
        this.parentRoute = only;
        this.flagchanges.next(this.parentRoute);
    }
}
