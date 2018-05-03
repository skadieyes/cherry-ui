import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { CardModule, GridModule, InputModule, SelectModule, ButtonModule, TooltipModule, TableModule, AlertModule } from '../../components';
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
        AlertModule
    ],
    declarations: [SearchComponent]
})
export class SearchModule { }
