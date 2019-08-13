import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashRegisterRoutingModule } from './cash-register-routing.module';
import { CashRegisterShowComponent } from './cash-register-show/cash-register-show.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { FinancialReportService } from 'src/app/shared/services/financial-report.service';

@NgModule({
  imports: [
    CommonModule,
    CashRegisterRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ],
  providers: [
    FinancialReportService
  ],
  declarations: [CashRegisterShowComponent]
})
export class CashRegisterModule { }
