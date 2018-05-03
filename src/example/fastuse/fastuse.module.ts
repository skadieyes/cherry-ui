import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastuseComponent } from './fastuse.component';
import { CodeModule } from '../../app/components/code/code.module';
@NgModule({
  imports: [
    CommonModule,
    CodeModule
  ],
  declarations: [FastuseComponent]
})
export class FastuseModule {

}

