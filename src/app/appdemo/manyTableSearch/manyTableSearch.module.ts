import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManyTableSearchComponent } from './manyTableSearch.component';
import { CardModule, TabModule, GridModule, InputModule, SelectModule, ButtonModule, TooltipModule, TableModule, AlertModule } from '../../components';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    CardModule,
    GridModule,
    InputModule,
    SelectModule,
    FormsModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    AlertModule,
    TabModule
  ],
  declarations: [ManyTableSearchComponent]
})
export class ManyTableSearchModule { }
