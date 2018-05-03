import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem } from '../../common/menuitem';
import { LayoutService } from '../layout.service';

@Component({
    selector: 'cherry-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    animations: [
        trigger('TopTopAnimation', [
            state('hidden', style({
                display: 'none',
                height: '0'
            })),
            state('visible', style({
                display: 'block',
                height: '100px'
            })),
            transition('visible <=> hidden', animate('500ms cubic-bezier(0.23, 1, 0.32, 1)'))
        ])]
})

export class HeaderComponent implements OnInit {

    constructor(
        public _layout: LayoutService) { }

    public animating: boolean;

    @Input() model: MenuItem[];
    @Output() itemClickEvent = new EventEmitter<any>();

    ngOnInit() { }

    onToggleDone(event: Event) {
        this.animating = false;
    }
    toggle(event: any) {
        if (this.animating) {
            return false;
        }
        this.animating = true;
        event.preventDefault();
    }
    expand(event: any) {
        this._layout.expand(event);
    }
    collapse(event: any) {
        this._layout.collapse(event);
    }
    topTopMenuClick(item: any) {
        this.collapse(event);
        this.itemClickEvent.emit(item);
        if (item) {
            this._layout.onlyParentRoute(true);
        }
    }

}
