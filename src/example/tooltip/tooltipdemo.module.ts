import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDemoComponent } from './tooltipdemo.component';
import { GridModule } from '../../app/components/grid/grid.module';
import { CardModule } from '../../app/components/card/card.module';
import { CodeModule } from '../../app/components/code/code.module';
import { TooltipModule } from '../../app/components/tooltip/tooltip.module';

@NgModule({
  imports: [
    CommonModule,
    GridModule,
    CardModule,
    CodeModule,
    TooltipModule
  ],
  declarations: [TooltipDemoComponent],
  exports: [TooltipDemoComponent]
})
export class TooltipDemoModule { }
