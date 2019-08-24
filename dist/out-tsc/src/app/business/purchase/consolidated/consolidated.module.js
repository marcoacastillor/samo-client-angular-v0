var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsolidatedRoutingModule } from './consolidated-routing.module';
import { ReportMainComponent } from './report-main/report-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
var ConsolidatedModule = /** @class */ (function () {
    function ConsolidatedModule() {
    }
    ConsolidatedModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                ConsolidatedRoutingModule,
                SharedModule,
                FontAwesomeModule,
                OwlDateTimeModule,
                OwlNativeDateTimeModule
            ],
            declarations: [ReportMainComponent]
        })
    ], ConsolidatedModule);
    return ConsolidatedModule;
}());
export { ConsolidatedModule };
//# sourceMappingURL=consolidated.module.js.map