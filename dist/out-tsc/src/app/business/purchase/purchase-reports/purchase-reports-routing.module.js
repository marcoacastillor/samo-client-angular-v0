var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainReportsComponent } from './main-reports/main-reports.component';
var routes = [
    {
        path: '',
        component: MainReportsComponent,
        children: [
            {
                path: 'report-by-dates',
                loadChildren: './report-dates/report-dates.module#ReportDatesModule'
            },
            {
                path: 'report-days',
                loadChildren: './report-days/report-days.module#ReportDaysModule'
            },
            {
                path: 'report-external',
                loadChildren: './report-external/report-external.module#ReportExternalModule'
            }
        ]
    }
];
var PurchaseReportsRoutingModule = /** @class */ (function () {
    function PurchaseReportsRoutingModule() {
    }
    PurchaseReportsRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], PurchaseReportsRoutingModule);
    return PurchaseReportsRoutingModule;
}());
export { PurchaseReportsRoutingModule };
//# sourceMappingURL=purchase-reports-routing.module.js.map