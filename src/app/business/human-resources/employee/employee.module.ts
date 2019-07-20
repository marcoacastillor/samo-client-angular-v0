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
    PersonService, ParameterService, FormToolsService, PositionService, ProductService
  ],
  declarations: [EmployeeListComponent, EmployeeFormComponent, EmployeeShowComponent]
})
export class EmployeeModule { }
