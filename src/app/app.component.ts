import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LayoutService } from './components/layout/layout.service';

@Component({
    selector: 'cherry-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('overlayState', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('400ms ease-in')),
            transition('hidden => visible', animate('400ms ease-out'))
        ])
    ]
})
export class AppComponent {

    menuActive: boolean;

    activeMenuId: string;

    changeTheme(event: Event, theme: string) {
        const themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');
        themeLink.href = 'assets/components/themes/' + theme + '/theme.css';
        event.preventDefault();
    }

    onMenuButtonClick(event: Event) {
        this.menuActive = !this.menuActive;
        event.preventDefault();
    }
}