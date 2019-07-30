import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateSettlementRoutingModule } from './generate-settlement-routing.module';
import { SettlementListComponent } from './settlement-list/settlement-list.component';
import { SettlementFormComponent } from './settlement-form/settlement-form.component';
import { SettlementShowComponent } from './settlement-show/settlement-show.component';
import { CuttingPeriodService } from 'src/app/shared/services/cutting-period.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PayingEmployeeService } from 'src/app/shared/services/paying-employee.service';
import { WorkerNewService } from 'src/app/shared/services/worker-new.service';
import { ModalWorkerNewShowComponent } from './modal-worker-new-show/modal-worker-new-show.component';
import { DetailProductInputService } from 'src/app/shared/services/detail-product-input.service';
import { LaboralConditionService } from 'src/app/shared/services/laboral-condition.service';

@NgModule({
  imports: [
    CommonModule,
    GenerateSettlementRoutingModule,
    SharedModule,
    FontAwesomeModule,
    //OwlDateTimeModule, 
    //OwlNativeDateTimeModule,
  ],
  providers:[
    CuttingPeriodService, PayingEmployeeService, WorkerNewService, LaboralConditionService, DetailProductInputService
  ],
  declarations: [SettlementListComponent, SettlementFormComponent, SettlementShowComponent, ModalWorkerNewShowComponent]
})
export class GenerateSettlementModule { }