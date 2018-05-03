import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordChangeComponent } from './passwordChange.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputModule, ButtonModule, GridModule, AlertModule } from './../../components';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputModule,
        ButtonModule,
        GridModule,
        AlertModule
    ],
    declarations: [PasswordChangeComponent],
    exports: [PasswordChangeComponent]
})
export class PasswordChangeModule { }
