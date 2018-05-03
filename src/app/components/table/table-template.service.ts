import { Directive, Input, TemplateRef } from '@angular/core';


@Directive({
    selector: '[cherryTableTemplate]',
})
export class TableTemplateDirective {

    @Input() type: string;

    @Input() name: string;

    constructor(public template: TemplateRef<any>) { }

    getType(): string {
        return this.name;
    }
}
