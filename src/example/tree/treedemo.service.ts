import { Injectable } from '@angular/core';

@Injectable()
export class TreeDemoService {
    data =
        [
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
            }
        ];
    data1 =
        [
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
        data2 =
        [
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
            }
        ];
        data3 =
        [
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
            }
        ];
        data4 =
        [
            {
                label: 'Documents',
                data: 'Documents Folder',
                expanded: true,
                children: [{
                    label: 'Work',
                    data: 'Work Folder',
                    expanded: true,
                    children: [{ label: 'Expenses', data: 'Expenses Document' }, { label: 'Resume', data: 'Resume Document' }]
                },
                {
                    label: 'Home',
                    data: 'Home Folder',
                    expanded: true,
                    children: [{ label: 'Invoices', data: 'Invoices for this month' }]
                }]
            },
            {
                label: 'User',
                data: 'Documents Folder',
                expanded: true,
                children: [{
                    label: 'Work',
                    data: 'Work Folder',
                    expanded: true,
                    children: [{ label: 'Expenses', data: 'Expenses Document' }, { label: 'Resume', data: 'Resume Document' }]
                },
                {
                    label: 'Home',
                    data: 'Home Folder',
                    expanded: true,
                    children: [{ label: 'Invoices', data: 'Invoices for this month' }]
                }]
            }
        ];
}


