import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminInvoiceComponent } from './invoice/admin-invoice/admin-invoice.component';
import { AdminSaleReportComponent } from './sale-report/admin-sale-report/admin-sale-report.component';
import { NewSaleDetailComponent } from './sale-detailed/new-sale-detail/new-sale-detail.component';
import { ShowSaleDetailComponent } from './sale-detailed/show-sale-detail/show-sale-detail.component';
import { ListSaleDetailComponent } from './sale-detailed/list-sale-detail/list-sale-detail.component';

const routes: Routes = [
  {
    path: 'invoice',
    component: AdminInvoiceComponent
  },
  {
    path: 'sales-report',
    component: AdminSaleReportComponent
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
