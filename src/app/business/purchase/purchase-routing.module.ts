import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminOrderComponent } from './order/admin-order/admin-order.component';
import { AdminPurchaseReportComponent } from './purchase-report/admin-purchase-report/admin-purchase-report.component';
import { NewOrderFileComponent } from './order-file/new-order-file/new-order-file.component';
import { ListOrderDetailComponent } from './order-detailed/list-order-detail/list-order-detail.component';
import { NewOrderDetailComponent } from './order-detailed/new-order-detail/new-order-detail.component';
import { ShowOrderDetailComponent } from './order-detailed/show-order-detail/show-order-detail.component';

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
  },
  {
    path: 'purchase-detailed',
    component: ListOrderDetailComponent,
  },
  {
    path: 'purchase-detailed-new',
    component: NewOrderDetailComponent,
  },
  {
    path: 'purchase-detailed-show/:id',
    component: ShowOrderDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
