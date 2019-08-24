var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvidersRoutingModule } from './providers-routing.module';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { ProviderShowComponent } from './provider-show/provider-show.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { ModalEnterpriseFormComponent } from './modal-enterprise-form/modal-enterprise-form.component';
import { OperationService } from 'src/app/shared/services/operation.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
var ProvidersModule = /** @class */ (function () {
    function ProvidersModule() {
    }
    ProvidersModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                ProvidersRoutingModule,
                SharedModule,
                FontAwesomeModule,
            ],
            providers: [
                EnterpriseService, OperationService, ParameterService
            ],
            declarations: [ProviderListComponent, ProviderShowComponent, ModalEnterpriseFormComponent]
        })
    ], ProvidersModule);
    return ProvidersModule;
}());
export { ProvidersModule };
//# sourceMappingURL=providers.module.js.map