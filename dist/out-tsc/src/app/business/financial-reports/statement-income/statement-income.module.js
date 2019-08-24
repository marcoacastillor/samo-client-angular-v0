var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatementIncomeRoutingModule } from './statement-income-routing.module';
import { StatementIncomeShowComponent } from './statement-income-show/statement-income-show.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
var StatementIncomeModule = /** @class */ (function () {
    function StatementIncomeModule() {
    }
    StatementIncomeModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                StatementIncomeRoutingModule,
                SharedModule,
                FontAwesomeModule,
                OwlDateTimeModule,
                OwlNativeDateTimeModule,
            ],
            providers: [
                ParameterService
            ],
            declarations: [StatementIncomeShowComponent]
        })
    ], StatementIncomeModule);
    return StatementIncomeModule;
}());
export { StatementIncomeModule };
//# sourceMappingURL=statement-income.module.js.map