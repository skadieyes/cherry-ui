import {
    Component,
    HostBinding,
    ViewEncapsulation,
    Renderer2,
    ElementRef,
    Input,
    OnInit,
    HostListener
} from '@angular/core';
import calculateNodeHeight from '../common/calcuHiehgt';
export interface AutoSizeType {
    minRows?: number;
    maxRows?: number;
}
@Component({
    selector: '[cherry-input]',
    encapsulation: ViewEncapsulation.None,
    template: ``,
    styleUrls: [
        './input.component.scss'
    ]
})

export class InputDirectiveComponent implements OnInit {
    size = 'default';
    nativeElement: HTMLElement;
    _el: HTMLElement;
    _classList: Array<string> = [];
    _readonly = false;
    _prefixCls = 'cherry-ui-input';
    _autosize: boolean | AutoSizeType = false;

    @HostBinding(`class.cherry-ui-input-disabled`) _disabled = false;

    @HostBinding(`class.cherry-ui-input`) _uiInput = true;

    @Input()
    get uiSize(): string {
        return this.size;
    }

    set uiSize(value: string) {
        this.size = value;
        this._setClassMap();
    }

    @Input()
    get uiDisabled(): boolean {
        return this._disabled;
    }

    set uiDisabled(value: boolean) {
        if (value) {
            this._render.setAttribute(this.nativeElement, 'disabled', '');
        } else {
            this._render.removeAttribute(this.nativeElement, 'disabled');
        }
        this._disabled = value;
    }

    @Input()
    get uiReadonly(): boolean {
        return this._readonly;
    }

    set uiReadonly(value: boolean) {
        if (value) {
            this._render.setAttribute(this.nativeElement, 'readonly', '');
        } else {
            this._render.removeAttribute(this.nativeElement, 'readonly');
        }
        this._readonly = value;
    }

    @Input()
    get uiAutosize() {
        return this._autosize;
    }

    set uiAutosize(value: string | boolean | AutoSizeType) {
        if (typeof value === 'string') {
            this._autosize = true;
        } else {
            this._autosize = <boolean | AutoSizeType>value;
        }

        if (this._autosize) {
            this._render.setAttribute(this.nativeElement, 'autosize', '');
        } else {
            this._render.removeAttribute(this.nativeElement, 'autosize');
        }
    }

    resizeTextarea() {
        const textAreaRef = this._elementRef.nativeElement;
        // eliminate jitter
        this.nativeElement.style.height = 'auto';
        const maxRows = this.uiAutosize ? (this.uiAutosize as AutoSizeType).maxRows || null : null;
        const minRows = this.uiAutosize ? (this.uiAutosize as AutoSizeType).minRows || null : null;
        const textareaStyles = calculateNodeHeight(this.nativeElement, false, minRows, maxRows);
        this.nativeElement.style.height = `${textareaStyles.height}px`;
        this.nativeElement.style.overflowY = textareaStyles.overflowY;
    }

    _setClassMap() {
        this._classList.forEach(_className => {
            this._render.removeClass(this.nativeElement, _className);
        });
        this._classList = [
            this.uiSize && `${this._prefixCls}-${this.uiSize}`
        ].filter((item) => {
            return !!item;
        });
        this._classList.forEach(_className => {
            this._render.addClass(this.nativeElement, _className);
        });
    }

    @HostListener('focus', ['$event'])
    onFocus(e: any) {
        if (this._elementRef.nativeElement.type === 'textarea' && this.uiAutosize) {
            this.resizeTextarea();
        }
    }

    @HostListener('blur', ['$event'])
    onBlur(e: any) {
        if (this._elementRef.nativeElement.type === 'textarea' && this.uiAutosize) {
            this.resizeTextarea();
        }
    }

    @HostListener('keyup', ['$event'])
    onKeyup(e: any) {
        if (this._elementRef.nativeElement.type === 'textarea' && this.uiAutosize) {
            this.resizeTextarea();
        }
    }

    ngOnInit() {
        if (this._elementRef.nativeElement.type === 'textarea' && this.uiAutosize) {
            setTimeout(() => this.resizeTextarea(), 0);
        } else if (this._elementRef.nativeElement.type === 'textarea') {
            this.nativeElement.style.height = 'auto';
        }
    }

    constructor(private _elementRef: ElementRef,
        private _render: Renderer2) {
        this.nativeElement = this._elementRef.nativeElement;

    }
}
