import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HumanResourceRoutingModule } from './human-resource-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AdminClientsComponent } from './clients/admin-clients/admin-clients.component';
import { ListClientsComponent } from './clients/list-clients/list-clients.component';
import { NewClientsComponent } from './clients/new-clients/new-clients.component';
import { ShowClientsComponent } from './clients/show-clients/show-clients.component';
import { PersonService } from 'src/app/shared/services/person.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { AdminEmployeeComponent } from './employee/admin-employee/admin-employee.component';
import { ShowEmployeeComponent } from './employee/show-employee/show-employee.component';
import { NewEmployeeComponent } from './employee/new-employee/new-employee.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { UserService } from 'src/app/shared/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HumanResourceRoutingModule,
    FontAwesomeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  providers: [PersonService, GlobalStoreService, ParameterService, EnterpriseService, UserService],
  declarations: [AdminClientsComponent, ListClientsComponent, NewClientsComponent, ShowClientsComponent, AdminEmployeeComponent, ShowEmployeeComponent, NewEmployeeComponent, ListEmployeeComponent]
})
export class HumanResourceModule { }
