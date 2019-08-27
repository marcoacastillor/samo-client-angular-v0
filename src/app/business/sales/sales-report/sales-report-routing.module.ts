import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesReportsMainComponent } from './sales-reports-main/sales-reports-main.component';
import { SalesReportsByDatesComponent } from './sales-reports-by-dates/sales-reports-by-dates.component';
import { SalesReportsByDebtTimeComponent } from './sales-reports-by-debt-time/sales-reports-by-debt-time.component';
import { SalesReportsByClientComponent } from './sales-reports-by-client/sales-reports-by-client.component';

const routes: Routes = [
  {
    path: '',
    component: SalesReportsMainComponent,
  },
  {
    path: 'by-dates',
    component: SalesReportsByDatesComponent 
  },
  {
    path: 'by-debt-time',
    component: SalesReportsByDebtTimeComponent 
  },
  {
    path: 'by-client',
    component: SalesReportsByClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesReportRoutingModule { }
