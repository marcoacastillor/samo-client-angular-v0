import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewSaleDetailComponent } from './sale-detailed/new-sale-detail/new-sale-detail.component';
import { ShowSaleDetailComponent } from './sale-detailed/show-sale-detail/show-sale-detail.component';
import { ListSaleDetailComponent } from './sale-detailed/list-sale-detail/list-sale-detail.component';

const routes: Routes = [
  {
    path:'',
    children: [
      {
        path: "consolidated",
        loadChildren: './consolidated-sale/consolidated-sale.module#ConsolidatedSaleModule'
      },
      {
        path: "sales-reports",
        loadChildren: './sales-report/sales-report.module#SalesReportModule',
      }
    ]
  },
  {
    path: 'sales-detailed',
    component: ListSaleDetailComponent,
  },
  {
    path: 'sales-detailed-new',
    component: NewSaleDetailComponent,
  },
  {
    path: 'sales-detailed-show/:id',
    component: ShowSaleDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
