import { NgModule, Component, ElementRef, Input, EventEmitter, Output, OnInit, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem } from '../common/menuitem';
import { Observable } from 'rxjs/Rx';
import { ParamMap } from '@angular/router';
@Component({
    selector: 'cherry-accordionmenusub',
    templateUrl: './accordionMenuSub.component.html',
    styleUrls: ['./accordionMenu.component.scss'],
    animations: [
        trigger('submenu', [
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
export class AccordionMenuSubComponent implements OnInit {

    @Input() item: MenuItem;

    @Input() expanded: boolean;

    @Output() itemClickEvent = new EventEmitter<any>();

    activeItem: any;

    activeElement: any;

    theme: String = 'default';

    private selectedId: number;

    constructor(private _el: ElementRef) {

    }

    ngOnInit() {


    }

    chlidClick(event: any, item: HTMLElement, haschlid: boolean) {
        this.itemClickEvent.emit(item);
        this.activeItem = null;
        if (!haschlid) {
            // this.activeItem = item;
        }

    }
    domClick(child: HTMLElement) {
        //  console.log(child.parentElement);
    }
    componentClick(item: any) {
        this.itemClickEvent.emit(item);
    }

    handleClick(event: any, item: any) {
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
}
