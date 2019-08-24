var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShowReportExternalComponent } from './show-report-external/show-report-external.component';
var routes = [
    {
        path: '',
        component: ShowReportExternalComponent
    }
];
var ReportExternalRoutingModule = /** @class */ (function () {
    function ReportExternalRoutingModule() {
    }
    ReportExternalRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], ReportExternalRoutingModule);
    return ReportExternalRoutingModule;
}());
export { ReportExternalRoutingModule };
//# sourceMappingURL=report-external-routing.module.js.map