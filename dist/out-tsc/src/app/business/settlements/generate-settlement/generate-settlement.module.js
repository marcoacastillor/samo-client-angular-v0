var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateSettlementRoutingModule } from './generate-settlement-routing.module';
import { SettlementListComponent } from './settlement-list/settlement-list.component';
import { SettlementFormComponent } from './settlement-form/settlement-form.component';
import { SettlementShowComponent } from './settlement-show/settlement-show.component';
import { CuttingPeriodService } from 'src/app/shared/services/cutting-period.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PayingEmployeeService } from 'src/app/shared/services/paying-employee.service';
import { WorkerNewService } from 'src/app/shared/services/worker-new.service';
import { ModalWorkerNewShowComponent } from './modal-worker-new-show/modal-worker-new-show.component';
import { DetailProductInputService } from 'src/app/shared/services/detail-product-input.service';
import { LaboralConditionService } from 'src/app/shared/services/laboral-condition.service';
var GenerateSettlementModule = /** @class */ (function () {
    function GenerateSettlementModule() {
    }
    GenerateSettlementModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                GenerateSettlementRoutingModule,
                SharedModule,
                FontAwesomeModule,
            ],
            providers: [
                CuttingPeriodService, PayingEmployeeService, WorkerNewService, LaboralConditionService, DetailProductInputService
            ],
            declarations: [SettlementListComponent, SettlementFormComponent, SettlementShowComponent, ModalWorkerNewShowComponent]
        })
    ], GenerateSettlementModule);
    return GenerateSettlementModule;
}());
export { GenerateSettlementModule };
//# sourceMappingURL=generate-settlement.module.js.map