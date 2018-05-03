import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree.component';
import { TreeNodeComponent } from './treeNode.component';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CheckboxModule,
        FormsModule
    ],
    declarations: [TreeComponent,
        TreeNodeComponent],
    exports: [TreeComponent,
        TreeNodeComponent]
})
export class TreeModule { }
