import { NgModule } from '@angular/core';
import { InputDirectiveComponent } from './input.directive';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputGroupComponent } from './inputgroup.component';


@NgModule({
  declarations: [ InputDirectiveComponent, InputGroupComponent ],
  exports     : [ InputDirectiveComponent, InputGroupComponent ],
  imports     : [ CommonModule, FormsModule ]
})

export class InputModule {
}
