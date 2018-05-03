import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalTabMenuComponent } from './verticalTabMenu.component';
import { MatRippleModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, MatRippleModule, RouterModule],
    exports: [VerticalTabMenuComponent, RouterModule],
    declarations: [VerticalTabMenuComponent]
})
export class VerticalTabMenuModule {
}
