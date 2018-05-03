import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDemoComponent } from './buttondemo.component';
import { ButtonModule } from './../../app/components/button/button.module';
import { CardModule } from '../../app/components/card/card.module';
import { CodeModule } from '../../app/components/code/code.module';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    CodeModule
  ],
  declarations: [ButtonDemoComponent]
})
export class ButtonDemoModule { }
