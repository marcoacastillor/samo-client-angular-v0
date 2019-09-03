import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'stocks',
        loadChildren: './stocks/stocks.module#StocksModule'
      },
      {
        path: 'products-reports',
        loadChildren: './products-reports/products-reports.module#ProductsReportsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
