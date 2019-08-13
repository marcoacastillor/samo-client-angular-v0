import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalanceRoutingModule } from './balance-routing.module';
import { BalanceShowComponent } from './balance-show/balance-show.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FinancialReportService } from 'src/app/shared/services/financial-report.service';
import { ReportFormComponent } from './report-form/report-form.component';

@NgModule({
  imports: [
    CommonModule,
    BalanceRoutingModule,
    SharedModule,
    FontAwesomeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  providers: [
    FinancialReportService
  ],
  declarations: [BalanceShowComponent, ReportFormComponent]
})
export class BalanceModule { }
