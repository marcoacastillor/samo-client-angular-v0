import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductReportMainComponent } from './product-report-main/product-report-main.component';
import { ProductReportByDatesComponent } from './product-report-by-dates/product-report-by-dates.component';

const routes: Routes = [
  {
    path: '',
    component: ProductReportMainComponent,
  },
  {
    path: 'by-dates-and-product',
    component: ProductReportByDatesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsReportsRoutingModule { }
