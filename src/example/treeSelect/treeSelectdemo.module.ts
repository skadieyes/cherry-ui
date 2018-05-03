import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeSelectDemoComponent } from './treeSelectdemo.component';
import { GridModule, CardModule, CodeModule, TreeSelectModule } from '../../app/components';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GridModule,
    CardModule,
    CodeModule,
    TreeSelectModule
  ],
  declarations: [TreeSelectDemoComponent]
})
export class TreeSelectDemoModule { }
