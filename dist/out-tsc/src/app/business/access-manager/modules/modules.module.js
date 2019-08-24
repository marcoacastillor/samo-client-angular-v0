var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesListComponent } from './modules-list/modules-list.component';
import { ModulesShowComponent } from './modules-show/modules-show.component';
import { ModuleService } from 'src/app/shared/services/module.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModuleFormModalComponent } from './modules-list/module-form-modal/module-form-modal.component';
import { ComponentService } from 'src/app/shared/services/component.service';
import { ComponentFormModalComponent } from './modules-show/component-form-modal/component-form-modal.component';
var ModulesModule = /** @class */ (function () {
    function ModulesModule() {
    }
    ModulesModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                ModulesRoutingModule,
                FontAwesomeModule,
                SharedModule
            ],
            providers: [
                ModuleService, ComponentService
            ],
            declarations: [ModulesListComponent, ModulesShowComponent, ModuleFormModalComponent, ComponentFormModalComponent]
        })
    ], ModulesModule);
    return ModulesModule;
}());
export { ModulesModule };
//# sourceMappingURL=modules.module.js.map