var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationRoutingModule } from './administration-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
var AdministrationModule = /** @class */ (function () {
    function AdministrationModule() {
    }
    AdministrationModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                AdministrationRoutingModule,
                FontAwesomeModule,
                SharedModule,
                OwlDateTimeModule,
                OwlNativeDateTimeModule
            ],
        })
    ], AdministrationModule);
    return AdministrationModule;
}());
export { AdministrationModule };
//# sourceMappingURL=administration.module.js.map