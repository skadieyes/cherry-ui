import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { SelectModule } from '../select/select.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../common/shared';

@NgModule({
    imports: [CommonModule, SelectModule, FormsModule, SharedModule],
    exports: [PaginationComponent, SelectModule, FormsModule, SharedModule],
    declarations: [PaginationComponent]
})
export class PaginationModule { }
