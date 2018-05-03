import { Directive, Input, HostListener } from '@angular/core';
import { TableComponent } from './table.component';

@Directive({
    selector: '[cherryRowToggler]'
})
export class RowTogglerDirective {

    @Input() data: any;

    @Input() cherryRowTogglerDisabled: boolean;

    constructor(public dt: TableComponent) { }

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        if (this.isEnabled()) {
            this.dt.toggleRow(this.data, event);
            event.preventDefault();
        }
    }

    isEnabled() {
        return this.cherryRowTogglerDisabled !== true;
    }
}
