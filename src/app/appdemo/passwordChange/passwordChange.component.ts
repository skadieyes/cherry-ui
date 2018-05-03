import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';
import { Validators } from '@angular/forms/src/validators';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'cherry-passwordchange',
    templateUrl: './passwordChange.component.html',
    styleUrls: ['./passwordChange.component.scss']
})
export class PasswordChangeComponent implements OnInit {

    passwordForm: FormGroup;
    origin: string;
    new: string;
    confirm: string;

    submitDisabled: Boolean = true;

    confirmType: String = 'primary';
    loginType: String = 'primary';

    formError: Boolean = false;
    formSuccess: Boolean = false;

    constructor(fb: FormBuilder) {
        this.passwordForm = fb.group({
            'origin': [this.origin],
            'new': [this.new],
            'confirm': [this.confirm, this.passwordValidator]
        });
    }

    ngOnInit() {
        // 边输入边反馈
        this.passwordForm.valueChanges.subscribe(
            (value: string) => {
                if (!this.passwordForm.valid) {
                    this.submitDisabled = true;
                } else if (this.passwordForm.valid) {
                    this.submitDisabled = false;
                }
                if (this.passwordForm.get('confirm').hasError('notSame') && this.passwordForm.get('confirm').value) {
                    this.confirmType = 'danger';
                } else if (!this.passwordForm.get('confirm').hasError('notSame') && this.passwordForm.get('confirm').value) {
                    this.confirmType = 'primary';
                }

            });
    }

    clear() {
        this.submitDisabled = true;
    }
    cancel() { // 取消事件
        // 发生错误时的视觉反馈
        this.formSuccess = false;
        this.formError = true;
        this.loginType = 'danger';
    }

    passwordValidator(control: FormControl) {
        // 检验再次输入的密码是否与第一次输入的相同的校验器
        if (control.value) {
            const password = (control.root.get('new')).value;
            if (control.value !== password) {
                return { notSame: true };
            }
        }
    }

    onSubmit(value: string) {
        // 提交事件
        console.log(value);
        // 成功时的视觉反馈
        this.formSuccess = true;
        this.formError = false;
        this.loginType = 'primary';
        // 一段时间之后提示消失并跳转
        setTimeout(() => { this.formSuccess = false; }, 1000);
    }

}
