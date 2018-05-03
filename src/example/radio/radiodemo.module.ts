import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioDemoComponent } from './radiodemo.component';
import { FormsModule } from '@angular/forms';
import { GridModule, CardModule, CodeModule, RadioModule } from '../../app/components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GridModule,
    CardModule,
    CodeModule,
    RadioModule
  ],
  declarations: [RadioDemoComponent]
})
export class RadioDemoModule { }
