import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { RouterModule } from '@angular/router';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
    imports: [CommonModule, RouterModule, TooltipModule],
    declarations: [DropdownComponent],
    exports: [DropdownComponent]
})

export class DropdownModule {
}

