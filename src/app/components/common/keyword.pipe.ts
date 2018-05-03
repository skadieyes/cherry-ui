import { Pipe, Injectable, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({
    name: 'keyword'
})
@Injectable()
export class KeywordPipe implements PipeTransform {
    constructor(public sanitizer: DomSanitizer) { }
    transform(val: string, keyword: string): any {
        const Reg = new RegExp(keyword, 'i');
        if (val) {
                const res = val.replace(Reg, `<span style="background-color: #f8ce5b;">${keyword}</span>`);
                return this.sanitizer.bypassSecurityTrustHtml(res);
        }
    }
}

