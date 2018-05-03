import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';
import { Validators } from '@angular/forms/src/validators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cherry-loginform',
  templateUrl: './loginForm.component.html',
  styleUrls: ['./loginForm.component.scss']
})
export class LoginFormComponent implements OnInit {

    loginForm: FormGroup;
    password: string;
    username: string;

    submitDisabled: Boolean = true;

    loginType: String = 'primary';

    formError: Boolean = false;
    formSuccess: Boolean = false;


    constructor(fb: FormBuilder) {
        this.loginForm = fb.group({
            'username': [this.username],
            'password': [this.password],
        });
    }

    ngOnInit() {
        // 边输入边反馈
        this.loginForm.valueChanges.subscribe(
            (value: string) => {
                if (!this.loginForm.valid) {
                    this.submitDisabled = true;
                } else if (this.loginForm.valid) {
                    this.submitDisabled = false;
                }
            });
    }

    clear() {
        this.submitDisabled = true;
    }

    onSubmit(value: string) {
        // 提交事件
        console.log(value);
        // 成功时的视觉反馈
        this.formSuccess = true;
        this.formError = false;
        // 一段时间之后提示消失并跳转
        this.loginType = 'primary';
        setTimeout(() => { this.formSuccess = false; }, 2000);
    }

    cancel() { // 取消事件
        // 发生错误时的视觉反馈
        this.formSuccess = false;
        this.formError = true;
        this.loginType = 'danger';
    }

}
