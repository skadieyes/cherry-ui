import { Injector, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class SearchService {

    public search_result: object;
    public result_changes: Subject<any> = new Subject<any>();

    constructor() {
    }

    searchResult(result: object) {
        this.search_result = result;
        this.result_changes.next(this.search_result);
    }

    parentSet(data: any) {
        for (const i in data) {
            if (data) {
                data[i].parents = [];
                data[i].parents.push(data[i]);
                if (data[i].items) {
                    this.parentItemSet(data[i], data[i].parents);
                }
            }
        }

    }

    parentItemSet(data: any, parent: any) {
        for (const i in data) {
            if (i === 'items') {
                const item = data[i];
                for (const item_i in item) {
                    if (item) {
                        const parentArr = this.parentArr(parent, item[item_i]);
                        item[item_i].parents = parentArr;
                        if (item[item_i].items) {
                            this.parentItemSet(item[item_i], item[item_i].parents);
                        }
                    }
                }
            }
        }

    }

    parentArr(parent: any, item: any) {
        const parentArr = [];
        for (let parent_i = 0; parent_i < parent.length; parent_i++) {
            parentArr.push(parent[parent_i]);
        }
        parentArr.push(item);
        return parentArr;
    }

}
