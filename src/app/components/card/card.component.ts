import { NgModule, Component, Input, Output, ViewChild, EventEmitter, ElementRef, ContentChild, TemplateRef, Renderer2, OnInit } from '@angular/core';
import { BlockableUI } from '../common/blockableui';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'cherry-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    animations: [
        trigger('cardContent', [
            state('hidden', style({
                height: '0'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible <=> hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class CardComponent implements BlockableUI, OnInit {

    @Input() toggleable: boolean;

    @Input() collapsed: Boolean = false;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() expandIcon: String = 'fa-chevron-down';

    @Input() collapseIcon: String = 'fa-chevron-up';

    @Input() uiHover: Boolean = true;

    @Input() uiLoading: Boolean = false;

    @Input() uiMax: Boolean = false;

    @Output() collapsedChange: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeToggle: EventEmitter<any> = new EventEmitter();

    @Output() onAfterToggle: EventEmitter<any> = new EventEmitter();

    @ContentChild('title') title: TemplateRef<any>;

    @ContentChild('operate') operate: TemplateRef<any>;

    @ViewChild('card') _card: ElementRef;

    cardHover: Boolean = false;

    _max = false;

    public animating: boolean;

    constructor(private el: ElementRef, private _render: Renderer2) { }

    ngOnInit() {
        if (this.uiMax) {
            window.addEventListener('scroll', () => {
                if (this._max) {
                    this.maxCard();
                    console.log('22');
                }
            });
            window.addEventListener('resize', () => {
                if (this._max) {
                    this._render.setStyle(this._card.nativeElement, 'width', window.innerWidth - 8 + 'px');
                }
            });
        }
    }

    mouseHover() {
        if (this.uiHover) {
            this.cardHover = true;
        }
    }
    mouseOut() {
        if (this.uiHover) {
            this.cardHover = false;
        }
    }

    toggle(event: any) {
        if (this.animating) {
            return false;
        }

        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });

        if (this.uiMax && this.toggleable) {
            if (this._max) {
                if (this.collapsed) {
                    this.expand(event);
                    this.maxCard();
                } else {
                    this.collapse(event);
                    this.maxCard();
                }
            } else {
                if (this.collapsed) {
                    this.expand(event);
                } else {
                    this.collapse(event);
                }
            }
            return;
        }
        if (this.toggleable) {
            if (this.collapsed) {
                this.expand(event);
            } else {
                this.collapse(event);
            }
        }

        event.preventDefault();
    }

    expand(event: any) {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    }

    collapse(even: any) {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    }

    maxCard() {
        if (this.uiMax) {
            if (this.toggleable) {
                if (this.collapsed && !this._max) {
                    this.collapsed = false;
                    this.collapsedChange.emit(this.collapsed);
                    this.fullScreen();
                } else {
                    this.fullScreen();
                }
                return;
            }
            this.fullScreen();
        }
    }

    fullScreen() {
        const rect = this._card.nativeElement.getBoundingClientRect();
        if (!this._max) {
            this._max = true;
            this._render.setStyle(this._card.nativeElement, 'height', window.innerHeight + 'px');
            this._render.setStyle(this._card.nativeElement, 'width', window.innerWidth - 8 + 'px');
            this._render.setStyle(this._card.nativeElement, 'left', -rect.left + 'px');
            this._render.setStyle(this._card.nativeElement, 'position', 'relative');
            this._render.setStyle(this._card.nativeElement, 'z-index', '1000');
            this._render.setStyle(this._card.nativeElement, 'top', -rect.top + 'px');
            return;
        } else {
            this._max = false;
            this._render.removeStyle(this._card.nativeElement, 'height');
            this._render.removeStyle(this._card.nativeElement, 'width', 100);
            this._render.removeStyle(this._card.nativeElement, 'left');
            this._render.removeStyle(this._card.nativeElement, 'position');
            this._render.removeStyle(this._card.nativeElement, 'z-index');
            this._render.removeStyle(this._card.nativeElement, 'top');
        }
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    onToggleDone(event: Event) {
        this.animating = false;
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
    }
}
