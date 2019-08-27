import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseReportsMainComponent } from './purchase-reports-main/purchase-reports-main.component';
import { PurchaseReportByDatesComponent } from './purchase-report-by-dates/purchase-report-by-dates.component';
import { PurchaseReportByExternalComponent } from './purchase-report-by-external/purchase-report-by-external.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseReportsMainComponent,
  },
  {
    path: 'by-dates',
    component: PurchaseReportByDatesComponent 
  },
  {
    path: 'by-provider',
    component: PurchaseReportByExternalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseReportsRoutingModule { }
