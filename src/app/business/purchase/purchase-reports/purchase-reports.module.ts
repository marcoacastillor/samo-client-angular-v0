import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseReportsRoutingModule } from './purchase-reports-routing.module';
import { PurchaseReportsMainComponent } from './purchase-reports-main/purchase-reports-main.component';
import { PurchaseReportByDatesComponent } from './purchase-report-by-dates/purchase-report-by-dates.component';
import { PurchaseReportByExternalComponent } from './purchase-report-by-external/purchase-report-by-external.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OperationService } from 'src/app/shared/services/operation.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { OperationProductService } from 'src/app/shared/services/operation-product.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';

@NgModule({
  imports: [
    CommonModule,
    PurchaseReportsRoutingModule,
    SharedModule,
    FontAwesomeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  providers: [
    OperationService, ParameterService, OperationProductService, EnterpriseService
  ],
  declarations: [PurchaseReportsMainComponent, PurchaseReportByDatesComponent, PurchaseReportByExternalComponent]
})
export class PurchaseReportsModule { }
