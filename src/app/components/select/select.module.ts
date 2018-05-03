import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { SelectComponent } from './select.component';
import { OptionComponent } from './option.component';
import { OptionPipe } from './option.pipe';

@NgModule({
  imports: [
    CommonModule, FormsModule, OverlayModule
  ],
  declarations: [OptionPipe, OptionComponent, SelectComponent],
  exports: [OptionPipe, OptionComponent, SelectComponent]
})
export class SelectModule { }
