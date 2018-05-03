/** code from https://github.com/angular/material2 */

import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { TabComponent } from './tab.component';
import { TabsNavComponent } from './tabs-nav.component';

export interface AnimatedInterface {
  inkBar: boolean;
  tabPane: boolean;
}

export class TabChangeEvent {
  index: number;
  tab: TabComponent;
}

export type uiTabPosition = 'top' | 'bottom' | 'left' | 'right';
export type uiTabPositionMode = 'horizontal' | 'vertical';
export type uiTabType = 'line' | 'card';

@Component({
  selector     : 'cherry-tabset',
  encapsulation: ViewEncapsulation.None,
  styleUrls    : ['./tabset.component.scss'],
  templateUrl: './tabset.component.html'
})
export class TabSetComponent implements AfterContentChecked, OnInit, AfterViewInit {
  _el;
  _classMap;
  _prefixCls = 'cherry-ui-tabs';
  _width;
  _tabPosition: uiTabPosition = 'top';
  _tabPositionMode: uiTabPositionMode = 'horizontal';
  _indexToSelect: number | null = 0;
  _selectedIndex: number | null = null;
  _isViewInit = false;
  _tabs: TabComponent[] = [];
  @Input() uiTabBarExtraTemplate: TemplateRef<void>;
  @ContentChild('uiTabBarExtraContent') uiTabBarExtraContent: TemplateRef<void>;
  @ViewChild('tabNav') _tabNav: TabsNavComponent;
  @ViewChild('tabContent') _tabContent: ElementRef;
  @ViewChild('hostContent') _hostContent: ElementRef;
  @Input() uiAnimated: AnimatedInterface | boolean = true;
  @Input() uiShowPagination = false;
  @Input() uiHide = false;

  @Input()
  set uiSelectedIndex(value: number | null) {
    this._indexToSelect = value;
  }

  get uiSelectedIndex(): number | null {
    return this._selectedIndex;
  }

  @Output()
  get uiSelectedIndexChange(): Observable<number> {
    return this.uiSelectChange.pipe(map(event => event.index));
  }

  @Output() uiSelectChange: EventEmitter<TabChangeEvent> = new EventEmitter<TabChangeEvent>(true);

  @Input() uiSize = 'default';
  _type: uiTabType = 'line';
  tabs: TabComponent[] = [];

  @Input()
  set uiTabPosition(value: uiTabPosition) {
    if (this._tabPosition === value) {
      return;
    }
    this._tabPosition = value;
    if ((this._tabPosition === 'top') || (this._tabPosition === 'bottom')) {
      this._tabPositionMode = 'horizontal';
    } else {
      this._tabPositionMode = 'vertical';
    }
    this._setPosition(value);
    this._setClassMap();
  }

  get uiTabPosition(): uiTabPosition {
    return this._tabPosition;
  }

  @Input()
  set uiType(value: uiTabType) {
    if (this._type === value) {
      return;
    }
    this._type = value;
    if (this._type === 'card') {
      this.uiAnimated = false;
    }
    this._setClassMap();
  }

  get uiType(): uiTabType {
    return this._type;
  }

  _setPosition(value: uiTabPosition): void {
    if (this._isViewInit) {
      if (value === 'bottom') {
        this._renderer.insertBefore(this._hostContent.nativeElement, this._tabContent.nativeElement, this._tabNav._elementRef.nativeElement);
      } else {
        this._renderer.insertBefore(this._hostContent.nativeElement, this._tabNav._elementRef.nativeElement, this._tabContent.nativeElement);
      }
    }

  }

  _setClassMap(): void {
    this._classMap = {
      [this._prefixCls]                          : true,
      [`${this._prefixCls}-vertical`]            : (this._tabPosition === 'left') || (this._tabPosition === 'right'),
      [`${this._prefixCls}-${this._tabPosition}`]: this._tabPosition,
      [`${this._prefixCls}-no-animation`]        : (this.uiAnimated === false) || ((this.uiAnimated as AnimatedInterface).tabPane === false),
      [`${this._prefixCls}-${this._type}`]       : this._type,
      [`${this._prefixCls}-mini`]                : (this.uiSize === 'small')
    };
  }

  clickLabel(index: number): void {
    this.uiSelectedIndex = index;
    this._tabs[ index ].uiClick.emit();
  }

  ngOnInit(): void {
    this._setClassMap();
  }

  ngAfterContentChecked(): void {
    // Clamp the next selected index to the bounds of 0 and the tabs length. Note the `|| 0`, which
    // ensures that values like NaN can't get through and which would otherwise throw the
    // component into an infinite loop (since Math.max(NaN, 0) === NaN).
    const indexToSelect = this._indexToSelect =
      Math.min(this._tabs.length - 1, Math.max(this._indexToSelect || 0, 0));

    // If there is a change in selected index, emit a change event. Should not trigger if
    // the selected index has not yet been initialized.
    if (this._selectedIndex !== indexToSelect && this._selectedIndex != null) {
      this.uiSelectChange.emit(this._createChangeEvent(indexToSelect));
    }

    // Setup the position for each tab and optionally setup an origin on the next selected tab.
    this._tabs.forEach((tab: TabComponent, index: number) => {
      tab.position = index - indexToSelect;
      // If there is already a selected tab, then set up an origin for the next selected tab
      // if it doesn't have one already.
      if (this._selectedIndex != null && tab.position === 0 && !tab.origin) {
        tab.origin = indexToSelect - this._selectedIndex;
      }
    });
    this._selectedIndex = indexToSelect;
  }

  ngAfterViewInit(): void {
    this._isViewInit = true;
    this._setPosition(this._tabPosition);
  }

  private _createChangeEvent(index: number): TabChangeEvent {
    const event = new TabChangeEvent();
    event.index = index;
    if (this._tabs && this._tabs.length) {
      event.tab = this._tabs[ index ];
      this._tabs.forEach((item, i) => {
        if (i !== index) {
          item.uiDeselect.emit();
        }
      });
      event.tab.uiSelect.emit();
    }
    return event;
  }

  get inkBarAnimated(): boolean {
    return (this.uiAnimated === true) || ((this.uiAnimated as AnimatedInterface).inkBar === true);
  }

  get tabPaneAnimated(): boolean {
    return (this.uiAnimated === true) || ((this.uiAnimated as AnimatedInterface).tabPane === true);
  }

  constructor(private _renderer: Renderer2) {
  }

}
