import {
    Component,
    OnInit,
    ViewEncapsulation,
    Input,
    Output,
    AfterContentInit,
    AfterContentChecked,
    HostListener,
    EventEmitter,
    ElementRef,
    Renderer2,
    ViewChild,
    forwardRef,
    Inject,
} from '@angular/core';
import {
    animate,
    AnimationTriggerMetadata,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { DOWN_ARROW, ENTER, TAB } from '@angular/cdk/keycodes';
import { OptionComponent } from './option.component';
import { OptionPipe } from './option.pipe';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'cherry-select',
    templateUrl: './select.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ],
    animations: [
        trigger('dropDownAnimation', [
            state('bottom', style({
                opacity: 1,
                transform: 'scaleY(1)',
                transformOrigin: '0% 0%'
            })),
            transition('void => bottom', [
                style({
                    opacity: 0,
                    transform: 'scaleY(0)',
                    transformOrigin: '0% 0%'
                }),
                animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)')
            ]),
            state('top', style({
                opacity: 1,
                transform: 'scaleY(1)',
                transformOrigin: '0% 100%'
            })),
            transition('void => top', [
                style({
                    opacity: 0,
                    transform: 'scaleY(0)',
                    transformOrigin: '0% 100%'
                }),
                animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)')
            ]),
            transition('* => void', [
                animate('250ms 100ms linear', style({ opacity: 0 }))
            ])
        ]),
        trigger('tagAnimation', [
            state('*', style({ opacity: 1, transform: 'scale(1)' })),
            transition('void => *', [
                style({ opacity: 0, transform: 'scale(0)' }),
                animate('150ms linear')
            ]),
            state('void', style({ opacity: 0, transform: 'scale(0)' })),
            transition('* => void', [
                style({ opacity: 1, transform: 'scale(1)' }),
                animate('150ms linear')
            ])
        ])
    ]
})
export class SelectComponent implements OnInit, AfterContentInit, AfterContentChecked, ControlValueAccessor {
    _el: HTMLElement;
    _prefixCls = 'cherry-ui-select';
    _classList: Array<string> = [];
    _dropDownClassMap: any;
    _dropDownPrefixCls = `${this._prefixCls}-dropdown`;
    _selectionClassMap: any;
    _selectionPrefixCls = `${this._prefixCls}-selection`;
    _size: string;
    _value: Array<string> | string;
    _placeholder = 'Placeholder';
    _notFoundContent = 'notFound';
    _isOpen = false;
    _disabled = false;
    _showSearch = false;
    _isTags = false;
    _searchText = '';
    _triggerWidth = 0;
    _selectedOption: OptionComponent;
    _operatingMultipleOption: OptionComponent;
    _selectedOptions: Set<OptionComponent> = new Set();
    _options: Array<OptionComponent> = [];
    _cacheOptions: Array<OptionComponent> = [];
    _filterOptions: Array<OptionComponent> = [];
    _tagsOptions: Array<OptionComponent> = [];
    _activeFilterOption: OptionComponent;
    _isMultiInit = false;
    _dropDownPosition: 'top' | 'bottom' = 'bottom';
    _isMultiple = false;
    _composing = false;
    _mode: any;
    _keepUnListOptions = false;
    _allowClear = false;
    // ngModel Access
    onChange: any = Function.prototype;
    onTouched: any = Function.prototype;
    @ViewChild('searchInput') searchInputElementRef: ElementRef;
    @ViewChild('trigger') trigger: ElementRef;
    @ViewChild('dropdownUl') dropdownUl: ElementRef;
    @Output() uiSearchChange: EventEmitter<any> = new EventEmitter();
    @Output() uiOpenChange: EventEmitter<any> = new EventEmitter();
    @Output() uiScrollToBottom: EventEmitter<boolean> = new EventEmitter();
    @Input() uiFilter = true;
    @Input() uiMaxMultiple = Infinity;

    @Input()
    set uiAllowClear(value: boolean | string) {
        if (value === '') {
            this._allowClear = true;
        } else {
            this._allowClear = value as boolean;
        }
    }

    get uiAllowClear() {
        return this._allowClear;
    }

    @Input()
    set uiKeepUnListOptions(value: boolean | string) {
        if (value === '') {
            this._keepUnListOptions = true;
        } else {
            this._keepUnListOptions = value as boolean;
        }
    }

    get uiKeepUnListOptions() {
        return this._keepUnListOptions;
    }

    @Input()
    set uiMode(value: any) {
        this._mode = value;
        if (this._mode === 'multiple') {
            this.uiMultiple = true;
        } else if (this._mode === 'tags') {
            this.uiTags = true;
        } else if (this._mode === 'combobox') {
            this.uiShowSearch = true;
        }
    }

    @Input()
    set uiMultiple(value) {
        this._isMultiple = value;
        if (this._isMultiple) {
            this.uiShowSearch = true;
        }
    }

