import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockMenuDemoComponent } from './blockmenudemo';
import { BlockMenuModule } from '../../app/components/blockMenu/blockMenu.module';

@NgModule({
    imports: [
        CommonModule,
        BlockMenuModule,
    ],
    declarations: [
        BlockMenuDemoComponent
    ],
    exports: [
        BlockMenuDemoComponent
    ]
})
export class BlockMenuDemoModule { }
