import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { ArchitectureDemoComponent } from '../../../example/architecture/architecturedemo';
import { ArchitectureComponent } from '../../components/architecture/architecture.component';
import { CarddemoComponent } from '../../../example/card/carddemo.component';
import { FastuseComponent } from '../../../example/fastuse/fastuse.component';
import { GriddemoComponent } from '../../../example/grid/griddemo.component';
import { ButtonDemoComponent } from '../../../example/button/buttondemo.component';
import { InputDemoComponent } from '../../../example/input/inputdemo.component';
import { FormComponent } from '../../pattern/form/form.component';
import { AlertdemoComponent } from '../../../example/alert/alertdemo.component';
import { PasswordChangeComponent } from '../../appdemo/passwordChange/passwordChange.component';
import { LoginComponent } from '../../appdemo/login/login.component';
import { BreadCrumbDemoComponent } from '../../../example/breadCrumb/breadCrumbdemo.component';
import { TooltipDemoComponent } from '../../../example/tooltip/tooltipdemo.component';
import { SelectDemoComponent } from '../../../example/select/selectdemo.component';
import { RadioDemoComponent } from '../../../example/radio/radiodemo.component';
import { CheckboxDemoComponent } from '../../../example/checkbox/checkboxdemo.component';
import { TreeDemoComponent } from '../../../example/tree/treedemo.component';
import { TreeSelectDemoComponent } from '../../../example/treeSelect/treeSelectdemo.component';
import { TabDemoComponent } from '../../../example/tab/tabdemo.component';
import { TableDemoComponent } from '../../../example/table/tabledemo.component';
import { PaginationDemoComponent } from '../../../example/pagination/paginationdemo.component';
import { SearchComponent } from '../../appdemo/search/search.component';
import { LinkageSearchComponent } from '../../appdemo/linkageSearch/linkageSearch.component';
import { ManyTableSearchComponent } from '../../appdemo/manyTableSearch/manyTableSearch.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'component',
                children: [
                    { path: 'use', component: FastuseComponent },
                    { path: 'more' },
                    { path: 'grid', component: GriddemoComponent },
                    { path: 'card', component: CarddemoComponent },
                    { path: 'button', component: ButtonDemoComponent },
                    { path: 'input', component: InputDemoComponent },
                    { path: 'alert', component: AlertdemoComponent },
                    { path: 'breadcrumb', component: BreadCrumbDemoComponent },
                    { path: 'tooltip', component: TooltipDemoComponent },
                    { path: 'select', component: SelectDemoComponent },
                    { path: 'radio', component: RadioDemoComponent },
                    { path: 'checkbox', component: CheckboxDemoComponent },
                    { path: 'tree', component: TreeDemoComponent },
                    { path: 'treeSelect', component: TreeSelectDemoComponent },
                    { path: 'tab', component: TabDemoComponent },
                    { path: 'pagination', component: PaginationDemoComponent },
                    { path: 'table', component: TableDemoComponent }
                ],
            },
            {
                path: 'design'
            },
            {
                path: 'pattern',
                children: [
                    { path: 'use' },
                    { path: 'more' },
                    { path: 'form', component: FormComponent }
                ],
            },
            {
                path: 'app',
                children: [
                    { path: 'use' },
                    { path: 'more' },
                    { path: 'login', component: LoginComponent },
                    { path: 'password', component: PasswordChangeComponent },
                    { path: 'search', component: SearchComponent },
                    { path: 'linkage', component: LinkageSearchComponent },
                    { path: 'manytable', component: ManyTableSearchComponent }
                ],
            }
        ],
    }
];

export const DashboardRoutes: ModuleWithProviders = RouterModule.forChild(routes);
