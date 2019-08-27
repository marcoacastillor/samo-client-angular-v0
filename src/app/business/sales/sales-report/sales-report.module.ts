import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesReportRoutingModule } from './sales-report-routing.module';
import { SalesReportsMainComponent } from './sales-reports-main/sales-reports-main.component';
import { SalesReportsByDatesComponent } from './sales-reports-by-dates/sales-reports-by-dates.component';
import { SalesReportsByDebtTimeComponent } from './sales-reports-by-debt-time/sales-reports-by-debt-time.component';
import { SalesReportsByClientComponent } from './sales-reports-by-client/sales-reports-by-client.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PersonService } from 'src/app/shared/services/person.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { OperationProductService } from 'src/app/shared/services/operation-product.service';

@NgModule({
  imports: [
    CommonModule,
    SalesReportRoutingModule,
    SharedModule,
    FontAwesomeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  providers: [
    OperationService, ParameterService, OperationProductService, PersonService
  ],
  declarations: [SalesReportsMainComponent, SalesReportsByDatesComponent, SalesReportsByDebtTimeComponent, SalesReportsByClientComponent]
})
export class SalesReportModule { }
