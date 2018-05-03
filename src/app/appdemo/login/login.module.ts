import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginFormModule } from './loginForm/loginForm.module';
import { PasswordFormModule } from './passwordForm/passwordForm.module';
import { ButtonModule } from '../../components/button/button.module';

@NgModule({
    imports: [
        CommonModule,
        LoginFormModule,
        PasswordFormModule,
        ButtonModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
