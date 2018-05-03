import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioComponent } from './radio.component';
import { RadioGroupComponent } from './radio-group.component';
import { RadioButtonComponent } from './radio-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [RadioComponent, RadioButtonComponent, RadioGroupComponent],
  exports: [RadioComponent, RadioButtonComponent, RadioGroupComponent]
})
export class RadioModule { }
