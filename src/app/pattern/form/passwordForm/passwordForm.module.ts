import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordFormComponent } from './passwordForm.component';
import { InputModule, ButtonModule, CardModule, GridModule } from '../../../components';
@NgModule({
    imports: [
        CommonModule,
        InputModule,
        ButtonModule,
        CardModule,
        GridModule
    ],
    declarations: [PasswordFormComponent],
    exports: [PasswordFormComponent]
})
export class PasswordFormModule {

}

