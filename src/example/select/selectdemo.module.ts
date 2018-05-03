import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDemoComponent } from './selectdemo.component';
import { GridModule, CardModule, CodeModule, SelectModule } from '../../app/components';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        GridModule,
        CardModule,
        CodeModule,
        SelectModule
    ],
    declarations: [SelectDemoComponent]
})
export class SelectDemoModule { }
