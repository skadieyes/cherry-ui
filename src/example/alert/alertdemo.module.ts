import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertdemoComponent } from './alertdemo.component';
import { GridModule } from '../../app/components/grid/grid.module';
import { CardModule } from '../../app/components/card/card.module';
import { CodeModule } from '../../app/components/code/code.module';
import { AlertModule } from '../../app/components/alert/alert.module';

@NgModule({
    imports: [
        CommonModule,
        GridModule,
        CardModule,
        CodeModule,
        AlertModule
    ],
    declarations: [AlertdemoComponent],
    exports: [AlertdemoComponent]
})
export class AlertdemoModule { }
