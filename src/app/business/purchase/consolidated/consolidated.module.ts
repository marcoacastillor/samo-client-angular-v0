import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsolidatedRoutingModule } from './consolidated-routing.module';
import { ReportMainComponent } from './report-main/report-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  imports: [
    CommonModule,
    ConsolidatedRoutingModule,
    SharedModule,
    FontAwesomeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  declarations: [ReportMainComponent]
})
export class ConsolidatedModule { }
