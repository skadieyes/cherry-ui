import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlockMenuBarComponent } from './blockMenuBar.component';
import { BlockMenuBarSubComponent } from './blockMenuBarSub.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [BlockMenuBarComponent, BlockMenuBarSubComponent],
    declarations: [BlockMenuBarComponent, BlockMenuBarSubComponent]
})
export class BlockMenuBarModule {
}
