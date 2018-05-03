import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleValidatorComponent } from './singleValidator.component';
import { InputModule, ButtonModule, CardModule, GridModule } from '../../../components';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        InputModule,
        ButtonModule,
        CardModule,
        GridModule,
        FormsModule
    ],
    declarations: [SingleValidatorComponent],
    exports: [SingleValidatorComponent]
})
export class SingleValidatorModule { }
