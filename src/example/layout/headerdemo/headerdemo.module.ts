import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../../../app/components/layout/layout.module';
import { HeaderDemoComponent } from './headerdemo.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutModule
    ],
    declarations: [HeaderDemoComponent],
    exports : [HeaderDemoComponent]
})
export class HeaderDemoModule { }
