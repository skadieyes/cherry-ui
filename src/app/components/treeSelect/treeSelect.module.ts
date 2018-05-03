import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { TreeSelectComponent } from './treeSelect.component';
import { TreeModule } from '../tree/tree.module';
@NgModule({
  imports: [
    CommonModule, FormsModule, OverlayModule, TreeModule
  ],
  declarations: [TreeSelectComponent],
  exports: [TreeSelectComponent]
})
export class TreeSelectModule { }
