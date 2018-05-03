import {
    Component, Input, AfterContentInit, OnDestroy, Output, EventEmitter, OnInit, EmbeddedViewRef, ViewContainerRef,
    ContentChildren, QueryList, TemplateRef, Inject, ElementRef, forwardRef, Host
} from '@angular/core';
import { Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../common/treenode';
import { SharedModule } from '../common/shared';
import { TreeDragDropService } from '../common/treedragdropservice';
import { Subscription } from 'rxjs/Subscription';
import { BlockableUI } from '../common/blockableui';
import { TreeComponent } from './tree.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'cherry-treenode',
    templateUrl: './treeNode.component.html',
    styleUrls: ['./tree.component.scss'],
    animations: [
        trigger('treenode', [
            state('hidden', style({
                height: '0px',
                display: 'none',
                opacity: '0'
            })),
            state('visible', style({
                height: '*',
                opacity: '1'
            })),
            transition('visible => hidden', animate('300ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('300ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class TreeNodeComponent implements OnInit {

    static ICON_CLASS: String = 'cherry-ui-treenode-icon fa fa-fw';

    @Input() node: TreeNode;

    @Input() parentNode: TreeNode;

    @Input() root: boolean;

    @Input() index: number;

    @Input() firstChild: boolean;

    @Input() lastChild: boolean;

    constructor( @Inject(forwardRef(() => TreeComponent)) public tree: TreeComponent) { }

    draghoverPrev: boolean;

    draghoverNext: boolean;

    draghoverNode: boolean;

    checkBoxNode: Boolean = false;
    notAll: Boolean = false;

    ngOnInit() {
        this.node.parent = this.parentNode;
    }

    getIcon() {
        let icon: string;

        if (this.node.icon) {
            icon = this.node.icon;
        } else {
            icon = this.node.expanded && this.node.children && this.node.children.length ? this.node.expandedIcon : this.node.collapsedIcon;
        }
        return TreeNodeComponent.ICON_CLASS + ' ' + icon;
    }

    isLeaf() {
        return this.node.leaf === false ? false : !(this.node.children && this.node.children.length);
    }

    toggle(event: Event) {
        if (this.node.expanded) {
            this.tree.onNodeCollapse.emit({ originalEvent: event, node: this.node });
        } else {
            this.tree.onNodeExpand.emit({ originalEvent: event, node: this.node });
        }
        this.node.expanded = !this.node.expanded;
    }

    onNodeClick(event: MouseEvent, node: TreeNode) {
        this.tree.onNodeClick(event, this.node);

    }

    onNodeTouchEnd() {
        this.tree.onNodeTouchEnd();
    }

    onNodeRightClick(event: MouseEvent) {
        this.tree.onNodeRightClick(event, this.node);
    }

    isSelected() {
        if (this.node.partialSelected && !this.tree.isSelected(this.node)) {
            this.checkBoxNode = false;
            this.notAll = true;
            return this.tree.isSelected(this.node);
        } if (!this.tree.isSelected(this.node)) {
            this.checkBoxNode = false;
            this.notAll = false;
            return this.tree.isSelected(this.node);
        } else if (this.tree.isSelected(this.node)) {
            this.checkBoxNode = true;
            this.notAll = false;
            return this.tree.isSelected(this.node);
        }
    }


    onDropPoint(event: Event, position: number) {
        event.preventDefault();
        const dragNode = this.tree.dragNode;
        const dragNodeIndex = this.tree.dragNodeIndex;
        const dragNodeScope = this.tree.dragNodeScope;
        const isValidDropPointIndex = this.tree.dragNodeTree === this.tree ? (position === 1 || dragNodeIndex !== this.index - 1) : true;

        if (this.tree.allowDrop(dragNode, this.node, dragNodeScope) && isValidDropPointIndex) {
            const newNodeList = this.node.parent ? this.node.parent.children : this.tree.value;
            this.tree.dragNodeSubNodes.splice(dragNodeIndex, 1);
            let dropIndex = this.index;

            if (position < 0) {
                dropIndex = (this.tree.dragNodeSubNodes === newNodeList) ? ((this.tree.dragNodeIndex > this.index) ? this.index : this.index - 1) : this.index;
                newNodeList.splice(dropIndex, 0, dragNode);
            } else {
                dropIndex = newNodeList.length;
                newNodeList.push(dragNode);
            }

            this.tree.dragDropService.stopDrag({
                node: dragNode,
                subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
                index: dragNodeIndex
            });

            this.tree.onNodeDrop.emit({
                originalEvent: event,
                dragNode: dragNode,
                dropNode: this.node,
                dropIndex: dropIndex
            });
        }

        this.draghoverPrev = false;
        this.draghoverNext = false;
    }

    onDropPointDragOver(event: any) {
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();
    }

    onDropPointDragEnter(event: Event, position: number) {
        if (this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope)) {
            if (position < 0) {
                this.draghoverPrev = true;
            } else {
                this.draghoverNext = true;
            }
        }
    }

    onDropPointDragLeave(event: Event) {
        this.draghoverPrev = false;
        this.draghoverNext = false;
    }

    onDragStart(event: any) {
        if (this.tree.draggableNodes && this.node.draggable !== false) {
            event.dataTransfer.setData('text', 'data');

            this.tree.dragDropService.startDrag({
                tree: this,
                node: this.node,
                subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
                index: this.index,
                scope: this.tree.draggableScope
            });
        } else {
            event.preventDefault();
        }
    }

    onDragStop(event: any) {
        this.tree.dragDropService.stopDrag({
            node: this.node,
            subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
            index: this.index
        });
    }

    onDropNodeDragOver(event: any) {
        event.dataTransfer.dropEffect = 'move';
        if (this.tree.droppableNodes) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    onDropNode(event: any) {
        if (this.tree.droppableNodes && this.node.droppable !== false) {
            event.preventDefault();
            event.stopPropagation();
            const dragNode = this.tree.dragNode;
            if (this.tree.allowDrop(dragNode, this.node, this.tree.dragNodeScope)) {
                const dragNodeIndex = this.tree.dragNodeIndex;
                this.tree.dragNodeSubNodes.splice(dragNodeIndex, 1);

                if (this.node.children) {
                    this.node.children.push(dragNode);
                } else {
                    this.node.children = [dragNode];
                }
                this.tree.dragDropService.stopDrag({
                    node: dragNode,
                    subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
                    index: this.tree.dragNodeIndex
                });

                this.tree.onNodeDrop.emit({
                    originalEvent: event,
                    dragNode: dragNode,
                    dropNode: this.node,
                    index: this.index
                });
            }
        }

        this.draghoverNode = false;
    }

    onDropNodeDragEnter(event: any) {
        if (this.tree.droppableNodes && this.node.droppable !== false && this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope)) {
            this.draghoverNode = true;
        }
    }

    onDropNodeDragLeave(event: any) {
        if (this.tree.droppableNodes) {
            const rect = event.currentTarget.getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y >= Math.floor(rect.top + rect.height) || event.y < rect.top) {
                this.draghoverNode = false;
            }
        }
    }
}
