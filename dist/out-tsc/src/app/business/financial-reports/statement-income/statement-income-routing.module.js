var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatementIncomeShowComponent } from './statement-income-show/statement-income-show.component';
var routes = [
    {
        path: '',
        redirectTo: 'show'
    },
    {
        path: 'show',
        component: StatementIncomeShowComponent
    },
];
var StatementIncomeRoutingModule = /** @class */ (function () {
    function StatementIncomeRoutingModule() {
    }
    StatementIncomeRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], StatementIncomeRoutingModule);
    return StatementIncomeRoutingModule;
}());
export { StatementIncomeRoutingModule };
//# sourceMappingURL=statement-income-routing.module.js.map