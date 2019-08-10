import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialReportsRoutingModule } from './financial-reports-routing.module';
import { FinancialReportService } from 'src/app/shared/services/financial-report.service';

@NgModule({
  imports: [
    CommonModule,
    FinancialReportsRoutingModule
  ],
  providers: [
    FinancialReportService
  ],
  declarations: []
})
export class FinancialReportsModule { }
