import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { KeywordPipe } from '../common/keyword.pipe';
import { SearchSubComponent } from './searchSub.component';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule],
    exports: [SearchComponent, KeywordPipe],
    declarations: [SearchComponent, SearchSubComponent, KeywordPipe]
})
export class SearchModule { }
