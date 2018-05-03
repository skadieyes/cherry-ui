import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ComponentsComponent } from '../example/components.component';
import { LoginComponent } from './appdemo/login/login.component';

export const routes: Routes = [
    // { path: 'components', loadChildren: '../example/components.module#ComponentShowIndexModule' }, // 样例
    { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
    { path: 'dashboard/app/login', component: LoginComponent },
    { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule' },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent },

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
