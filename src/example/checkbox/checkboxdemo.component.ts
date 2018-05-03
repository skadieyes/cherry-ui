import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkboxdemo.component.html',
  styleUrls: ['./checkboxdemo.component.scss']
})
export class CheckboxDemoComponent implements OnInit {

    _checked = true;
    allChecked = false;
    indeterminate = true;

    _checkgroups = [
        { label: 'Apple', value: 'Apple', checked: true },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange', disabled: true },
        { label: 'Banana', value: 'Banana' },
        { label: 'WaterMelon', value: 'WaterMelon' }
      ];
      _checkgroupsVertical = [
        { label: 'Apple', value: 'Apple', checked: true },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange', disabled: true  },
        { label: 'Banana', value: 'Banana' },
        { label: 'WaterMelon', value: 'WaterMelon' }
      ];
      _checkgroupsAll = [
        { label: 'Apple', value: 'Apple', checked: true },
        { label: 'Pear', value: 'Pear', checked: false },
        { label: 'Orange', value: 'Orange', checked: false   },
        { label: 'Banana', value: 'Banana', checked: false  },
        { label: 'WaterMelon', value: 'WaterMelon', checked: false  }
      ];

  constructor() { }

  ngOnInit() {
  }
  updateAllChecked() {
    this.indeterminate = false;
    if (this.allChecked) {
      this._checkgroupsAll.forEach(item => item.checked = true);
    } else {
      this._checkgroupsAll.forEach(item => item.checked = false);
    }
  }

  updateSingleChecked() {
    if (this._checkgroupsAll.every(item => item.checked === false)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this._checkgroupsAll.every(item => item.checked === true)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }
}
