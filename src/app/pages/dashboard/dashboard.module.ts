import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { LayoutModule } from '../../components';
import { ArchitectureDemoModule } from '../../../example/architecture/architecturedemo.module';
import { RouterModule } from '@angular/router';
import { GridModule } from '../../components/grid/grid.module';
import { GriddemoModule } from '../../../example/grid/griddemo.module';
import { CardModule } from '../../components/card/card.module';
import { ComponentsModule } from '../../../example/components.module';
import { PatternModule } from '../../pattern/pattern.module';
import { AppdemoModule } from '../../appdemo/appdemo.module';
import { SelectModule } from '../../components';
import { FormsModule } from '@angular/forms';
import { BreadCrumbModule } from '../../components/breadCrumb/breadCrumb.module';

@NgModule( {
    imports: [
        CommonModule,
        DashboardRoutes,
        LayoutModule,
        ArchitectureDemoModule,
        RouterModule,
        GridModule,
        GriddemoModule,
        CardModule,
        ComponentsModule,
        PatternModule,
        AppdemoModule,
        SelectModule,
        FormsModule,
        BreadCrumbModule
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule { }
