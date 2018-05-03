import { Component, ElementRef, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';

@Component({
    selector: 'cherry-blockmenubar',
    templateUrl: './blockMenuBar.component.html',
    styleUrls: ['./blockMenuBar.component.scss'] ,
    providers: [DomHandler]
})
export class BlockMenuBarComponent {

    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;

    @Output() itemClickEvent = new EventEmitter<any>();

    theme: String = 'default';

    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2) { }

    componentClick(item: any) {
        this.itemClickEvent.emit(item);
    }
}
