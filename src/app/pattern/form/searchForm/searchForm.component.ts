import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cherry-searchform',
    templateUrl: './searchForm.component.html',
    styleUrls: ['./searchForm.component.scss']
})
export class SearchFormComponent implements OnInit {

    tableTitle: String = '查询表格';
    highSearch: Boolean = false;
    options = [
        { value: '管理员', label: '管理员' },
        { value: '开发', label: '开发' },
        { value: '测试', label: '测试' },
        { value: '访客', label: '访客', disabled: true }];
    selectedOption = this.options[0];

    constructor() { }

    ngOnInit() {
    }

    showHighSearch() {
        this.highSearch = !this.highSearch;
    }
}
