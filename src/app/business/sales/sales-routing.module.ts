import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminInvoiceComponent } from './invoice/admin-invoice/admin-invoice.component';
import { AdminSaleReportComponent } from './sale-report/admin-sale-report/admin-sale-report.component';
import { MainSaleDetailComponent } from './sale-detailed/main-sale-detail/main-sale-detail.component';

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
    path: 'invoice-detailed',
    component: MainSaleDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
