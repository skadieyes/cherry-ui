import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from './searchForm.component';
import { CardModule, GridModule, InputModule, SelectModule, ButtonModule } from '../../../components';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        CardModule,
        GridModule,
        InputModule,
        SelectModule,
        FormsModule,
        ButtonModule
    ],
    declarations: [SearchFormComponent],
    exports: [SearchFormComponent]
})
export class SearchFormModule { }
