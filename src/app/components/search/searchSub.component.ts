import { Component, ElementRef, OnDestroy, Input, Output, OnInit, EventEmitter, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem } from '../common/menuitem';
import { KeywordPipe } from '../common/keyword.pipe';
import { SearchService } from './search.service';

@Component({
    selector: 'cherry-searchsub',
    templateUrl: './searchSub.component.html',
    styleUrls: ['./search.component.scss'],
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
export class SearchSubComponent {

    @Input() item: MenuItem;

    @Input() expanded: boolean;

    @Output() itemClickEvent = new EventEmitter<any>();

    activeItem: any;

    chlidClick(event: any, item: HTMLElement, haschlid: boolean) {
        this.itemClickEvent.emit(item);
        this.activeItem = null;
        if (!haschlid) {
            // this.activeItem = item;
        }

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
