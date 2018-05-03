import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DashboardService } from '../../app/pages/dashboard/dashboard.service';

@Component({
    selector: 'app-tabledemo',
    templateUrl: './tabledemo.component.html',
    styleUrls: ['./tabledemo.component.scss'],
    providers: [DashboardService]
})
export class TableDemoComponent implements OnInit {
    constructor(public _dash: DashboardService) { }

    sales: any[];

    cols: any[];

    cars: any[];

    cars2: any[];

    sales_head: any[];

    selection: any;

    selection2: any;

    _checked = true;

    brands: any;

    loadingData: any;

    loading: Boolean = true;

    cars3: any;

    frozenCols: any;

    frozenCars: any;

    selectedColumns: any[];

    rowsPerPageOptions: any = [1, 3, 5, 10, 20];

    ngOnInit() {

        this.sales = [
            { brand: 'Apple', lastYearSale: '51%', thisYearSale: '40%', lastYearProfit: '$54,406.00', thisYearProfit: '$43,342' },
            { brand: 'Samsung', lastYearSale: '83%', thisYearSale: '96%', lastYearProfit: '$423,132', thisYearProfit: '$312,122' },
            { brand: 'Microsoft', lastYearSale: '38%', thisYearSale: '5%', lastYearProfit: '$12,321', thisYearProfit: '$8,500' },
            { brand: 'Philips', lastYearSale: '49%', thisYearSale: '22%', lastYearProfit: '$745,232', thisYearProfit: '$650,323,' },
            { brand: 'Song', lastYearSale: '17%', thisYearSale: '79%', lastYearProfit: '$643,242', thisYearProfit: '500,332' }
        ];
        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
        this.cars = [
            { brand: 'VW', year: 2012, color: 'Orange', vin: 'dsad231ff' },
            { brand: 'Audi', year: 2011, color: 'Black', vin: 'gwregre345' },
            { brand: 'Renault', year: 2005, color: 'Gray', vin: 'h354htr' },
            { brand: 'BMW', year: 2003, color: 'Blue', vin: 'j6w54qgh' },
            { brand: 'Mercedes', year: 1995, color: 'Orange', vin: 'hrtwy34' },
        ];
        this.cars2 = [
            { brand: 'VW', year: 2012, color: 'Orange', vin: 'dsad231ff', checked: false },
            { brand: 'Audi', year: 2011, color: 'Black', vin: 'gwregre345', checked: false },
            { brand: 'Renault', year: 2005, color: 'Gray', vin: 'h354htr', checked: false },
            { brand: 'BMW', year: 2003, color: 'Blue', vin: 'j6w54qgh', checked: false },
            { brand: 'Mercedes', year: 1995, color: 'Orange', vin: 'hrtwy34', checked: false },
        ];
        this.cars3 = [
            { brand: 'VW', year: 2012, color: 'Orange', vin: 'dsad231ff'},
            { brand: 'Audi', year: 2011, color: 'Black', vin: 'gwregre345' },
            { brand: 'Renault', year: 2005, color: 'Gray', vin: 'h354htr' },
            { brand: 'BMW', year: 2003, color: 'Blue', vin: 'j6w54qgh'},
            { brand: 'Mercedes', year: 1995, color: 'Orange', vin: 'hrtwy34' },
        ];

        this.brands = [
            { label: 'All Brands', value: null },
            { label: 'VW', value: 'VW' },
            { label: 'Audi', value: 'Audi' },
            { label: 'Renault', value: 'Renault' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Mercedes', value: 'Mercedes' }
        ];

        this._dash.get('assets/data/table.json').subscribe(data => {
            this.loadingData = data.data;
        });

        this.frozenCols = [
            { field: 'vin', header: 'Vin' },
        ];

        this.frozenCars = [
            { brand: 'VW', year: 2012, color: 'Orange', vin: 'dsad231ff' },
            { brand: 'Audi', year: 2011, color: 'Black', vin: 'gwregre345' }
        ];
        this.selectedColumns = this.cols;
    }

    ifCheck(rowData: any, selection: any) {
        if (rowData === selection) {
            return true;
        } else {
            return false;
        }
    }

    onRowSelect(event: any) {
        if (event) {
            event.data.checked = true;
        }
    }

    onRowUnselect(event: any) {
        if (event) {
            event.data.checked = false;
        }
    }
    rowData(rowData: any) {
        console.log(rowData);
    }

}
