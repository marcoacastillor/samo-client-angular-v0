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
import { PaymentServicesService } from 'src/app/shared/services/payment-services.service';
import { ServiceEnterpriseService } from 'src/app/shared/services/service-enterprise.service';
import { FormPaymentModalComponent } from './service-manager-show/form-payment-modal/form-payment-modal.component';
import { AccessEnterpriseService } from 'src/app/shared/services/access-enterprise.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';

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
    TypeServiceService, EnterpriseService, ServiceEnterpriseService, PaymentServicesService, AccessEnterpriseService, ParameterService 
  ],
  declarations: [ServiceManagerListComponent, ServiceManagerShowComponent, ServiceManagerCreateComponent, FormPaymentModalComponent]
})
export class ServiceManagerModule { }

