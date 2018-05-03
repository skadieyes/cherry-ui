import {
    Component,
    ViewEncapsulation,
    Input,
    TemplateRef,
    Output,
    EventEmitter,
    AfterViewInit,
    ChangeDetectorRef,
    ContentChild,
    ViewChild
} from '@angular/core';
import {
    animate,
    AnimationTriggerMetadata,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {
    AnimationEvent,
} from '@angular/animations';
import {
    OverlayOrigin,
    ConnectionPositionPair,
    ConnectedOverlayDirective
} from '@angular/cdk/overlay';
import { POSITION_MAP, DEFAULT_4_POSITIONS } from './../common/overlay';
@Component({
    selector: 'cherry-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    animations: [
        trigger('fadeAnimation', [
            state('void', style({ opacity: 0 })),
            state('true', style({ opacity: 1 })),
            state('false', style({ opacity: 0 })),
            transition('* => true', animate('0ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
            transition('* => void', animate('0ms cubic-bezier(0.4, 0.0, 1, 1)')),
        ])
    ]
})
export class TooltipComponent {
    @Input() uiTitle: string;
    @Input() uiOverlayClassName = '';
    @Input() uiOverlayStyle = {};
    @Output() uiVisibleChange: EventEmitter<any> = new EventEmitter();
    @ContentChild('uiTemplate') uiTemplate: TemplateRef<any>;
    @ViewChild('overlay') overlay: ConnectedOverlayDirective;

    overlayOrigin: OverlayOrigin;

    @Input()
    set uiVisible(value) {
        if (this.visibleSource.value !== value) {
            this.visibleSource.next(value);
            this.uiVisibleChange.emit(value);
        }
    }

    get uiVisible() {
        return this.visibleSource.value;
    }

    visibleSource = new BehaviorSubject<boolean>(false);
    visible$ = this.visibleSource.asObservable();

    @Input()
    set uiTrigger(value) {
        this._trigger = value;
        this._hasBackdrop = this._trigger === 'click';
    }
    get uiTrigger() {
        return this._trigger;
    }

    _prefix = 'cherry-ui-tooltip-placement';
    _positions: ConnectionPositionPair[] = [...DEFAULT_4_POSITIONS];
    _classMap = {};
    _placement = 'top';
    _trigger = 'hover';
    _hasBackdrop = false;

    @Input()
    get uiPlacement() {
        return this._placement;
    }

    set uiPlacement(value: any) {
        if (value !== this._placement) {
            this._placement = value;
            this._positions.unshift(POSITION_MAP[this.uiPlacement] as ConnectionPositionPair);
        }
    }

    // Manually force updating current overlay's position
    updatePosition() {
        if (this.overlay && this.overlay.overlayRef) {
            this.overlay.overlayRef.updatePosition();
        }
    }

    onPositionChange($event: any) {
        for (const key in POSITION_MAP) {
            if (JSON.stringify($event.connectionPair) === JSON.stringify(POSITION_MAP[key])) {
                this.uiPlacement = key;
                break;
            }
        }
        this.setClassMap();
        /** TODO may cause performance problem */
        this._cdr.detectChanges();
    }

    show(): void {
        this.uiVisible = true;
    }

    hide(): void {
        this.uiVisible = false;
    }
    tooltipLeave() {
        return false;
    }
    tooltipHover() {
        return false;
    }
    _afterVisibilityAnimation(e: AnimationEvent): void {
        if (e.toState === 'false' && !this.uiVisible) {
            this.uiVisibleChange.emit(false);
        }
        if (e.toState === 'true' && this.uiVisible) {
            this.uiVisibleChange.emit(true);
        }
    }

    setClassMap() {
        this._classMap = {
            [this.uiOverlayClassName]: true,
            [`${this._prefix}-${this._placement}`]: true
        };
    }

    setOverlayOrigin(origin: OverlayOrigin) {
        this.overlayOrigin = origin;
    }

    constructor(private _cdr: ChangeDetectorRef) { }
}
