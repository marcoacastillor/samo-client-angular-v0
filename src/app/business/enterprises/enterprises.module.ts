import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnterprisesRoutingModule } from './enterprises-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { AdminProviderComponent } from './providers/admin-provider/admin-provider.component';
import { AdminOwnerComponent } from './owners/admin-owner/admin-owner.component';
import { ShowProviderComponent } from './providers/show-provider/show-provider.component';
import { ListProviderComponent } from './providers/list-provider/list-provider.component';
import { NewProviderComponent } from './providers/new-provider/new-provider.component';
import { ListOwnerComponent } from './owners/list-owner/list-owner.component';
import { ShowOwnerComponent } from './owners/show-owner/show-owner.component';
import { NewOwnerComponent } from './owners/new-owner/new-owner.component';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { NewPositionComponent } from './owners/show-owner/positions/new-position/new-position.component';
import { ListPositionComponent } from './owners/show-owner/positions/list-position/list-position.component';
import { PositionService } from 'src/app/shared/services/position.service';
import { ShowInfoComponent } from './my-enterprise/show-info/show-info.component';
import { MainInfoComponent } from './my-enterprise/main-info/main-info.component';
import { PositionsComponent } from './my-enterprise/positions/positions.component';
import { ParametersComponent } from './my-enterprise/parameters/parameters.component';
import { EmployeeComponent } from './my-enterprise/employee/employee.component';
import { PersonService } from 'src/app/shared/services/person.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';


@NgModule({
  imports: [
    CommonModule,
    EnterprisesRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ],
  providers: [EnterpriseService, GlobalStoreService, PositionService, PersonService, ParameterService],
  declarations: [AdminProviderComponent, AdminOwnerComponent, ShowProviderComponent, ListProviderComponent, NewProviderComponent, ListOwnerComponent, ShowOwnerComponent, NewOwnerComponent, NewPositionComponent, ListPositionComponent, ShowInfoComponent, MainInfoComponent, PositionsComponent, ParametersComponent, EmployeeComponent]
})
export class EnterprisesModule { }