    get uiMultiple() {
        return this._isMultiple;
    }

    @Input()
    get uiPlaceHolder(): string {
        return this._placeholder;
    }

    set uiPlaceHolder(value: string) {
        this._placeholder = value;
    }

    @Input()
    get uiNotFoundContent(): string {
        return this._notFoundContent;
    }

    set uiNotFoundContent(value: string) {
        this._notFoundContent = value;
    }

    @Input()
    get uiSize(): string {
        return this._size;
    }

    set uiSize(value: string) {
        this._size = value;
        this.setClassMap();
    }

    @Input()
    get uiShowSearch(): boolean {
        return this._showSearch;
    }

    set uiShowSearch(value: boolean) {
        this._showSearch = value;
    }


    @Input()
    get uiTags(): boolean {
        return this._isTags;
    }

    set uiTags(value: boolean) {
        this._isTags = value;
        this.uiMultiple = value;
    }

    @Input()
    get uiDisabled(): boolean {
        return this._disabled;
    }

    set uiDisabled(value: boolean) {
        this._disabled = value;
        this.closeDropDown();
        this.setClassMap();
    }

    @Input()
    get uiOpen(): boolean {
        return this._isOpen;
    }

    set uiOpen(value: boolean) {
        if (this._isOpen === value) {
            return;
        }
        if (value === true) {
            this.scrollToActive();
            if (!this._triggerWidth) {
                this._setTriggerWidth();
            }
        }
        this._isOpen = value;
        this.uiOpenChange.emit(this._isOpen);
        this.setClassMap();
    }

    /** new ui-option insert or new tags insert */
    addOption = (option: any) => {
        this._options.push(option);
        if (!this._isTags) {
            if (option.uiValue) {
                this.updateSelectedOption(this._value);
            } else {
                this.forceUpdateSelectedOption(this._value);
            }
        }
    }

    /** ui-option remove or tags remove */
    removeOption(option: any) {
        this._options.splice(this._options.indexOf(option), 1);
        if (!this._isTags) {
            this.forceUpdateSelectedOption(this._value);
        }
    }

    /** dropdown position changed */
    onPositionChange(position: any) {
        this._dropDownPosition = position.connectionPair.originY;
    }

    compositionStart() {
        this._composing = true;
    }

    compositionEnd() {
        this._composing = false;
    }

