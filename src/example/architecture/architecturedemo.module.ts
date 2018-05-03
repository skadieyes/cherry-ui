import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchitectureDemoComponent } from './architecturedemo';
import { RippleModule, RippleDirective } from '../../app/components/ripple/ripple.directive';
import { MatRipple } from '@angular/material';
import { ArchitectureModule } from '../../app/components/architecture/architecture.module';
@NgModule({
    imports: [
        CommonModule,
        ArchitectureModule
    ],
    declarations: [
        ArchitectureDemoComponent
    ],
    exports: [
        ArchitectureDemoComponent
    ]
})
export class ArchitectureDemoModule { }
