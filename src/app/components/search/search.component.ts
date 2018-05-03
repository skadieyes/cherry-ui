import { Component, ElementRef, OnDestroy, Input, Output, OnInit, EventEmitter, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem } from '../common/menuitem';
import { KeywordPipe } from '../common/keyword.pipe';
import { SearchService } from './search.service';


@Component({
    selector: 'cherry-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    animations: [
        trigger('rootItem', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class SearchComponent implements OnInit {

    model: MenuItem[];

    notFound: Boolean = true;

    inputFocus: Boolean = false;

    @Input() searchModel: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;

    @Output() itemClickEvent = new EventEmitter<any>();

    @Output() searchEvent = new EventEmitter<any>();

    @ViewChild('searchInput') searchInput: QueryList<ElementRef>;

    constructor(public _search: SearchService,
        public e: ElementRef) {
    }
    search_result: any = [];
    search_keyword: any;
    public animating: boolean;
    theme: String = 'default';

    ngOnInit() {
        const end = this.getArray(this.model, this.search_keyword);
        this.model = end;
    }

    keyInput(keyword: string) {
        this.search(keyword);
    }

    keyInputBlur() {
        this.inputFocus = false;
    }
    keyInputFocus(keyword: string) {
        this.inputFocus = true;
        this.search(keyword);
    }

    handleClick(event: any, item: any) {
        // 把搜索后点击的对应的结果暴露出去
        this.itemClickEvent.emit(item);
        console.log(item);
        this.notFound = true;
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

    getArray(data: any, name: any, parent?: any) {
        for (const i in data) {
            if (data) {
                const patt = new RegExp(name, 'i');
                if (patt.test(data[i].label)) {
                    if (!parent) {
                        // 如果没有父级了，也就是说这个就是根级，那可以直接输出到结果
                        this.search_result.push(data[i]);
                    } else if (parent) {
                        // 如果它有父级, 它的父级会被展开
                        this.search_result.push(data[i]);
                    }
                }
                if (data[i].items) {
                    // 如果包含子级的话
                    if (!parent) {
                        // 根级，parents中push自己进去即可
                        this.getArray(data[i].items, name, data[i]);
                    } else if (parent) {
                        // 非根级，继承父级的parents属性并push自己
                        this.getArray(data[i].items, name, data[i]);
                    }
                }
            }
        }
        return this.search_result;
    }

    search(key: String) {
        // 执行搜索， 搜索出结果之后把结果放到服务里存起来，并且把点击事件和结果发送暴露出去
        if (key === '' || key === undefined) { // 如果关键字是空字符，则为未找到
            this.notFound = true;
            return;
        }
        this.search_result = [];
        const end = this.getArray(this.searchModel, key);

        if (end.length === 0) { // 如果搜索结果长度为0 ，则为未找到
            this.notFound = true;
            return;
        }
        this._search.searchResult(end);
        this.model = end;
        this.searchEvent.emit(end);
        this.notFound = false;
    }
    MouseHover(item: any) {

    }

    onToggleDone() {
        this.animating = false;
    }
    componentClick(item: any) {
        this.itemClickEvent.emit(item);
    }

}
