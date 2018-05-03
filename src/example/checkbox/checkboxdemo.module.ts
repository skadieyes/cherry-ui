import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxDemoComponent } from './checkboxdemo.component';
import { FormsModule } from '@angular/forms';
import { GridModule, CardModule, CodeModule, CheckboxModule } from '../../app/components';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GridModule,
    CardModule,
    CodeModule,
    CheckboxModule
  ],
  declarations: [CheckboxDemoComponent]
})
export class CheckboxDemoModule { }
