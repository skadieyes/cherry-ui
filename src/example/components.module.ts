import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { MainDemoModule } from './layout/maindemo/maindemo.module';
import { HeadMenuBarDemoModule } from './layout/headmenubardemo/headmenubardemo.module';
import { HeaderDemoModule } from './layout/headerdemo/headerdemo.module';
import { LayoutModule } from '../app/components/layout/layout.module';
import { CarddemoModule } from './card/carddemo.module';
import { CarddemoComponent } from './card/carddemo.component';
import { FastuseModule } from './fastuse/fastuse.module';
import { ButtonDemoModule } from './button/buttondemo.module';
import { InputDemoModule } from './input/inputdemo.module';
import { AlertdemoModule } from './alert/alertdemo.module';
import { BreadCrumbDemoModule } from './breadCrumb/breadCrumbdemo.module';
import { TooltipDemoModule } from './tooltip/tooltipdemo.module';
import { SelectDemoModule } from './select/selectdemo.module';
import { CheckboxDemoModule } from './checkbox/checkboxdemo.module';
import { RadioDemoModule } from './radio/radiodemo.module';
import { TreeDemoModule } from './tree/treedemo.module';
import { TreeSelectDemoModule } from './treeSelect/treeSelectdemo.module';
import { TabDemoModule } from './tab/tabdemo.module';
import { TableDemoModule } from './table/tabledemo.module';
import { PaginationDemoModule } from './pagination/paginationdemo.module';

@NgModule({
    imports: [
        CommonModule,
        MainDemoModule,
        HeadMenuBarDemoModule,
        HeaderDemoModule,
        LayoutModule,
        CarddemoModule,
        FastuseModule,
        ButtonDemoModule,
        InputDemoModule,
        AlertdemoModule,
        BreadCrumbDemoModule,
        TooltipDemoModule,
        SelectDemoModule,
        CheckboxDemoModule,
        RadioDemoModule,
        TreeDemoModule,
        TreeSelectDemoModule,
        TabDemoModule,
        TableDemoModule,
        PaginationDemoModule
    ],
    declarations: [ComponentsComponent]
})
export class ComponentsModule { }
