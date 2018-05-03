import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';
import { CheckboxGroupComponent } from './checkbox-group.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [CheckboxComponent, CheckboxGroupComponent],
  exports: [CheckboxComponent, CheckboxGroupComponent]
})
export class CheckboxModule { }
