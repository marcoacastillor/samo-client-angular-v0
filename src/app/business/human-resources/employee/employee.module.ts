import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeShowComponent } from './employee-show/employee-show.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PersonService } from 'src/app/shared/services/person.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { PositionService } from 'src/app/shared/services/position.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { EnterprisePersonService } from 'src/app/shared/services/enterprise-person.service';
import { WorkerNewService } from 'src/app/shared/services/worker-new.service';
import { PayingEmployeeService } from 'src/app/shared/services/paying-employee.service';
import { LaboralConditionService } from 'src/app/shared/services/laboral-condition.service';
import { ModalContractFormComponent } from './modal-contract-form/modal-contract-form.component';
import { ModalLaboralConditionFormComponent } from './modal-laboral-condition-form/modal-laboral-condition-form.component';
import { ModalPersonalFormComponent } from './modal-personal-form/modal-personal-form.component';
import { ModalWorkerNewFormComponent } from './modal-worker-new-form/modal-worker-new-form.component';

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    FontAwesomeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  providers: [
    PersonService, ParameterService, FormToolsService, PositionService, ProductService, EnterprisePersonService, LaboralConditionService, PayingEmployeeService, WorkerNewService
  ],
  declarations: [EmployeeListComponent, EmployeeFormComponent, EmployeeShowComponent, ModalContractFormComponent, ModalLaboralConditionFormComponent, ModalPersonalFormComponent, ModalWorkerNewFormComponent]
})
export class EmployeeModule { }