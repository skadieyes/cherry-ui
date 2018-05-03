import {
  Directive
} from '@angular/core';
import { ColComponent } from './col.component';

@Directive({
  selector: '[cherry-col]'
})

export class ColDirective extends ColComponent {
}
