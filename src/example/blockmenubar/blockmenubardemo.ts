import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../app/components/common/menuitem';

@Component({
    selector: 'cherry-blockmenubar-demo',
    templateUrl: './blockmenubardemo.html'
})
export class BlockMenuBarDemoComponent implements OnInit {
    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'File',
                icon: 'fa-bar-chart',
                items: [{
                    label: 'New',
                    icon: 'fa-plus',
                    items: [
                        { label: 'Project' },
                        { label: 'Other' },
                    ]
                },
                { label: 'Open' },
                { label: 'Quit' }
                ]
            },
            { label: 'Calendar', icon: 'fa-calendar' },
            { label: 'Documentation', icon: 'fa-book' },
            { label: 'Support', icon: 'fa-support' },
            { label: 'Social', icon: 'fa-twitter' },
            {
                label: 'Edit',
                icon: 'fa-edit',
                items: [
                    { label: 'Undo', icon: 'fa-mail-forward' },
                    { label: 'Redo', icon: 'fa-mail-reply' }
                ]
            }
        ];
    }
}
