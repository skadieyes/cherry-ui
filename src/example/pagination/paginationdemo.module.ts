import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationDemoComponent } from './paginationdemo.component';
import { GridModule, CardModule, CodeModule, PaginationModule } from '../../app/components';
@NgModule({
    imports: [
        CommonModule,
        GridModule,
        CardModule,
        CodeModule,
        PaginationModule
    ],
    declarations: [PaginationDemoComponent]
})
export class PaginationDemoModule { }
