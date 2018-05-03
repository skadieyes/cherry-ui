import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconMenuDemoComponent } from './iconmenudemo';
import { IconMenuModule } from '../../app/components/iconMenu/iconMenu.module';

@NgModule({
    imports: [
        CommonModule,
        IconMenuModule
    ],
    declarations: [
        IconMenuDemoComponent
    ],
    exports: [
        IconMenuDemoComponent
    ]
})
export class IconMenuDemoModule { }
