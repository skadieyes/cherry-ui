import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VerticalTabMenuModule} from '../verticalTabMenu/verticalTabMenu.module';
import { BlockMenuBarModule } from '../blockMenuBar/blockMenuBar.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { AccordionMenuModule } from '../accordionMenu/accordionMenu.module';
import { IconMenuModule } from '../iconMenu/iconMenu.module';
import { ArchitectureComponent } from './architecture.component';
import { BlockMenuModule } from '../blockMenu/blockMenu.module';

@NgModule({
    imports: [CommonModule,
              FormsModule,
              VerticalTabMenuModule,
              BlockMenuModule,
              BlockMenuBarModule,
              DropdownModule,
              AccordionMenuModule,
              IconMenuModule
             ],
    exports: [ArchitectureComponent],
    declarations: [ArchitectureComponent]
})
export class ArchitectureModule {

}

