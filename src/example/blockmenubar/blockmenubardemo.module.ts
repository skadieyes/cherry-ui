import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockMenuBarDemoComponent } from './blockmenubardemo';
import { BlockMenuBarModule } from '../../app/components/blockMenuBar/blockMenuBar.module';

@NgModule({
    imports: [
        CommonModule,
        BlockMenuBarModule,
    ],
    declarations: [
        BlockMenuBarDemoComponent
    ],
    exports: [
        BlockMenuBarDemoComponent
    ]
})
export class BlockMenuBarDemoModule { }
