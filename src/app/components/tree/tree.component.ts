import {
    NgModule, Component, Input, AfterContentInit, OnDestroy, Output, EventEmitter, OnInit, EmbeddedViewRef, ViewContainerRef,
    ContentChildren, QueryList, TemplateRef, Inject, ElementRef, forwardRef, Host
} from '@angular/core';
import { Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../common/treenode';
import { SharedModule } from '../common/shared';
import { TreeDragDropService } from '../common/treedragdropservice';
import { Subscription } from 'rxjs/Subscription';
import { BlockableUI } from '../common/blockableui';
import { TemplateDirective } from '../common/shared';
@Component({
    selector: 'cherry-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit, AfterContentInit, OnDestroy, BlockableUI {

    @Input() value: TreeNode[];

    @Input() selectionMode: string;

    @Input() selection: any;

    @Output() selectionChange: EventEmitter<any> = new EventEmitter();

    @Output() onNodeSelect: EventEmitter<any> = new EventEmitter();

    @Output() onNodeUnselect: EventEmitter<any> = new EventEmitter();

    @Output() onNodeExpand: EventEmitter<any> = new EventEmitter();

    @Output() onNodeCollapse: EventEmitter<any> = new EventEmitter();

    @Output() onNodeContextMenuSelect: EventEmitter<any> = new EventEmitter();

    @Output() onNodeDrop: EventEmitter<any> = new EventEmitter();

    @Input() style: any;

    @Input() styleClass: string;

    @Input() contextMenu: any;

    @Input() layout: String = 'vertical';

    @Input() draggableScope: any;

    @Input() droppableScope: any;

    @Input() draggableNodes: boolean;

    @Input() droppableNodes: boolean;

    @Input() metaKeySelection: Boolean = true;

    @Input() propagateSelectionUp: Boolean = true;

    @Input() propagateSelectionDown: Boolean = true;

    @Input() loading: boolean;

    @Input() loadingIcon: String = 'fa-circle-o-notch';

    @Input() emptyMessage: String = 'No records found';

    @ContentChildren(TemplateDirective) templates: QueryList<any>;

    public templateMap: any;

    public nodeTouched: boolean;

    public dragNodeTree: TreeComponent;

    public dragNode: TreeNode;

    public dragNodeSubNodes: TreeNode[];

    public dragNodeIndex: number;

    public dragNodeScope: any;

    public dragHover: boolean;

    public dragStartSubscription: Subscription;

    public dragStopSubscription: Subscription;

    constructor(public el: ElementRef, @Optional() public dragDropService: TreeDragDropService) { }

    ngOnInit() {
        if (this.droppableNodes) {
            this.dragStartSubscription = this.dragDropService.dragStart$.subscribe(
                event => {
                    this.dragNodeTree = event.tree;
                    this.dragNode = event.node;
                    this.dragNodeSubNodes = event.subNodes;
                    this.dragNodeIndex = event.index;
                    this.dragNodeScope = event.scope;
                });

            this.dragStopSubscription = this.dragDropService.dragStop$.subscribe(
                event => {
                    this.dragNodeTree = null;
                    this.dragNode = null;
                    this.dragNodeSubNodes = null;
                    this.dragNodeIndex = null;
                    this.dragNodeScope = null;
                    this.dragHover = false;
                });
        }
    }

    get horizontal(): boolean {
        return this.layout === 'horizontal';
    }

    ngAfterContentInit() {
        if (this.templates.length) {
            this.templateMap = {};
        }

        this.templates.forEach((item: any) => {
            this.templateMap[item.name] = item.template;
        });
    }

    onNodeClick(event: MouseEvent, node: TreeNode) {
        const eventTarget = (<Element>event.target);

        if (eventTarget.className && eventTarget.className.indexOf('cherry-ui-tree-toggler') === 0) {
            return;
        } else if (this.selectionMode) {
            if (node.selectable === false) {
                return;
            }

            const index = this.findIndexInSelection(node);
            const selected = (index >= 0);

            if (this.isCheckboxSelectionMode()) {
                if (selected) {
                    if (this.propagateSelectionDown) {
                        this.propagateDown(node, false);
                    } else {
                        this.selection = this.selection.filter((val, i) => i !== index);
                    }
                    if (this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, false);
                    }

                    this.selectionChange.emit(this.selection);
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                } else {
                    if (this.propagateSelectionDown) {
                        this.propagateDown(node, true);
                    } else {
                        this.selection = [...this.selection || [], node];
                    }

                    if (this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, true);
                    }

                    this.selectionChange.emit(this.selection);
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            } else {
                const metaSelection = this.nodeTouched ? false : this.metaKeySelection;
                if (metaSelection) {
                    const metaKey = (event.metaKey || event.ctrlKey);

                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this.selectionChange.emit(null);
                        } else {
                            this.selection = this.selection.filter((val, i) => i !== index);
                            this.selectionChange.emit(this.selection);
                        }

                        this.onNodeUnselect.emit({ originalEvent: event, node: node });
                    } else {
                        if (this.isSingleSelectionMode()) {
                            this.selectionChange.emit(node);
                        } else if (this.isMultipleSelectionMode()) {
                            this.selection = (!metaKey) ? [] : this.selection || [];
                            this.selection = [...this.selection, node];
                            this.selectionChange.emit(this.selection);
                        }

                        this.onNodeSelect.emit({ originalEvent: event, node: node });
                    }
                } else {
                    if (this.isSingleSelectionMode()) {
                        if (selected) {
                            this.selection = null;
                            this.onNodeUnselect.emit({ originalEvent: event, node: node });
                        } else {
                            this.selection = node;
                            this.onNodeSelect.emit({ originalEvent: event, node: node });
                        }
                    } else {
                        if (selected) {
                            this.selection = this.selection.filter((val, i) => i !== index);
                            this.onNodeUnselect.emit({ originalEvent: event, node: node });
                        } else {
                            this.selection = [...this.selection || [], node];
                            this.onNodeSelect.emit({ originalEvent: event, node: node });
                        }
                    }
                    this.selectionChange.emit(this.selection);
                }
            }
        }
        this.nodeTouched = false;
    }

    onNodeTouchEnd() {
        this.nodeTouched = true;
    }

    onNodeRightClick(event: MouseEvent, node: TreeNode) {
        if (this.contextMenu) {
            const eventTarget = (<Element>event.target);

            if (eventTarget.className && eventTarget.className.indexOf('cherry-ui-tree-toggler') === 0) {
                return;
            } else {
                const index = this.findIndexInSelection(node);
                const selected = (index >= 0);

                if (!selected) {
                    if (this.isSingleSelectionMode()) {
                        this.selectionChange.emit(node);
                    } else {
                        this.selectionChange.emit([node]);
                    }
                }

                this.contextMenu.show(event);
                this.onNodeContextMenuSelect.emit({ originalEvent: event, node: node });
            }
        }
    }

    findIndexInSelection(node: TreeNode) {
        let index: Number = -1;

        if (this.selectionMode && this.selection) {
            if (this.isSingleSelectionMode()) {
                index = (this.selection === node) ? 0 : - 1;
            } else {
                for (let i = 0; i < this.selection.length; i++) {
                    if (this.selection[i] === node) {
                        index = i;
                        break;
                    }
                }
            }
        }

        return index;
    }

    propagateUp(node: TreeNode, select: boolean) {
        if (node.children && node.children.length) {
            let selectedCount = 0;
            let childPartialSelected: Boolean = false;
            for (const child of node.children) {
                if (this.isSelected(child)) {
                    selectedCount++;
                } else if (child.partialSelected) {
                    childPartialSelected = true;
                }
            }

            if (select && selectedCount === node.children.length) {
                this.selection = [...this.selection || [], node];
                node.partialSelected = false;
            } else {
                if (!select) {
                    const index = this.findIndexInSelection(node);
                    if (index >= 0) {
                        this.selection = this.selection.filter((val, i) => i !== index);
                    }
                }

                if (childPartialSelected || selectedCount > 0 && selectedCount !== node.children.length) {
                    node.partialSelected = true;
                } else {
                    node.partialSelected = false;
                }
            }
        }

        const parent = node.parent;
        if (parent) {
            this.propagateUp(parent, select);
        }
    }

    propagateDown(node: TreeNode, select: boolean) {
        const index = this.findIndexInSelection(node);

        if (select && index === -1) {
            this.selection = [...this.selection || [], node];
        } else if (!select && index > -1) {
            this.selection = this.selection.filter((val, i) => i !== index);
        }

        node.partialSelected = false;

        if (node.children && node.children.length) {
            for (const child of node.children) {
                this.propagateDown(child, select);
            }
        }
    }

    isSelected(node: TreeNode) {
        return this.findIndexInSelection(node) !== -1;
    }

    isSingleSelectionMode() {
        return this.selectionMode && this.selectionMode === 'single';
    }

    isMultipleSelectionMode() {
        return this.selectionMode && this.selectionMode === 'multiple';
    }

    isCheckboxSelectionMode() {
        return this.selectionMode && this.selectionMode === 'checkbox';
    }

    getTemplateForNode(node: TreeNode): TemplateRef<any> {
        if (this.templateMap) {
            return node.type ? this.templateMap[node.type] : this.templateMap['default'];
        } else {
            return null;
        }
    }

    onDragOver(event: any) {
        if (this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.dataTransfer.dropEffect = 'move';
            event.preventDefault();
        }
    }

    onDrop(event: any) {
        if (this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.preventDefault();
            const dragNode = this.dragNode;
            if (this.allowDrop(dragNode, null, this.dragNodeScope)) {
                const dragNodeIndex = this.dragNodeIndex;
                this.dragNodeSubNodes.splice(dragNodeIndex, 1);
                this.value = this.value || [];
                this.value.push(dragNode);

                this.dragDropService.stopDrag({
                    node: dragNode
                });
            }
        }
    }

    onDragEnter(event: any) {
        if (this.droppableNodes && this.allowDrop(this.dragNode, null, this.dragNodeScope)) {
            this.dragHover = true;
        }
    }

    onDragLeave(event: any) {
        if (this.droppableNodes) {
            const rect = event.currentTarget.getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y > rect.top + rect.height || event.y < rect.top) {
                this.dragHover = false;
            }
        }
    }

    allowDrop(dragNode: TreeNode, dropNode: TreeNode, dragNodeScope: any): boolean {
        if (!dragNode) {
            return false;
        } else if (this.isValidDragScope(dragNodeScope)) {
            let allow = true;
            if (dropNode) {
                if (dragNode === dropNode) {
                    allow = false;
                } else {
                    let parent = dropNode.parent;
                    while (parent != null) {
                        if (parent === dragNode) {
                            allow = false;
                            break;
                        }
                        parent = parent.parent;
                    }
                }
            } return allow;
        } else {
            return false;
        }
    }

    isValidDragScope(dragScope: any): boolean {
        const dropScope = this.droppableScope;

        if (dropScope) {
            if (typeof dropScope === 'string') {
                if (typeof dragScope === 'string') {
                    return dropScope === dragScope;
                } else if (dragScope instanceof Array) {
                    return (<Array<any>>dragScope).indexOf(dropScope) !== -1;
                }
            } else if (dropScope instanceof Array) {
                if (typeof dragScope === 'string') {
                    return (<Array<any>>dropScope).indexOf(dragScope) !== -1;
                } else if (dragScope instanceof Array) {
                    for (const s of dropScope) {
                        for (const ds of dragScope) {
                            if (s === ds) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        } else {
            return true;
        }
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    ngOnDestroy() {
        if (this.dragStartSubscription) {
            this.dragStartSubscription.unsubscribe();
        }

        if (this.dragStopSubscription) {
            this.dragStopSubscription.unsubscribe();
        }
    }
}
