var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExpensesService } from 'src/app/shared/services/expenses.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ParameterConfigService } from 'src/app/shared/services/parameter-config.service';
var ExpensesModule = /** @class */ (function () {
    function ExpensesModule() {
    }
    ExpensesModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                CommonModule,
                SharedModule,
                ExpensesRoutingModule
            ],
            providers: [
                GlobalStoreService, ExpensesService, ParameterService, FormToolsService, UtilsService, ParameterConfigService
            ],
            declarations: []
        })
    ], ExpensesModule);
    return ExpensesModule;
}());
export { ExpensesModule };
//# sourceMappingURL=expenses.module.js.map