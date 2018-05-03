import { NgModule, Component, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem } from '../common/menuitem';

@Component({
    selector: 'cherry-accordionmenu',
    templateUrl: './accordionMenu.component.html',
    styleUrls: ['./accordionMenu.component.scss'],
    animations: [
        trigger('rootItem', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AccordionMenuComponent {

    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;

    @Output() itemClickEvent = new EventEmitter<any>();

    @Input() searchResult: any;

    public animating: boolean;

    theme: String = 'default';

    handleClick(event: any, item: any) {
        this.itemClickEvent.emit(item);
        this.animating = true;
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        item.expanded = !item.expanded;

        if (!item.url) {
            event.preventDefault();
        }

        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
    }

    getResult(result: MenuItem) {
        console.log(result);
        // this.model[0].expanded = true;
    }

    MouseHover(item: any) {

    }

    onToggleDone() {
        this.animating = false;
    }
    componentClick(item: any) {
        this.itemClickEvent.emit(item);
    }

}
