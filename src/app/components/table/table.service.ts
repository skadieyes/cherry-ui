
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { SortMeta } from '../common/sortmeta';
import { FilterMetadata } from '../common/filtermetadata';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TableService {

    private sortSource = new Subject<SortMeta|SortMeta[]>();
    private selectionSource = new Subject();
    private contextMenuSource = new Subject<any>();
    private valueSource = new Subject<any>();
    private totalRecordsSource = new Subject<any>();

    sortSource$ = this.sortSource.asObservable();
    selectionSource$ = this.selectionSource.asObservable();
    contextMenuSource$ = this.contextMenuSource.asObservable();
    valueSource$ = this.valueSource.asObservable();
    totalRecordsSource$ = this.totalRecordsSource.asObservable();

    onSort(sortMeta: SortMeta|SortMeta[]) {
        this.sortSource.next(sortMeta);
    }

    onSelectionChange() {
        this.selectionSource.next();
    }

    onContextMenu(data: any) {
        this.contextMenuSource.next(data);
    }

    onValueChange(value: any) {
        this.valueSource.next(value);
    }

    onTotalRecordsChange(value: Number) {
        this.totalRecordsSource.next(value);
    }
}
