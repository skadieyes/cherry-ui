import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarddemoComponent } from './carddemo.component';
import { CardModule } from '../../app/components/card/card.module';
import { CodeModule } from '../../app/components/code/code.module';

@NgModule({
    imports: [
        CommonModule,
        CardModule,
        CodeModule
    ],
    declarations: [CarddemoComponent]
})
export class CarddemoModule {

}


