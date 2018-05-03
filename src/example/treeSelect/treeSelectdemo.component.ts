import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-treeselectdemo',
    templateUrl: './treeSelectdemo.component.html',
    styleUrls: ['./treeSelectdemo.component.css']
})
export class TreeSelectDemoComponent implements OnInit {

    options_1 = [
        {
            label: 'Documents',
            data: 'Documents Folder',
            children: [{
                label: 'Work',
                data: 'Work Folder',
                children: [{ label: 'Expenses', data: 'Expenses Document' }, { label: 'Resume', data: 'Resume Document' }]
            },
            {
                label: 'Home',
                data: 'Home Folder',
                children: [{ label: 'Invoices', data: 'Invoices for this month' }]
            }]
        },
        {
            label: 'User',
            data: 'Documents Folder',
            children: [{
                label: 'Work',
                data: 'Work Folder',
                children: [{ label: 'Expenses', data: 'Expenses Document' }, { label: 'Resume', data: 'Resume Document' }]
            },
            {
                label: 'Home',
                data: 'Home Folder',
                children: [{ label: 'Invoices', data: 'Invoices for this month' }]
            }]
        },

    ];
    selectedOption_1 = this.options_1[1];

    options_2 = [
        {
            label: 'Documents',
            data: 'Documents Folder',
            children: [{
                label: 'Work',
                data: 'Work Folder',
                children: [{ label: 'Expenses', data: 'Expenses Document' }, { label: 'Resume', data: 'Resume Document' }]
            },
            {
                label: 'Home',
                data: 'Home Folder',
                children: [{ label: 'Invoices', data: 'Invoices for this month' }]
            }]
        },
        {
            label: 'User',
            data: 'Documents Folder',
            children: [{
                label: 'Work',
                data: 'Work Folder',
                children: [{ label: 'Expenses', data: 'Expenses Document' }, { label: 'Resume', data: 'Resume Document' }]
            },
            {
                label: 'Home',
                data: 'Home Folder',
                children: [{ label: 'Invoices', data: 'Invoices for this month' }]
            }]
        },
        {
            label: 'User',
            data: 'Documents Folder',
            children: [{
                label: 'Work',
                data: 'Work Folder',
                children: [{ label: 'Expenses', data: 'Expenses Document' }, { label: 'Resume', data: 'Resume Document' }]
            },
            {
                label: 'Home',
                data: 'Home Folder',
                children: [{ label: 'Invoices', data: 'Invoices for this month' }]
            }]
        },

    ];
    selectedOption_2 = [this.options_2[1], this.options_2[0]];

    options_3 = [
        {
            label: 'Documents',
            data: 'Documents Folder',
            expandedIcon: 'fa-folder-open-o',
            collapsedIcon: 'fa-folder-o',
            expanded: true,
            children: [{
                label: 'Work',
                data: 'Work Folder',
                expandedIcon: 'fa-folder-open-o',
                collapsedIcon: 'fa-folder-o',
                expanded: true,
                children: [{ label: 'Expenses', icon: 'fa-file-o', data: 'Expenses Document' }, { label: 'Resume', icon: 'fa-file-o', data: 'Resume Document' }]
            },
            {
                label: 'Home',
                data: 'Home Folder',
                expandedIcon: 'fa-folder-open-o',
                collapsedIcon: 'fa-folder-o',
                children: [{ label: 'Invoices', icon: 'fa-file-o', data: 'Invoices for this month' }]
            }]
        },
        {
            label: 'User',
            data: 'Documents Folder',
            expandedIcon: 'fa-folder-open-o',
            collapsedIcon: 'fa-folder-o',
            children: [{
                label: 'Work',
                data: 'Work Folder',
                expandedIcon: 'fa-folder-open-o',
                collapsedIcon: 'fa-folder-o',
                children: [{ label: 'Expenses', icon: 'fa-file-o', data: 'Expenses Document' }, { label: 'Resume', icon: 'fa-file-o', data: 'Resume Document' }]
            },
            {
                label: 'Home',
                data: 'Home Folder',
                expandedIcon: 'fa-folder-open-o',
                collapsedIcon: 'fa-folder-o',
                children: [{ label: 'Invoices', icon: 'fa-file-o', data: 'Invoices for this month' }]
            }]
        }
    ];
    selectedOption_3 = this.options_3[1];


    constructor() { }

    ngOnInit() {
    }

}
