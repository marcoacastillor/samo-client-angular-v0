import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsolidatedSaleRoutingModule } from './consolidated-sale-routing.module';
import { ReportMainComponent } from './report-main/report-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OperationProductService } from 'src/app/shared/services/operation-product.service';

@NgModule({
  imports: [
    CommonModule,
    ConsolidatedSaleRoutingModule,
    SharedModule,
    FontAwesomeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  providers: [
    OperationProductService
  ],
  declarations: [ReportMainComponent]
})
export class ConsolidatedSaleModule { }
