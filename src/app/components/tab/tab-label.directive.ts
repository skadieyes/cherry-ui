import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[cherryTabLabel]'
})
export class TabLabelDirective {

    private _disabled = false;


    @HostBinding('class.cherry-ui-tabs-tab') true;

    @Input()
    @HostBinding('class.cherry-ui-tabs-tab-disabled')
    set disabled(value: boolean) {
        this._disabled = this.toBoolean(value);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    constructor(public elementRef: ElementRef) {
    }

    getOffsetLeft(): number {
        return this.elementRef.nativeElement.offsetLeft;
    }

    getOffsetWidth(): number {
        return this.elementRef.nativeElement.offsetWidth;
    }

    getOffsetTop(): number {
        return this.elementRef.nativeElement.offsetTop;
    }

    getOffsetHeight(): number {
        return this.elementRef.nativeElement.offsetHeight;
    }
    toBoolean(value: boolean | string): boolean {
        return value === '' || (value && value !== 'false');
    }
}
