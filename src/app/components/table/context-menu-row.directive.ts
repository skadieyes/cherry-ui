import { Input, Directive, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { TableComponent } from './table.component';
import { TableService } from './table.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({
    selector: '[cherryContextMenuRow]'
})
export class ContextMenuRowDirective implements OnDestroy {

    @Input() data: any;

    @Input() cherryContextMenuRowDisabled: boolean;

    @HostBinding('class.cherry-ui-contextmenu-selected') selected;


    subscription: Subscription;

    constructor(public dt: TableComponent, public tableService: TableService) {
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.contextMenuSource$.subscribe((data) => {
                this.selected = this.dt.equals(this.data, data);
            });
        }
    }

    @HostListener('contextmenu', ['$event'])
    onContextMenu(event: Event) {
        if (this.isEnabled()) {
            this.dt.handleRowRightClick({
                originalEvent: event,
                rowData: this.data
            });
            event.preventDefault();
        }
    }

    isEnabled() {
        return this.cherryContextMenuRowDisabled !== true;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
