import { NgModule, Component, ElementRef, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MenuItem } from '../common/menuitem';
import { LayoutComponent } from './layout.component';
import { VerticalTabMenuModule } from '../verticalTabMenu/verticalTabMenu.module';
import { BlockMenuBarModule } from '../blockMenuBar/blockMenuBar.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { AccordionMenuModule } from '../accordionMenu/accordionMenu.module';
import { IconMenuModule } from '../iconMenu/iconMenu.module';

import { HeaderComponent } from './header/header.component';
import { HeadmenubarComponent } from './headmenubar/headmenubar.component';
import { MainComponent } from './main/main.component';
import { SearchModule } from '../../components/search/search.module';
import { BlockMenuModule } from '../blockMenu/blockMenu.module';
import { FlexibleMenuModule } from '../flexibleMenu/flexibleMenu.module';
import { BreadCrumbModule } from '../breadCrumb/breadCrumb.module';
import { RouterModule, ActivatedRoute } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        VerticalTabMenuModule,
        BlockMenuModule,
        BlockMenuBarModule,
        DropdownModule,
        AccordionMenuModule,
        IconMenuModule,
        SearchModule,
        FlexibleMenuModule,
        BreadCrumbModule,
        RouterModule
    ],
    declarations: [LayoutComponent,
        HeaderComponent,
        HeadmenubarComponent,
        MainComponent
    ],
    exports: [LayoutComponent,
        HeaderComponent,
        HeadmenubarComponent,
        MainComponent
    ]
})
export class LayoutModule {
}
