import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ModulesMainComponent } from './modules-main/modules-main.component';


const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent,
    children: [
      {
        path: 'administration',
        loadChildren: './administration/administration.module#AdministrationModule'
        //loadChildren: () => AdministrationModule,
      },
      {
        path: 'configuration',
        loadChildren: './configuration/configuration.module#ConfigurationModule'
        //loadChildren: () => ConfigurationModule,
      },
      {
        path: 'purchases',
        loadChildren: './purchase/purchase.module#PurchaseModule'
        //loadChildren: () => PurchaseModule
      },
      {
        path: 'sales',
        loadChildren: './sales/sales.module#SalesModule'
        //loadChildren: () => SalesModule
      },
      {
        path: 'stocks',
        loadChildren: './stock/stock.module#StockModule'
        //loadChildren: () => StockModule
      },
      {
        path: 'human-resource',
        loadChildren: './human-resource/human-resource.module#HumanResourceModule'
        //loadChildren: () => HumanResourceModule
      },
      {
        path: 'expenses',
        loadChildren: './expenses/expenses.module#ExpensesModule'
        //loadChildren: () => HumanResourceModule
      },
      {
        path: 'enterprises',
        loadChildren: './enterprises/enterprises.module#EnterprisesModule'
      },
      {
        path: 'production-process',
        loadChildren: './production/production.module#ProductionModule'
      }
    ]
  },
  {
    path:'modules',
    component: ModulesMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
