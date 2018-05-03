import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../app/components/common/menuitem';
import { ArchitectureItem } from '../../app/components/architecture/architecture.model';

@Component({
    selector: 'cherry-architecture-demo',
    templateUrl: './architecturedemo.html'
})
export class ArchitectureDemoComponent implements OnInit {
    items: ArchitectureItem;

    ngOnInit() {
        this.items = {
            top_left_logo: './../../../../../assets/img/kylinLogo.png',
            bottom_text: '300s后锁定',
            left_header_name: '管理中心',
            left_header_icon: 'fa-file-o',
            top_top_menu_items: [
                { label: 'CRM', icon: 'fa-bar-chart fa-2x' },
                { label: 'Calendar', icon: 'fa-calendar fa-2x' },
                { label: 'Documentation', icon: 'fa-book fa-2x' },
                { label: 'Support', icon: 'fa-support fa-2x', routerLink: '/menudemo' },
                { label: 'Social', icon: 'fa-twitter fa-2x', url: 'http://www.baidu.com' }
            ],
            left_menu_items: [
                {
                    label: 'File',
                    icon: 'fa-file-o',
                    items: [{
                        label: 'New',
                        items: [
                            { label: 'Project' },
                            {
                                label: 'Other',
                            },
                        ]
                    },
                    {
                        label: 'Open', items: [{
                            label: 'New',
                            items: [
                                { label: 'Project' },
                                { label: 'Other' },
                            ]
                        },
                        { label: 'Open' },
                        { label: 'Quit' }
                        ]
                    },
                    { label: 'Quit' }
                    ]
                },
                {
                    label: 'Edit',
                    icon: 'fa-edit',
                    items: [
                        { label: 'Undo' },
                        { label: 'Redo' }
                    ]
                },
                {
                    label: 'Help',
                    icon: 'fa-question',
                    items: [
                        {
                            label: 'Contents'
                        },
                        {
                            label: 'Search',
                            items: [
                                {
                                    label: 'Text',
                                    items: [
                                        {
                                            label: 'Workspace'
                                        }
                                    ]
                                },
                                {
                                    label: 'File'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Actions',
                    icon: 'fa-gear',
                    items: [
                        {
                            label: 'Edit',
                            items: [
                                { label: 'Save' },
                                { label: 'Update' },
                            ]
                        },
                        {
                            label: 'Other',
                            items: [
                                { label: 'Delete' }
                            ]
                        }
                    ]
                }
            ],
            top_center_menu_items: [
                {
                    label: 'File',
                    icon: 'fa-bar-chart'
                },
                { label: 'Calendar', icon: 'fa-calendar' },
                { label: 'Documentation', icon: 'fa-book' },
                { label: 'Support', icon: 'fa-support' },
                { label: 'Social', icon: 'fa-twitter' },
                {
                    label: 'Edit',
                    icon: 'fa-edit',
                }
            ],
            top_right_menu_items: [{
                label: 'File',
                icon: 'fa-bar-chart',
                items: [{
                    'label': '1',
                    'icon': 'fa-user'
                }, {
                    'label': 'Email',
                    'icon': 'fa-envelope'
                }, {
                    'label': 'Help',
                    'icon': 'fa-question-circle'
                }, {
                    'label': 'Setting',
                    'icon': 'fa-cog'
                }, {
                    'label': 'Logout',
                    'icon': 'fa-sign-out'
                }]
            },
            {
                label: 'Edit',
                icon: 'fa-edit',
                items: [
                    { label: 'Calendar', icon: 'fa-calendar' },
                    { label: 'Documentation', icon: 'fa-book' }
                ]
            },
            {
                label: 'Actions',
                icon: 'fa-gear',
                items: [
                    { label: 'Calendar', icon: 'fa-calendar', url: 'http://www.baidu.com' },
                    { label: 'Documentation', icon: 'fa-book', routerLink: '/menudemo' },
                    { label: 'Support', icon: 'fa-support' }
                ]
            }]
        };
    }
    topCenterMenuClick(item: any) {
        console.log('top-center');
        console.log(item);
    }
    topTopMenuClick(item: any) {
        console.log('top-top');
        console.log(item);
    }
    topRightMenuClick(item: any) {
        console.log('top-right');
        console.log(item);
    }
    leftMenuClick(item: any) {
        console.log('left');
        console.log(item);
    }
}
