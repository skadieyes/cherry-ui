import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadMenuBarDemoComponent } from './headmenubardemo.component';
import { LayoutModule } from '../../../app/components/layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule
  ],
  declarations: [HeadMenuBarDemoComponent],
  exports: [HeadMenuBarDemoComponent]
})
export class HeadMenuBarDemoModule { }
