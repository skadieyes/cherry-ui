import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbDemoComponent } from './breadCrumbdemo.component';
import { GridModule } from '../../app/components/grid/grid.module';
import { CardModule } from '../../app/components/card/card.module';
import { CodeModule } from '../../app/components/code/code.module';
import { BreadCrumbModule } from '../../app/components/breadCrumb/breadCrumb.module';

@NgModule({
    imports: [
        CommonModule,
        GridModule,
        CardModule,
        CodeModule,
        BreadCrumbModule
    ],
    declarations: [BreadCrumbDemoComponent]
})
export class BreadCrumbDemoModule { }
