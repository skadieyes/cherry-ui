import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabDemoComponent } from './tabdemo.component';
import { GridModule, CardModule, CodeModule, TabModule, SelectModule } from '../../app/components';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        GridModule,
        CardModule,
        CodeModule,
        TabModule,
        SelectModule,
        FormsModule
    ],
    declarations: [TabDemoComponent]
})
export class TabDemoModule { }
