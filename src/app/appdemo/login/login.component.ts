import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [
        trigger('passwordShowAnimation', [
            state('hidden', style({
                display: 'none',
                width: 0
            })),
            state('visible', style({
                display: 'block',
                width: '500px'
            })),
            transition('visible <=> hidden', animate('800ms cubic-bezier(0.68, -0.55, 0.27, 1.55)'))
        ])]
})
export class LoginComponent implements OnInit {

    passwordShow: Boolean = false;

    constructor() { }

    ngOnInit() {
    }

    getPasswordForm() {
        this.passwordShow = true;
    }

    getloginForm() {
        this.passwordShow = false;
    }

}
