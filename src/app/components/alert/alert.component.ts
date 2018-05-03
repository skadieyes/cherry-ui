import {
    Component,
    ViewEncapsulation,
    Input,
    Output,
    EventEmitter, OnChanges, OnInit
} from '@angular/core';
import {
    animate,
    AnimationTriggerMetadata,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';

@Component({
    selector: 'cherry-alert',
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('fadeAnimation', [
            state('void', style({ opacity: 0 })),
            state('true', style({ opacity: 1 })),
            state('false', style({ opacity: 0 })),
            transition('* => true', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
            transition('* => void', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
        ])
    ],
    templateUrl: './alert.component.html',
    styleUrls: [
        './alert.component.scss'
    ]
})

export class AlertComponent implements OnChanges {
    _display = true;
    _prefixCls = 'cherry-ui-alert';
    @Input() uiType = 'info';
    @Input() uiBanner = false;
    @Input() uiCloseable = false;
    @Input() uiDescription: string;
    @Input() uiShowIcon = false;
    @Input() uiCloseText: string;
    @Input() uiMessage: string;
    @Output() uiOnClose: EventEmitter<boolean> = new EventEmitter();
    _classMap = {
        [`${this._prefixCls}`]: true,
        [`${this._prefixCls}-${this.uiType}`]: true,
        [`${this._prefixCls}-no-icon`]: !this.uiShowIcon,
        [`${this._prefixCls}-banner`]: this.uiBanner,
        [`${this._prefixCls}-with-description`]: !!this.uiDescription
    };

    closeAlert(): void {
        this._display = false;
        this.uiOnClose.emit(true);
    }

    ngOnChanges() {
        this._classMap = {
            [`${this._prefixCls}`]: true,
            [`${this._prefixCls}-${this.uiType}`]: true,
            [`${this._prefixCls}-no-icon`]: !this.uiShowIcon,
            [`${this._prefixCls}-banner`]: this.uiBanner,
            [`${this._prefixCls}-with-description`]: !!this.uiDescription
        };
    }

    constructor() {
    }

}
