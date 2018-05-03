import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordFormComponent } from './passwordForm.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputModule, ButtonModule, GridModule, AlertModule } from './../../../components';
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
    declarations: [PasswordFormComponent],
    exports: [PasswordFormComponent]
})
export class PasswordFormModule { }
