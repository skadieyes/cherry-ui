import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDemoComponent } from './tabledemo.component';
import { GridModule, CardModule, CodeModule, TableModule, InputModule, RadioModule, CheckboxModule, SelectModule, ButtonModule, TabModule } from '../../app/components';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        GridModule,
        CardModule,
        CodeModule,
        FormsModule,
        TableModule,
        RadioModule,
        CheckboxModule,
        InputModule,
        SelectModule,
        ButtonModule,
        TabModule
    ],
    declarations: [TableDemoComponent]
})
export class TableDemoModule { }
