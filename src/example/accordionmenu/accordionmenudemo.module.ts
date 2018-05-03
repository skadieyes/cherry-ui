import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionMenuModule } from '../../app/components/accordionMenu/accordionMenu.module';
import { AccordionMenuDemoComponent } from './accordionmenudemo';

@NgModule({
    imports: [
        CommonModule,
        AccordionMenuModule
    ],
    declarations: [
        AccordionMenuDemoComponent
    ],
    exports: [
        AccordionMenuDemoComponent
    ]
})
export class AccordionMenuDemoModule { }
