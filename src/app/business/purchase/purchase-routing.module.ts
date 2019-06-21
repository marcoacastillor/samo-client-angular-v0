import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminOrderComponent } from './order/admin-order/admin-order.component';
import { AdminPurchaseReportComponent } from './purchase-report/admin-purchase-report/admin-purchase-report.component';
import { NewOrderFileComponent } from './order-file/new-order-file/new-order-file.component';

const routes: Routes = [
  {
    path:'purchase',
    component: AdminOrderComponent
  },
  {
    path:'purchase-file',
    component: NewOrderFileComponent
  },
  {
    path:'purchase-report',
    component: AdminPurchaseReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
