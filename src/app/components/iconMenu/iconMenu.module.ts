import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconMenuComponent } from './iconMenu.component';
import { IconMenuSubComponent } from './iconMenuSub.component';
import { RouterModule } from '@angular/router';
import { TooltipModule } from '../tooltip/tooltip.module';
@NgModule({
    imports: [CommonModule, RouterModule, TooltipModule],
    exports: [IconMenuComponent],
    declarations: [IconMenuComponent, IconMenuSubComponent]
})
export class IconMenuModule { }
