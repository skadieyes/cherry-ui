import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GriddemoComponent } from './griddemo.component';
import { GridModule } from '../../app/components/grid/grid.module';
import { CardModule } from '../../app/components/card/card.module';
import { CodeModule } from '../../app/components/code/code.module';
@NgModule({
    imports: [
        CommonModule,
        GridModule,
        CardModule,
        CodeModule
    ],
    declarations: [GriddemoComponent],
    exports: [GriddemoComponent]
})
export class GriddemoModule { }
