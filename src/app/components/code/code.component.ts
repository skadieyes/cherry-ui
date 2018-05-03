import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { highlightBlock } from 'highlight.js';

@Component({
    selector: 'cherry-code',
    templateUrl: './code.component.html',
    styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

    @ViewChild('code') codeElement: ElementRef;
    @Input() language: string;
    ngOnInit() {
        highlightBlock(this.codeElement.nativeElement);
    }
}

