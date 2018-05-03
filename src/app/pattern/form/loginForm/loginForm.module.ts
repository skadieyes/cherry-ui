import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './loginForm.component';
import { InputModule, ButtonModule, CardModule, GridModule } from '../../../components';
@NgModule({
    imports: [
        CommonModule,
        InputModule,
        ButtonModule,
        CardModule,
        GridModule
    ],
    declarations: [LoginFormComponent],
    exports: [LoginFormComponent]
})
export class LoginFormModule { }
