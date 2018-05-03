import {
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TabSetComponent } from './tabset.component';

@Component({
  selector: 'cherry-tab',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class TabComponent implements OnDestroy, OnInit {
  private disabled = false;

  position: number | null = null;
  origin: number | null = null;

  @HostBinding('class.cherry-ui-tabs-tabpane') true;

  @Input()
  set uiDisabled(value: boolean) {
    this.disabled = this.toBoolean(value);
  }

  get uiDisabled(): boolean {
    return this.disabled;
  }

  @Output() uiSelect = new EventEmitter();
  @Output() uiClick = new EventEmitter();
  @Output() uiDeselect = new EventEmitter();
  @ContentChild('uiTabHeading') _tabHeading: TemplateRef<void>;
  @ViewChild(TemplateRef) _content: TemplateRef<void>;

  get content(): TemplateRef<void> | null {
    return this._content;
  }

  constructor(private _tabSetComponent: TabSetComponent) {
  }

  ngOnInit(): void {
    this._tabSetComponent._tabs.push(this);
  }

  ngOnDestroy(): void {
    this._tabSetComponent._tabs.splice(this._tabSetComponent._tabs.indexOf(this), 1);
  }
  toBoolean(value: boolean | string): boolean {
    return value === '' || (value && value !== 'false');
  }

}
