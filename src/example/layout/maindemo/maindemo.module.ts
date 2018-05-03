import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDemoComponent } from './maindemo.component';
import { LayoutModule } from '../../../app/components/layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule
  ],
  declarations: [MainDemoComponent],
  exports: [MainDemoComponent]
})
export class MainDemoModule { }
