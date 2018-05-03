import { Component, OnInit, ViewChild, ElementRef, trigger, state, style, transition, animate } from '@angular/core';
import { DashboardService } from '../../pages/dashboard/dashboard.service';


@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [DashboardService],
    animations: [
        trigger('AlertAnimation', [
            state('up', style({
                top: '-100px'
            })),
            state('down', style({
                top: '0px'
            })),
            transition('up <=> down', animate('1000ms cubic-bezier(0.23, 1, 0.32, 1)'))
        ])
    ]
})
export class SearchComponent implements OnInit {

    tableTitle: String = '查询表格';
    highSearch: Boolean = false;
    loading: Boolean = false;
    selectNum: Number = 0;
    priceSum: Number = 0;
    userCode: any;
    alertShow: Boolean = false;
    alertMessage: any;
    alertType: any;
    options = [
        { value: '管理员', label: '管理员' },
        { value: '开发', label: '开发' },
        { value: '测试', label: '测试' },
        { value: '访客', label: '访客', disabled: true }];
    selectedOption = this.options[0];
    rowsPerPageOptions: Array<any> = [5, 10, 20];

    datas: any[];
    cols: any[];
    selection: any;

    @ViewChild('tb') _tb: any;

    constructor(public _dash: DashboardService) { }

    ngOnInit() {
        this.cols = [
            { field: 'id', header: '用户编号' },
            { field: 'name', header: '名称' },
            { field: 'year', header: '成交年份' },
            { field: 'role', header: '操作角色' },
            { field: 'price', header: '成交价' }
        ];
        this.loading = true;
        this._dash.get('assets/data/search.json').subscribe(data => {
            this.datas = data.data;
            this.loading = false;
        });
    }

    showHighSearch() {
        this.highSearch = !this.highSearch;
    }
    onRowSelect() {
        if (this.selection) {
            if (this.selection.length) {
                this.selectNum = this.selection.length;
                this.priceSum = 0;
                this.selection.forEach(el => {
                    this.priceSum += el.price;
                });
            }
        } else {
            this.selectNum = 0;
            this.priceSum = 0;
        }
    }
    search() {
        this.loading = true;
        setTimeout(() => {
            this._tb.filterGlobal(this.userCode, 'contains');
            this.loading = false;
        }, 1000);
    }
    reset() {
        this.loading = true;
        setTimeout(() => {
            this._tb.filterGlobal(null, 'contains');
            this.loading = false;
        }, 1000);
    }
    toolbarClick() {
        this.alertMessage = '暂无此功能';
        this.alertType = 'error';
        this.alertShow = true;
        setTimeout(() => {
            this.alertShow = false;
        }, 2000);
    }
    successClick() {
        this.alertMessage = '功能开发中 敬请期待';
        this.alertType = 'success';
        this.alertShow = true;
        setTimeout(() => {
            this.alertShow = false;
        }, 2000);
    }
}
