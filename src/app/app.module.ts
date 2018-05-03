import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from '../example/components.module';
import { HttpModule } from '@angular/http';
import { LoginModule } from './appdemo/login/login.module';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NotFoundModule,
        HttpModule,
        AppRoutes,
        ComponentsModule,
        LoginModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
