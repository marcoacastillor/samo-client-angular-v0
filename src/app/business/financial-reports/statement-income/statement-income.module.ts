import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatementIncomeRoutingModule } from './statement-income-routing.module';
import { StatementIncomeShowComponent } from './statement-income-show/statement-income-show.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ReportFormComponent } from './report-form/report-form.component';

@NgModule({
  imports: [
    CommonModule,
    StatementIncomeRoutingModule,
    SharedModule,
    FontAwesomeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  providers: [
    ParameterService
  ],
  declarations: [StatementIncomeShowComponent, ReportFormComponent]
})
export class StatementIncomeModule { }
