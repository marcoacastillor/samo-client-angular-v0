var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnersRoutingModule } from './owners-routing.module';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { ModalEnterpriseFormComponent } from './modal-enterprise-form/modal-enterprise-form.component';
import { ParameterService } from 'src/app/shared/services/parameter.service';
var OwnersModule = /** @class */ (function () {
    function OwnersModule() {
    }
    OwnersModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                OwnersRoutingModule,
                SharedModule,
                FontAwesomeModule,
            ],
            providers: [
                EnterpriseService, ParameterService
            ],
            declarations: [OwnerListComponent, ModalEnterpriseFormComponent]
        })
    ], OwnersModule);
    return OwnersModule;
}());
export { OwnersModule };
//# sourceMappingURL=owners.module.js.map