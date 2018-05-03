import { Component, OnInit, Input, Output, EventEmitter, ContentChild, TemplateRef, OnDestroy } from '@angular/core';
import { MenuItem } from '../../common/menuitem';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LayoutService } from '../layout.service';

@Component({
    selector: 'cherry-headmenubar',
    templateUrl: './headmenubar.component.html',
    styleUrls: ['./headmenubar.component.scss'],
    animations: [
        trigger('TopAnimation', [
            state('up', style({
                top: '0'
            })),
            state('down', style({
                top: '100px'
            })),
            transition('up <=> down', animate('500ms cubic-bezier(0.23, 1, 0.32, 1)'))
        ]),
    ],
})
export class HeadmenubarComponent {
    @Input() centerModel: MenuItem[];
    @Input() rightModel: MenuItem[];
    topBottomShow: Boolean = false;
    @Input() logoSrc: string;
    top_Center_Menu_HasChild: Boolean = true;
    @Input() headerShow: Boolean = true;
    @Output() centerMenuClickEvent = new EventEmitter<any>();
    @Output() rightMenuClickEvent = new EventEmitter<any>();
    @ContentChild('rightBefore') _rightBefore: TemplateRef<any>;
    @ContentChild('rightAfter') _rightAfter: TemplateRef<any>;
    theme: String = 'default';
    @Input() menuParent: MenuItem;
    @Input() menuFixed: Boolean = false;
    @Input() activeItem: MenuItem;
    @Input() logoText: any = 'CherryUI';
    constructor(
        public _layout: LayoutService) { }


    expand(event: any) {
        this._layout.expand(event);
    }
    collapse(event: any) {
        this._layout.collapse(event);
    }
    topCenterMenuJudge(item: any) {
        if (item) {
            for (let i = 0; i < item.length; i++) {
                for (const a in item[i]) {
                    if (a === 'items') {
                        this.top_Center_Menu_HasChild = true;
                        return;
                    } else {
                        this.top_Center_Menu_HasChild = false;
                    }
                }
            }
        }
    }
    topCenterMenuClick(item: any) {
        if (item.label && !item.items) {
            this._layout.menuHeader = item.label;
        }
        this.centerMenuClickEvent.emit(item);
        if (item) {
            this._layout.onlyParentRoute(true);
        }
    }
    topRightMenuClick(item: any) {
        this.rightMenuClickEvent.emit(item);
    }

}
