import { style } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { element } from 'protractor';
import {
    Component,
    OnInit,
    ViewEncapsulation,
    Input,
    ElementRef,
    Renderer2,
    HostBinding,
    ContentChild,
    TemplateRef,
    AfterViewInit,
    ViewChild,
    Output,
    EventEmitter
} from '@angular/core';
@Component({
    selector: 'cherry-input-group',
    templateUrl: './inputgroup.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './input.component.scss'
    ]
})

export class InputGroupComponent implements OnInit, AfterViewInit {
    _el: HTMLElement;
    _prefixCls = 'cherry-ui-input';
    _prefix = 'cherry-ui';
    _type: String = 'primary';
    _classList: Array<string> = [];
    parent: HTMLElement;

    @ContentChild('addOnBefore') _addOnContentBefore: TemplateRef<any>;
    @ContentChild('addOnAfter') _addOnContentAfter: TemplateRef<any>;

    @ContentChild('prefix') _prefixContent: any;
    @ContentChild('suffix') _suffixContent: any;

    @ViewChild('contextIcon') contextIconEl: ElementRef;


    @HostBinding(`class.cherry-ui-input-group-lg`)
    get _isLarge(): boolean {
        return this.uiSize === 'lg';
    }

    @HostBinding(`class.cherry-ui-input-group-sm`)
    get _isSmall(): boolean {
        return this.uiSize === 'sm';
    }

    clearActive = false;
    clearMouseOver = false;
    @Output() clearEvent = new EventEmitter<any>();

    @Input() uiLine: Boolean = false;
    @Input() uiClear: Boolean = false;

    @Input() uiLabel: string;
    @Input() uiLabelType: string;

    @Input()
    get uiType() {
        return this._type;
    }

    set uiType(value: String) {
        this._type = value;
        this._setClassMap();
        this.contextIconSet();
        if (this.parent.querySelector('#cherry-ui-add-label')) {
            if (this.uiLabelType === 'flex') {
                if (!this._prefixContent) {
                    if (this.uiType !== 'primary') {
                        this._render.setAttribute(this.parent.querySelector('#cherry-ui-add-label'), 'class', `${this._prefix}-label-flex-${this.uiType} ${this._prefix}-label-focus-${this.uiType} `);
                    } else {
                        this._render.setAttribute(this.parent.querySelector('#cherry-ui-add-label'), 'class', `${this._prefix}-label-flex-${this.uiType}  `);
                    }
                } else if (this._prefixContent) {
                    if (this.uiType !== 'primary') {
                        this._render.setAttribute(this.parent.querySelector('#cherry-ui-add-label'), 'class', `${this._prefix}-label-prefix-flex-${this.uiType} ${this._prefix}-label-focus-${this.uiType}`);
                    } else {
                        this._render.setAttribute(this.parent.querySelector('#cherry-ui-add-label'), 'class', `${this._prefix}-label-flex-${this.uiType}  `);
                    }
                }
            }
        }
    }

    @Input() uiSize: string;
    @Input()
    @HostBinding(`class.cherry-ui-input-group-compact`)
    uiCompact = false;

    constructor(private _elementRef: ElementRef, private _render: Renderer2) {
        this._el = this._elementRef.nativeElement;
        this._render.addClass(this._el, `${this._prefixCls}-group`);
        this.parent = this._render.parentNode(this._el);
    }

