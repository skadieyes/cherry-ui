import { NgModule } from '@angular/core';
import { RowComponent } from './row.component';
import { ColDirective } from './col.directive';
import { ColComponent } from './col.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ RowComponent, ColDirective, ColComponent ],
  exports     : [ RowComponent, ColDirective, ColComponent ],
  imports     : [ CommonModule ]
})

export class GridModule {
}
