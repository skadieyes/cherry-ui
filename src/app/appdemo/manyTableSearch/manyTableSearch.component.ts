import { Component, OnInit, ViewChild, ElementRef, trigger, state, style, transition, animate, Renderer2 } from '@angular/core';
import { DashboardService } from '../../pages/dashboard/dashboard.service';
@Component({
    selector: 'cherry-manytablesearch',
    templateUrl: './manyTableSearch.component.html',
    styleUrls: ['./manyTableSearch.component.scss'],
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
export class ManyTableSearchComponent implements OnInit {

    tableTitle: String = '主表格';
    highSearch: Boolean = false;
    loading: Boolean = false;
    userCode: any;
    alertShow: Boolean = false;
    alertMessage: any;
    alertType: any;
    _mousedown: Boolean = false;
    _percent: any;
    _mainHover: Boolean = false;
    _secondHover: Boolean = false;
    _secondBottomBorder: Boolean = true;
    _mainTopBorder: Boolean = false;
    _secondTopBorder: Boolean = true;
    _mainBottomBorder: Boolean = false;
    options = [
        { value: '管理员', label: '管理员' },
        { value: '开发', label: '开发' },
        { value: '测试', label: '测试' },
        { value: '访客', label: '访客', disabled: true }];
    selectedOption = this.options[0];
    rowsPerPageOptions: Array<any> = [3, 5, 10, 20];

    datas: any[];
    cols: any[];
    selection: any;
    titleHeight: Number = 47;

    @ViewChild('tb') _tb: any;
    @ViewChild('main') _main: ElementRef;
    @ViewChild('content') _content: ElementRef;
    @ViewChild('second') _second: ElementRef;
    @ViewChild('division') _division: ElementRef;
    constructor(public _dash: DashboardService, public _render: Renderer2) { }

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
        this.secondBorderSet();
        this.mainBorderSet();
        this._main.nativeElement.addEventListener('scroll', (event: any) => {
            this.mainBorderSet();
        });
        this._second.nativeElement.addEventListener('scroll', (event: any) => {
            this.secondBorderSet();
        });

        window.addEventListener('mouseup', (event: any) => {
            this.endDrag();

        });
        window.addEventListener('resize', (event: any) => {
            if (this._percent) {
                const tableHeight = this._content.nativeElement.offsetHeight - this._division.nativeElement.offsetHeight;
                let mainHeight = tableHeight * this._percent;
                if (mainHeight < 48) {
                    mainHeight = 48;
                }
                let secondHeight = tableHeight - mainHeight;
                if (secondHeight < 48) {
                    secondHeight = 48;
                    mainHeight = tableHeight - secondHeight;
                }
                this.secondBorderSet();
                this.mainBorderSet();
                this._render.setStyle(this._main.nativeElement, 'height', mainHeight + 'px');
                this._render.setStyle(this._second.nativeElement, 'height', secondHeight + 'px');
            }

        });
        this._content.nativeElement.addEventListener('mouseover', (event: any) => {
            const tableHeight = this._content.nativeElement.offsetHeight - this._division.nativeElement.offsetHeight;
            if (this._mousedown === true) {
                let mainHeight = event.clientY - this._main.nativeElement.offsetTop - 150;
                if (mainHeight < 48) {
                    mainHeight = 48;
                }
                let secondHeight = tableHeight - mainHeight;
                if (secondHeight < 48) {
                    secondHeight = 48;
                    mainHeight = tableHeight - secondHeight;
                }
                this._percent = mainHeight / tableHeight;
                this.secondBorderSet();
                this.mainBorderSet();
                this._render.setStyle(this._main.nativeElement, 'height', mainHeight + 'px');
                this._render.setStyle(this._second.nativeElement, 'height', secondHeight + 'px');
            }
        });
    }

    secondBorderSet() {
        if (this._second.nativeElement.offsetHeight + this._second.nativeElement.scrollTop >= this._second.nativeElement.scrollHeight) {
            this._secondBottomBorder = false;
        } else {
            this._secondBottomBorder = true;
        }
        if (this._second.nativeElement.scrollTop === 0) {
            this._secondTopBorder = false;
        } else {
            this._secondTopBorder = true;
        }
    }
    mainBorderSet() {
        if (this._main.nativeElement.scrollTop === 0) {
            this._mainTopBorder = false;
        } else {
            this._mainTopBorder = true;
        }
        if (this._main.nativeElement.offsetHeight + this._main.nativeElement.scrollTop >= this._main.nativeElement.scrollHeight) {
            this._mainBottomBorder = false;
        } else {
            this._mainBottomBorder = true;
        }
    }
    drag() {
        this._mousedown = true;

    }
    endDrag() {
        this._mousedown = false;
    }
    showHighSearch() {
        this.highSearch = !this.highSearch;
    }
    mainScrollShow() {
        this._mainHover = true;
    }

    mainScrollHide() {
        this._mainHover = false;
    }

    secondScrollShow() {
        this._secondHover = true;
    }

    secondScrollHide() {
        this._secondHover = false;
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
