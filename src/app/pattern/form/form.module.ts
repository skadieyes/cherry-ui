import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { PasswordFormModule } from './passwordForm/passwordForm.module';
import { CardModule, GridModule} from '../../components';
import { LoginFormModule } from './loginForm/loginForm.module';
import { SingleValidatorModule } from './singleValidator/singleValidator.module';
import { SearchFormModule } from './searchForm/searchForm.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    GridModule,
    PasswordFormModule,
    LoginFormModule,
    SingleValidatorModule,
    SearchFormModule
  ],
  declarations: [FormComponent]
})
export class FormModule { }
