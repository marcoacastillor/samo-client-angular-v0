import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceManagerRoutingModule } from './service-manager-routing.module';
import { ServiceManagerListComponent } from './service-manager-list/service-manager-list.component';
import { ServiceManagerShowComponent } from './service-manager-show/service-manager-show.component';
import { ServiceManagerCreateComponent } from './service-manager-create/service-manager-create.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { TypeServiceService } from 'src/app/shared/services/type-service.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  imports: [
    CommonModule,
    ServiceManagerRoutingModule,
    SharedModule,
    FontAwesomeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  providers: [
    TypeServiceService, EnterpriseService
  ],
  declarations: [ServiceManagerListComponent, ServiceManagerShowComponent, ServiceManagerCreateComponent]
})
export class ServiceManagerModule { }
