import { ObserversModule } from '@angular/cdk/observers';
// import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabBodyComponent } from './tab-body.component';
import { TabLabelDirective } from './tab-label.directive';
import { TabComponent } from './tab.component';
import { TabsInkBarDirective } from './tabs-ink-bar.directive';
import { TabsNavComponent } from './tabs-nav.component';
import { TabSetComponent } from './tabset.component';

@NgModule({
  declarations: [ TabComponent, TabSetComponent, TabsNavComponent, TabLabelDirective, TabsInkBarDirective, TabBodyComponent ],
  exports     : [ TabComponent, TabSetComponent, TabsNavComponent, TabLabelDirective, TabsInkBarDirective, TabBodyComponent ],
  imports     : [ CommonModule, ObserversModule ]
})
export class TabModule {
}
