import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDemoComponent } from './inputdemo.component';
import { InputModule } from '../../app/components/input/input.module';
import { GridModule } from '../../app/components/grid/grid.module';
import { CardModule } from '../../app/components/card/card.module';
import { CodeModule } from '../../app/components/code/code.module';

@NgModule({
    imports: [
        CommonModule,
        InputModule,
        GridModule,
        CardModule,
        CodeModule
    ],
    declarations: [InputDemoComponent]
})
export class InputDemoModule {
}

