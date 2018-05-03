import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NotFoundComponent } from './not-found.component';

export const route: Route[] = [
    {
        path: '',
        component: NotFoundComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(route);
