import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsReportsRoutingModule } from './products-reports-routing.module';
import { ProductReportMainComponent } from './product-report-main/product-report-main.component';
import { ProductReportByDatesComponent } from './product-report-by-dates/product-report-by-dates.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OperationService } from 'src/app/shared/services/operation.service';
import { OperationProductService } from 'src/app/shared/services/operation-product.service';
import { ProductService } from 'src/app/shared/services/product.service';

@NgModule({
  imports: [
    CommonModule,
    ProductsReportsRoutingModule,
    SharedModule,
    FontAwesomeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  providers: [
    OperationProductService, OperationService, ProductService
  ],
  declarations: [ProductReportMainComponent, ProductReportByDatesComponent]
})
export class ProductsReportsModule { }