    ngAfterViewInit() {
        const inputElement = this._el.getElementsByTagName('input');
        if (this.uiClear) {
            this.elementListen(inputElement);
        }
        if (this._prefixContent || this._suffixContent || this.uiClear || this.contextIconEl) {
            this._render.setAttribute(this._el, 'class', `${this._prefixCls}-affix-wrapper`);
        }
        if ((this._addOnContentBefore || this._addOnContentAfter || this.uiCompact)) {
            this._render.setAttribute(this._el, 'class', `${this._prefixCls}-group`);
        }
        if (this.uiCompact) {
            this._render.addClass(this._el, `${this._prefixCls}-group-compact`);
        }
        if (this.uiLine) {
            this._render.addClass(this._el, `${this._prefixCls}-group-line`);
        }
        if (this.uiLabel && this.uiLabelType === 'row') {
            const labelElement = this._render.createElement('label');
            const text = this._render.createText(this.uiLabel);
            this._render.setAttribute(labelElement, 'id', 'cherry-ui-add-label');
            this._render.appendChild(labelElement, text);
            this._render.insertBefore(this._el.parentNode, labelElement, this._el);
            this.focusListen(inputElement, labelElement);
            this.blurListen(inputElement, labelElement);
        }
        if (this.uiLabel && this.uiLabelType === 'col') {
            const labelElement = this._render.createElement('label');
            const text = this._render.createText(this.uiLabel);
            this._render.setAttribute(labelElement, 'id', 'cherry-ui-add-label');
            this._render.appendChild(labelElement, text);
            this._render.insertBefore(this._el.parentNode, labelElement, this._el);
            const parent = this._el.parentElement;
            this._render.setStyle(labelElement, 'paddingRight', 20 + 'px');
            this._render.setStyle(labelElement, 'lineHeight', 10 + this._el.offsetHeight + 'px');
            this._render.setStyle(parent, 'display', 'flex');
            this.focusListen(inputElement, labelElement);
            this.blurListen(inputElement, labelElement);
        }
        if (this.uiLabel && this.uiLabelType === 'flex') {
            const labelElement = this._render.createElement('label');
            const text = this._render.createText(this.uiLabel);
            this._render.setAttribute(labelElement, 'id', 'cherry-ui-add-label');
            this._render.appendChild(labelElement, text);
            this._render.insertBefore(this._el.parentNode, labelElement, this._el);
            this._render.setAttribute(inputElement[0], 'placeholder', '');
            this.focusListen(inputElement, labelElement, true);
            this.blurListen(inputElement, labelElement, true);
            if (this.uiType !== 'primary') {
                this._render.addClass(labelElement, `${this._prefix}-label-focus-${this.uiType}`);
            }
            if (!this._prefixContent) {
                if (inputElement[0].value) {
                    this._render.addClass(labelElement, `${this._prefix}-label-flex-${this.uiType}`);
                } else if (!inputElement[0].value) {
                    this._render.addClass(labelElement, `${this._prefix}-label-fill-${this.uiType}`);
                }
            }
            if (this._prefixContent) {
                if (inputElement[0].value) {
                    this._render.addClass(labelElement, `${this._prefix}-label-prefix-flex-${this.uiType}`);
                } else if (!inputElement[0].value) {
                    this._render.addClass(labelElement, `${this._prefix}-label-prefix-fill-${this.uiType}`);
                }
            }
        }
        this.contextIconSet();
        this._setClassMap();
    }
    elementListen(inputElement: NodeListOf<HTMLInputElement>) {
        Observable.fromEvent(inputElement, 'focus')
            .subscribe((event: any) => {
                this.clearActive = true;
            });
        Observable.fromEvent(inputElement, 'blur')
            .subscribe((event: any) => {
                if (this.clearMouseOver === false) {
                    this.clearActive = false;
                }
                if (this.clearMouseOver === true) {
                    this.clearActive = true;
                }
            });
    }
    focusListen(inputElement: NodeListOf<HTMLInputElement>, labelElement?: HTMLElement, flex?: Boolean) {
        Observable.fromEvent(inputElement, 'focus')
            .subscribe((event: any) => {
                if (labelElement) {
                    if (flex) {
                        if (!this._prefixContent) {
                            this._render.setAttribute(labelElement, 'class', `${this._prefix}-label-flex-${this.uiType} ${this._prefix}-label-focus-${this.uiType} `);
                        } else if (this._prefixContent) {
                            this._render.setAttribute(labelElement, 'class', `${this._prefix}-label-prefix-flex-${this.uiType} ${this._prefix}-label-focus-${this.uiType}`);
                        }
                    }
                }
            });
    }

    blurListen(inputElement: NodeListOf<HTMLInputElement>, labelElement?: HTMLElement, flex?: Boolean) {
        Observable.fromEvent(inputElement, 'blur')
            .subscribe((event: any) => {
                this.contextIconSet();
                if (labelElement) {
                    if (flex) {
                        if (!inputElement[0].value) {
                            if (!this._prefixContent) {
                                this._render.setAttribute(labelElement, 'class', `${this._prefix}-label-fill-${this.uiType} ${this._prefix}-label-focus-${this.uiType}`);
                            } else if (this._prefixContent) {
                                this._render.setAttribute(labelElement, 'class', `${this._prefix}-label-prefix-fill-${this.uiType} ${this._prefix}-label-focus-${this.uiType}`);
                            }
                        } else {
                            if (!this._prefixContent) {
                                this._render.setAttribute(labelElement, 'class', `${this._prefix}-label-flex-${this.uiType} ${this._prefix}-label-focus-${this.uiType} `);
                            } else if (this._prefixContent) {
                                this._render.setAttribute(labelElement, 'class', `${this._prefix}-label-prefix-flex-${this.uiType} ${this._prefix}-label-focus-${this.uiType}`);
                            }
                        }
                    }

                }
                if (this.uiType === 'primary') {
                    this._render.removeClass(labelElement, `${this._prefix}-label-focus-${this.uiType}`);
                }
            });
    }
    clearContent() {
        const inputElement = this._el.getElementsByTagName('input');
        inputElement[0].value = '';
        inputElement[0].focus();
        this.clearEvent.emit();

    }
    clearOver() {
        this.clearMouseOver = true;

    }
    clearOut() {
        this.clearMouseOver = false;
    }
    _setClassMap(): void {
        this._classList.forEach(_className => {
            this._render.removeClass(this._el, _className);
        });
        this._classList = [
            this.uiLine && this.uiType && `${this._prefixCls}-group-line-${this.uiType}`
        ].filter((item) => {
            return !!item;
        });
        this._classList.forEach(_className => {
            this._render.addClass(this._el, _className);
        });
    }
    contextIconSet() {
        if (this.contextIconEl) {
            switch (this.uiType) {
                case 'success':
                    this._render.setAttribute(this.contextIconEl.nativeElement, 'class', 'fa fa-check-circle cherry-ui-label-success');
                    break;
                case 'warning':
                    this._render.setAttribute(this.contextIconEl.nativeElement, 'class', 'fa fa-exclamation-circle cherry-ui-label-warning');
                    break;
                case 'danger':
                    this._render.setAttribute(this.contextIconEl.nativeElement, 'class', 'fa fa-times-circle cherry-ui-label-danger');
                    break;
                default:
                    this._render.setAttribute(this.contextIconEl.nativeElement, 'class', '');
                    break;
            }
        }
    }

    ngOnInit() {

    }
}
