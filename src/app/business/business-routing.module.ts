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
      },
      {
        path: 'configuration',
        loadChildren: './configuration/configuration.module#ConfigurationModule'
      },
      {
        path: 'purchases',
        loadChildren: './purchase/purchase.module#PurchaseModule'
      },
      {
        path: 'sales',
        loadChildren: './sales/sales.module#SalesModule'
      },
      {
        path: 'stocks',
        loadChildren: './stock/stock.module#StockModule'
      },
      {
        path: 'products',
        loadChildren: './products/products.module#ProductsModule'
      },
      {
        path: 'human-resource',
        loadChildren: './human-resources/human-resources.module#HumanResourcesModule'
      },
      {
        path: 'enterprises',
        loadChildren: './enterprises/enterprises.module#EnterprisesModule'
      },
      {
        path: 'expenses',
        loadChildren: './expenses/expenses.module#ExpensesModule'
      },
      {
        path: 'production-process',
        loadChildren: './production/production.module#ProductionModule'
      },
      {
        path: 'settlements',
        loadChildren: './settlements/settlements.module#SettlementsModule'
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
