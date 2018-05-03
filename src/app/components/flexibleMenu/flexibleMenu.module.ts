import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material';
import { FlexibleMenuComponent } from './flexibleMenu.component';
import { FlexibleMenuSubComponent } from './flexibleMenuSub.component';

@NgModule({
    imports: [CommonModule, RouterModule, MatRippleModule],
    exports: [FlexibleMenuComponent, FlexibleMenuSubComponent],
    declarations: [FlexibleMenuComponent, FlexibleMenuSubComponent]
})
export class FlexibleMenuModule {
}