    /** clear single selected option */
    clearSelect($event?: any) {
        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }
        this._selectedOption = null;
        this.uiValue = null;
        this.onChange(null);
    }

    /** click dropdown option by user */
    clickOption(option: any, $event?: any) {
        if (!option) {
            return;
        }
        this.chooseOption(option, true, $event);
        this.clearSearchText();
        if (!this._isMultiple) {
            this.uiOpen = false;
        }
    }

    /** choose option */
    chooseOption(option: any, isUserClick = false, $event?: any) {
        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }
        this._activeFilterOption = option;
        if (option && !option.uiDisabled) {
            if (!this.uiMultiple) {
                this._selectedOption = option;
                this._value = option.uiValue;
                if (isUserClick) {
                    this.onChange(option.uiValue);
                }
            } else {
                if (isUserClick) {
                    this.isInSet(this._selectedOptions, option) ? this.unSelectMultipleOption(option) : this.selectMultipleOption(option);
                }
            }
        }
    }

    updateWidth(element: any, text: any) {
        if (text) {
            /** wait for scroll width change */
            setTimeout(() => {
                this._renderer.setStyle(element, 'width', `${element.scrollWidth}px`);
            });
        } else {
            this._renderer.removeStyle(element, 'width');
        }
    }
    dropDownScroll(ul: HTMLUListElement): void {
        if (ul && (ul.scrollHeight - ul.scrollTop === ul.clientHeight)) {
            this.uiScrollToBottom.emit(true);
        }
    }

    checkDropDownScroll(): void {
        if (this.dropdownUl && (this.dropdownUl.nativeElement.scrollHeight === this.dropdownUl.nativeElement.clientHeight)) {
            this.uiScrollToBottom.emit(true);
        }
    }
    /** determine if option in set */
    isInSet(set: any, option: any) {
        return ((Array.from(set) as Array<OptionComponent>).find((data: OptionComponent) => data.uiValue === option.uiValue));
    }

    /** cancel select multiple option */
    unSelectMultipleOption = (option: any, $event?: any, emitChange = true) => {
        this._operatingMultipleOption = option;
        this._selectedOptions.delete(option);
        if (emitChange) {
            this.emitMultipleOptions();
        }

        // 对Tag进行特殊处理
        if (this._isTags && (this._options.indexOf(option) !== -1) && (this._tagsOptions.indexOf(option) !== -1)) {
            this.removeOption(option);
            this._tagsOptions.splice(this._tagsOptions.indexOf(option), 1);
        }
        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }
    }

    /** select multiple option */
    selectMultipleOption(option: any, $event?: any) {
        /** if tags do push to tag option */
        if (this._isTags && (this._options.indexOf(option) === -1) && (this._tagsOptions.indexOf(option) === -1)) {
            this.addOption(option);
            this._tagsOptions.push(option);
        }
        this._operatingMultipleOption = option;
        if (this._selectedOptions.size < this.uiMaxMultiple) {
            this._selectedOptions.add(option);
        }
        this.emitMultipleOptions();

        if ($event) {
            $event.preventDefault();
            $event.stopPropagation();
        }
    }

    /** emit multiple options */
    emitMultipleOptions() {
        if (this._isMultiInit) {
            return;
        }
        const arrayOptions = <any>Array.from(this._selectedOptions);
        this.onChange(arrayOptions.map((item: any) => item.uiValue));
    }

    /** update selected option when add remove option etc */
    updateSelectedOption(currentModelValue: any, triggerByNgModel = false) {
        if (currentModelValue === null) {
            return;
        }
        if (this.uiMultiple) {
            const selectedOptions = this._options.filter((item) => {
                return (item != null) && (JSON.stringify(currentModelValue).indexOf(item.uiValue) !== -1);
            });
            if ((this.uiKeepUnListOptions || this.uiTags) && (!triggerByNgModel)) {
                const _selectedOptions = Array.from(this._selectedOptions);
                selectedOptions.forEach(option => {
                    const _exist = _selectedOptions.some(item => item._value === option._value);
                    if (!_exist) {
                        this._selectedOptions.add(option);
                    }
                });
            } else {
                this._selectedOptions = new Set();
                selectedOptions.forEach(option => {
                    this._selectedOptions.add(option);
                });
            }

        } else {
            const selectedOption = this._options.filter((item) => {
                return (item != null) && (item.uiValue === currentModelValue);
            });
            this.chooseOption(selectedOption[0]);
        }
    }

    forceUpdateSelectedOption(value: any) {
        /** trigger dirty check */
        setTimeout(() => {
            this.updateSelectedOption(value);
        });
    }

    get uiValue(): string | Array<string> {
        return this._value;
    }

    set uiValue(value: Array<string> | string) {
        this._updateValue(value);
    }

    clearAllSelectedOption(emitChange = true) {
        this._selectedOptions.forEach(item => {
            this.unSelectMultipleOption(item, null, emitChange);
        });
    }

    handleKeyEnterEvent(event: any) {
        /** when composing end */
        if (!this._composing && this._isOpen) {
            event.preventDefault();
            event.stopPropagation();
            this.updateFilterOption(false);
            this.clickOption(this._activeFilterOption);
        }
    }

    handleKeyBackspaceEvent(event: any) {
        if ((!this._searchText) && (!this._composing) && (this._isMultiple)) {
            event.preventDefault();
            const lastOption = Array.from(this._selectedOptions).pop();
            this.unSelectMultipleOption(lastOption);
        }
    }

    handleKeyDownEvent($event: MouseEvent) {
        if (this._isOpen) {
            $event.preventDefault();
            $event.stopPropagation();
            this._activeFilterOption = this.nextOption(this._activeFilterOption, this._filterOptions);
            this.scrollToActive();
        }
    }

    handleKeyUpEvent($event: MouseEvent) {
        if (this._isOpen) {
            $event.preventDefault();
            $event.stopPropagation();
            this._activeFilterOption = this.preOption(this._activeFilterOption, this._filterOptions);
            this.scrollToActive();
        }
    }

    preOption(option: any, options: any) {
        return options[options.indexOf(option) - 1] || options[options.length - 1];
    }

    nextOption(option: any, options: any) {
        return options[options.indexOf(option) + 1] || options[0];
    }

    clearSearchText() {
        this._searchText = '';
        this.updateFilterOption();
    }

    updateFilterOption(updateActiveFilter = true) {
        if (this.uiFilter) {
            this._filterOptions = new OptionPipe().transform(this._options, {
                'searchText': this._searchText,
                'tags': this._isTags,
                'notFoundContent': this._isTags ? this._searchText : this._notFoundContent,
                'disabled': !this._isTags,
                'value': this._isTags ? this._searchText : 'disabled'
            });
        } else {
            this._filterOptions = this._options;
        }

        /** TODO: cause pre & next key selection not work */
        if (updateActiveFilter && !this._selectedOption) {
            this._activeFilterOption = this._filterOptions[0];
        }
    }

    onSearchChange(searchValue: any) {
        this.uiSearchChange.emit(searchValue);
    }


    @HostListener('click', ['$event'])
    onClick(e: any) {
        e.preventDefault();
        if (!this._disabled) {
            this.uiOpen = !this.uiOpen;
            if (this.uiShowSearch) {
                /** wait for search display */
                setTimeout(() => {
                    this.searchInputElementRef.nativeElement.focus();
                });
            }
        }
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(e: any) {
        const keyCode = e.keyCode;
        if (keyCode === TAB && this.uiOpen) {
            this.uiOpen = false;
            return;
        }
        if ((keyCode !== DOWN_ARROW && keyCode !== ENTER) || this.uiOpen) {
            return;
        }
        e.preventDefault();
        if (!this._disabled) {
            this.uiOpen = true;
            if (this.uiShowSearch) {
                /** wait for search display */
                setTimeout(() => {
                    this.searchInputElementRef.nativeElement.focus();
                });
            }
        }
    }

    closeDropDown() {
        if (!this.uiOpen) {
            return;
        }
        this.onTouched();
        if (this.uiMultiple) {
            this._renderer.removeStyle(this.searchInputElementRef.nativeElement, 'width');
        }
        this.clearSearchText();
        this.uiOpen = false;
    }

    setClassMap(): void {
        this._classList.forEach(_className => {
            this._renderer.removeClass(this._el, _className);
        });
        this._classList = [
            this._prefixCls,
            (this._mode === 'combobox') && `${this._prefixCls}-combobox`,
            (!this._disabled) && `${this._prefixCls}-enabled`,
            (this._disabled) && `${this._prefixCls}-disabled`,
            this._isOpen && `${this._prefixCls}-open`,
            this._showSearch && `${this._prefixCls}-show-search`,
            this._size && `${this._prefixCls}-${this._size}`
        ].filter((item) => {
            return !!item;
        });
        this._classList.forEach(_className => {
            this._renderer.addClass(this._el, _className);
        });
        this._selectionClassMap = {
            [this._selectionPrefixCls]: true,
            [`${this._selectionPrefixCls}--single`]: !this.uiMultiple,
            [`${this._selectionPrefixCls}-multiple`]: this.uiMultiple
        };
    }

    setDropDownClassMap(): void {
        this._dropDownClassMap = {
            [this._dropDownPrefixCls]: true,
            ['component-select']: this._mode === 'combobox',
            [`${this._dropDownPrefixCls}--single`]: !this.uiMultiple,
            [`${this._dropDownPrefixCls}-multiple`]: this.uiMultiple,
            [`${this._dropDownPrefixCls}-placement-bottomLeft`]: this._dropDownPosition === 'bottom',
            [`${this._dropDownPrefixCls}-placement-topLeft`]: this._dropDownPosition === 'top'
        };
    }


    scrollToActive(): void {
        /** wait for dropdown display */
        setTimeout(() => {
            if (this._activeFilterOption && this._activeFilterOption.uiValue) {
                const index = this._filterOptions.findIndex(option => option.uiValue === this._activeFilterOption.uiValue);
                try {
                    const scrollPane: any = this.dropdownUl.nativeElement.children[index];
                    scrollPane.scrollIntoViewIfNeeded(false);
                } catch (e) {
                }
            }
        });
    }

    flushComponentState() {
        this.updateFilterOption();
        if (!this.uiMultiple) {
            this.updateSelectedOption(this._value);
        } else {
            if (this._value) {
                this.updateSelectedOption(this._value);
            }
        }
    }

    _setTriggerWidth(): void {
        this._triggerWidth = this._getTriggerRect().width;
    }

    _getTriggerRect(): ClientRect {
        return this.trigger.nativeElement.getBoundingClientRect();
    }

    writeValue(value: any): void {
        this._updateValue(value, false);
    }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.uiDisabled = isDisabled;
    }

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        this._el = this._elementRef.nativeElement;
    }

    ngAfterContentInit() {
        if (this._value != null) {
            this.flushComponentState();
        }
    }

    ngOnInit() {
        this.updateFilterOption();
        this.setClassMap();
        this.setDropDownClassMap();
    }

    ngAfterContentChecked() {
        if (this._cacheOptions !== this._options) {
            /** update filter option after every content check cycle */
            this.updateFilterOption();
            this._cacheOptions = this._options;
        } else {
            this.updateFilterOption(false);
        }
    }

    private _updateValue(value: string[] | string, emitChange = true) {
        if (this._value === value) {
            return;
        }
        if ((value == null) && this.uiMultiple) {
            this._value = [];
        } else {
            this._value = value;
        }
        if (!this.uiMultiple) {
            if (value == null) {
                this._selectedOption = null;
            } else {
                this.updateSelectedOption(value);
            }
        } else {
            if (value) {
                if (value.length === 0) {
                    this.clearAllSelectedOption(emitChange);
                } else {
                    this.updateSelectedOption(value, true);
                }
            } else if (value == null) {
                this.clearAllSelectedOption(emitChange);
            }
        }
    }
}
