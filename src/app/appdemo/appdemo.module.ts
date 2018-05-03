import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppdemoComponent } from './appdemo.component';
import { PasswordChangeModule } from './passwordChange/passwordChange.module';
import { LoginModule } from './login/login.module';
import { SearchModule } from './search/search.module';
import { LinkageSearchModule } from './linkageSearch/linkageSearch.module';
import { ManyTableSearchModule } from './manyTableSearch/manyTableSearch.module';

@NgModule({
  imports: [
    CommonModule,
    PasswordChangeModule,
    LoginModule,
    SearchModule,
    LinkageSearchModule,
    ManyTableSearchModule
  ],
  declarations: [AppdemoComponent]
})
export class AppdemoModule { }
