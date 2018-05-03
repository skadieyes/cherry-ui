import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionMenuComponent } from './accordionMenu.component';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material';
import { AccordionMenuSubComponent } from './accordionMenuSub.component';

@NgModule({
    imports: [CommonModule, RouterModule, MatRippleModule],
    exports: [AccordionMenuComponent, AccordionMenuSubComponent],
    declarations: [AccordionMenuComponent, AccordionMenuSubComponent]
})
export class AccordionMenuModule { }
