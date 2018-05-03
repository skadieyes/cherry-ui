import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockMenuComponent } from './blockMenu.component';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material';

@NgModule({
    imports: [CommonModule, RouterModule, MatRippleModule],
    exports: [BlockMenuComponent],
    declarations: [BlockMenuComponent]
})
export class BlockMenuModule {
 }
