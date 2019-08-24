var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageEnterpriseRoutingModule } from './manage-enterprise-routing.module';
import { EnterpriseShowComponent } from './enterprise-show/enterprise-show.component';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PersonService } from 'src/app/shared/services/person.service';
import { ParameterConfigService } from 'src/app/shared/services/parameter-config.service';
import { PositionService } from 'src/app/shared/services/position.service';
import { ModalPositionFormComponent } from './modal-position-form/modal-position-form.component';
import { ModalParameterFormComponent } from './modal-parameter-form/modal-parameter-form.component';
import { ModalEnterpriseFormComponent } from './modal-enterprise-form/modal-enterprise-form.component';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { ModalEmployeeFormComponent } from './modal-employee-form/modal-employee-form.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
var ManageEnterpriseModule = /** @class */ (function () {
    function ManageEnterpriseModule() {
    }
    ManageEnterpriseModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                ManageEnterpriseRoutingModule,
                SharedModule,
                FontAwesomeModule,
                OwlDateTimeModule,
                OwlNativeDateTimeModule,
            ],
            providers: [
                EnterpriseService, PersonService, ParameterConfigService, PositionService, ParameterService
            ],
            declarations: [EnterpriseShowComponent, ModalPositionFormComponent, ModalParameterFormComponent, ModalEnterpriseFormComponent, ModalEmployeeFormComponent]
        })
    ], ManageEnterpriseModule);
    return ManageEnterpriseModule;
}());
export { ManageEnterpriseModule };
//# sourceMappingURL=manage-enterprise.module.js.map