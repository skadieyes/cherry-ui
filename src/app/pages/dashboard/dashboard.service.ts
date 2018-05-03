import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';


const dataUrls = 'assets/config/menu.json';
@Injectable()
export class DashboardService {
    data: any;
    result: any;
    constructor(
        private http: Http
    ) { }
    request(url: string, opts: any): Observable<any> {
        return this.http.request(url, new RequestOptions(opts))
            .map(res => {
                const _res = res.json();
                return _res;
            });
    }
    get(url: string, opts?: Object) {
        return this.request(url, (<any>Object).assign({
            method: 'get'
        }, opts));
    }

    getdata(label: string) {
        this.data = this.get(dataUrls).subscribe(data => {
            switch (label) {
                case '组件':
                this.result = data['component'];
                console.log(this.result);
                return this.result;
            }
        });
    }


}
