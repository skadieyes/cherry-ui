import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeDemoComponent } from './treedemo.component';
import { GridModule, CardModule, CodeModule, TreeModule, ButtonModule } from '../../app/components';
@NgModule({
  imports: [
    CommonModule,
    GridModule,
    CardModule,
    CodeModule,
    TreeModule,
    ButtonModule
  ],
  declarations: [TreeDemoComponent]
})
export class TreeDemoModule { }
