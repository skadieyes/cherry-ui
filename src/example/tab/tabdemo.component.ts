import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tabdemo',
    templateUrl: './tabdemo.component.html',
    styleUrls: ['./tabdemo.component.scss']
})
export class TabDemoComponent implements OnInit {

    tabs = [
        {
            name: 'Tab 1',
            content: '这是Tab1的内容'
        },
        {
            name: 'Tab 2',
            content: '这是Tab2的内容'
        },
        {
            name: 'Tab 3',
            content: '这是Tab3的内容'
        },
        {
            name: 'Tab 4',
            content: '禁用',
            disabled: true
        }
    ];
    tabs2 = [
        {
            name: 'Tab 1',
            content: '这是Tab1的内容',
            icon: 'fa fa-lemon-o'
        },
        {
            name: 'Tab 2',
            content: '这是Tab2的内容',
            icon: 'fa fa-heart-o'
        },
        {
            name: 'Tab 3',
            content: '这是Tab3的内容',
            icon: 'fa fa-meh-o'
        },
        {
            name: 'Tab 4',
            content: '禁用',
            icon: 'fa fa-smile-o',
            disabled: true
        }
    ];
    tabs3 = [
        {
            name: 'Tab 1',
            content: '这是Tab1的内容',
            icon: 'fa fa-lemon-o'
        },
        {
            name: 'Tab 2',
            content: '这是Tab2的内容',
            icon: 'fa fa-heart-o'
        },
        {
            name: 'Tab 3',
            content: '这是Tab3的内容',
            icon: 'fa fa-meh-o'
        },
        {
            name: 'Tab 4',
            content: '禁用',
            icon: 'fa fa-smile-o',
            disabled: true
        }
    ];
    tabs4 = [
        {
            name: 'Tab 1',
            content: '这是Tab1的内容'
        },
        {
            name: 'Tab 2',
            content: '这是Tab2的内容'
        },
        {
            name: 'Tab 3',
            content: '这是Tab3的内容'
        },
        {
            name: 'Tab 4',
            content: '这是Tab4的内容',
        },
        {
            name: 'Tab 5',
            content: '这是Tab5的内容'
        },
        {
            name: 'Tab 6',
            content: '这是Tab6的内容'
        },
        {
            name: 'Tab 7',
            content: '这是Tab7的内容'
        },
        {
            name: 'Tab 8',
            content: '这是Tab8的内容',
        },
        {
            name: 'Tab 9',
            content: '这是Tab9的内容'
        },
        {
            name: 'Tab 10',
            content: '这是Tab10的内容'
        },
        {
            name: 'Tab 11',
            content: '这是Tab11的内容'
        },
        {
            name: 'Tab 12',
            content: '这是Tab12的内容'
        },
        {
            name: 'Tab 13',
            content: '这是Tab13的内容',
        },
        {
            name: 'Tab 14',
            content: '这是Tab14的内容'
        },
        {
            name: 'Tab 15',
            content: '这是Tab15的内容'
        },
        {
            name: 'Tab 16',
            content: '这是Tab11的内容'
        },
        {
            name: 'Tab 17',
            content: '这是Tab17的内容'
        }
    ];
    tabs5 = [
        {
            name: 'Tab 1',
            content: '这是Tab1的内容'
        },
        {
            name: 'Tab 2',
            content: '这是Tab2的内容'
        },
        {
            name: 'Tab 3',
            content: '这是Tab3的内容'
        },
        {
            name: 'Tab 4',
            content: '这是Tab4的内容'
        }
    ];
    options = [
        { value: 'top', label: '上' },
        { value: 'left', label: '左' },
        { value: 'right', label: '右' },
        { value: 'bottom', label: '下' }
    ];

    position = this.options[0];

    options2 = [
        { value: 'top', label: '上' },
        { value: 'left', label: '左' },
        { value: 'right', label: '右' },
        { value: 'bottom', label: '下' }
    ];

    position2 = this.options2[0];

    constructor() { }

    ngOnInit() {
    }

}
