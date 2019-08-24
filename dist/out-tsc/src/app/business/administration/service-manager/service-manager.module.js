var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var ServiceManagerModule = /** @class */ (function () {
    function ServiceManagerModule() {
    }
    ServiceManagerModule = __decorate([
        NgModule({
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
    ], ServiceManagerModule);
    return ServiceManagerModule;
}());
export { ServiceManagerModule };
//# sourceMappingURL=service-manager.module.js.map