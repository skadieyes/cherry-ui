import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { ButtonGroupComponent } from './button-group.component';

@NgModule({
    imports: [CommonModule],
    exports: [ButtonComponent, ButtonGroupComponent],
    declarations: [ButtonComponent, ButtonGroupComponent]
})
export class ButtonModule { }
