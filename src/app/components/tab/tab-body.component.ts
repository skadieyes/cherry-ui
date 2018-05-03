import {
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector     : 'cherry-tab-body',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-template [ngTemplateOutlet]="content"></ng-template>
  `,
})
export class TabBodyComponent {
  @Input() content: TemplateRef<void>;
}
