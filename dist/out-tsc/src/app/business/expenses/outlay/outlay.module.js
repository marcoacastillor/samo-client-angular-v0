var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutlayRoutingModule } from './outlay-routing.module';
import { OutlayListComponent } from './outlay-list/outlay-list.component';
import { ExpensesService } from 'src/app/shared/services/expenses.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalExpenseFormComponent } from './modal-expense-form/modal-expense-form.component';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
var OutlayModule = /** @class */ (function () {
    function OutlayModule() {
    }
    OutlayModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                OutlayRoutingModule,
                SharedModule,
                FontAwesomeModule,
            ],
            providers: [
                ExpensesService, EnterpriseService
            ],
            declarations: [OutlayListComponent, ModalExpenseFormComponent]
        })
    ], OutlayModule);
    return OutlayModule;
}());
export { OutlayModule };
//# sourceMappingURL=outlay.module.js.map