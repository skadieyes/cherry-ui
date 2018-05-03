import { Component, OnInit } from '@angular/core';
import { TreeDemoService } from './treedemo.service';
import { TreeDragDropService } from '../../app/components/common/api';

@Component({
    selector: 'app-treedemo',
    templateUrl: './treedemo.component.html',
    styleUrls: ['./treedemo.component.scss'],
    providers: [TreeDemoService, TreeDragDropService]
})
export class TreeDemoComponent implements OnInit {

    constructor(public _tree: TreeDemoService) { }
    treeData0: any;
    treeData1: any;
    treeData2: any;
    treeData3: any;
    treeData4: any;
    treeData3_str: string;
    selectedFile: any;
    selectedFile1: any;
    selectedFile2: any;
    selectedFile3: any;
    selectedFile4: any;
    ngOnInit() {
        this.treeData0 = this._tree.data;
        this.treeData1 = this._tree.data1;
        this.treeData2 = this._tree.data2;
        this.treeData3 = this._tree.data3;
        this.treeData4 = this._tree.data4;
    }
    nodeDorp() {
        console.log(this.treeData3);
    }
    expandAll() {
        this.treeData4.forEach(node => {
            this.expandRecursive(node, true);
        });
    }

    collapseAll() {
        this.treeData4.forEach(node => {
            this.expandRecursive(node, false);
        });
    }
    private expandRecursive(node: any, isExpand: boolean) {
        node.expanded = isExpand;
        if (node.children) {
            node.children.forEach(childNode => {
                this.expandRecursive(childNode, isExpand);
            });
        }
    }
}
