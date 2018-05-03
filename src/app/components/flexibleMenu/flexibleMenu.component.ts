import { Component, ElementRef, Input, Output, EventEmitter, Renderer2, OnInit, AfterViewInit, OnChanges, ViewChild, AfterContentChecked, ViewChildren } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';
import { FlexibleMenuService } from './flexibleMenu.service';

@Component({
    selector: 'cherry-flexiblemenu',
    templateUrl: './flexibleMenu.component.html',
    styleUrls: ['./flexibleMenu.component.scss'],
    providers: [DomHandler, FlexibleMenuService]
})
export class FlexibleMenuComponent {

    @Input()
    set model(item: MenuItem[]) {
        this._model = item;
        this.menuItemInit();
    }

    get model() {
        return this._model;
    }

    @Input() style: any;

    @Input() styleClass: string;

    @Output() itemClickEvent = new EventEmitter<any>();

    @Input()
    set activeItem(item: MenuItem) {
        this._initActiveItem = item;
        this.activeItemInit();

    }

    get activeItem(): MenuItem {
        return this._initActiveItem;
    }

    @Input()
    set flexFixed(fixed: Boolean) {
        this._flexFixed = fixed;
        this.menuItemInit();
    }

    get flexFixed(): Boolean {
        return this._flexFixed;
    }
    @Input()
    set menuParent(item: any) {
        this._menuParent = item;
        if (this._model && this._model.length) {
            if (this.menuParent && this.menuParent.label && this.menuParent.icon) {
                this.dropList[0].label = this.menuParent.label;
                this.dropList[0].icon = this.menuParent.icon;
            }
        }
        this.menuItemInit();
    }

    get menuParent() {
        return this._menuParent;
    }
    tabActiveItem: MenuItem;

    _model: MenuItem[];

    _initActiveItem: MenuItem;

    hoverItem: MenuItem;

    tabList: any;

    dropList: MenuItem[];

    origiList: any;

    dropItems: any;

    flexiMenuShow: Boolean = false;

    childActiveItem: MenuItem;

    _flexFixed: Boolean = false;
    @Input() _menuParent: MenuItem;

    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, public _flexMenu: FlexibleMenuService) {
        this.dropList = [
            { label: '更多', icon: 'fa-list-ul', items: [] }];
    }

    @ViewChild('list') list: ElementRef;
    @ViewChild('box') box: ElementRef;




    mouseHover(item: MenuItem) {
        this.hoverItem = item;
    }

    menuItemInit() {
        if (this._model && this._model.length) {
            if (!this.flexFixed) {
                this.indexSwitch();
                window.onresize = () => {
                    if (this._model && this._model.length) {
                        this.indexSwitch();
                    }
                };
            } else if (this.flexFixed) {
                this.listCal(0);
            }
        }
    }
    activeItemInit() {
        if (this.model && this.model.length && this.tabList && this.dropList) {
            // 设置首次进入时激活的元素是在展开的菜单还是下拉的菜单中
            if (JSON.stringify(this.tabList).indexOf(JSON.stringify(this._initActiveItem)) !== -1) {
                this.tabActiveItem = this._initActiveItem;
            } else if (JSON.stringify(this.dropList).indexOf(JSON.stringify(this._initActiveItem)) !== -1) {
                this.childActiveItem = this._initActiveItem;
            }
        }
    }
    tabListInit() {
        // copy一份model
        if (this.model) {
            this.origiList = new Array(this.model.length);
            for (let i = 0; i < this.model.length; i++) {
                this.origiList[i] = this.model[i];
            }
            this.tabList = this.origiList;
        }
    }

    listCal(index: number) {
        // 根据传入的index,把一部分数据传入tablist中，视图上显示在平铺的blockmenu上
        // 另一部分数据则传入dropItems中,收缩至下拉菜单中
        if (this.model.length > index) {
            this.flexiMenuShow = true;
            this.tabList = new Array(index);
            this.dropItems = new Array(this.model.length - index);
            for (let i = 0; i < this.model.length; i++) {
                if (i < index) {
                    this.tabList[i] = this.model[i];
                }
            }
            for (let i = 0, y = 0; i < this.model.length; i++) {
                if (i >= index) {
                    this.dropItems[y] = this.model[i];
                    y++;
                }
            }
            this.dropList[0].items = this.dropItems;
        } else {
            this.flexiMenuShow = false;
            this.tabList = new Array(this.model.length);
            for (let i = 0; i < this.model.length; i++) {
                this.tabList[i] = this.model[i];
            }
        }
    }

    indexSwitch() {
        // 根据响应式变化的宽度来定放多少项在平铺的blockmenu中
        const boxWidth = this.box.nativeElement.offsetWidth;

        if (boxWidth > 900) {
            this.listCal(6);
        } else if (boxWidth < 800 && boxWidth > 700) {
            this.listCal(5);
        } else if (boxWidth < 700 && boxWidth > 600) {
            this.listCal(3);
        } else if (boxWidth < 600 && boxWidth > 500) {
            this.listCal(4);
        } else if (boxWidth < 500 && boxWidth > 400) {
            this.listCal(3);
        } else if (boxWidth < 400 && boxWidth > 300) {
            this.listCal(2);
        } else if (boxWidth < 300 && boxWidth > 200) {
            this.listCal(1);
        } else if (boxWidth < 200 && boxWidth > 100) {
            this.listCal(0);
        }
    }
    indexCal(list: any) {
        // 打算使用更加智能的算法 未使用 优化中
        const listLength = list.children.length;
        let lengthSum = 0;
        for (let i = 0; i < listLength; i++) {
            lengthSum = lengthSum + list.children[i].clientWidth;
            if (lengthSum >= this.box.nativeElement.offsetWidth) {
                this.listCal(i - 1);
                return i;
            }
        }

    }
    _getHostElement(): HTMLElement {
        return this.el.nativeElement;
    }

    itemClick(event: Event, item: MenuItem) {
        this.tabActiveItem = item;
        this.itemClickEvent.emit(item);
        this._flexMenu.ifChildClick(true);
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        if (!item.url) {
            event.preventDefault();
        }

        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
    }
    menuBarHover() {
        this.hoverItem = null;
    }
    componentClick(item: any) {
        this.itemClickEvent.emit(item);
        this.tabActiveItem = null;
    }
}
