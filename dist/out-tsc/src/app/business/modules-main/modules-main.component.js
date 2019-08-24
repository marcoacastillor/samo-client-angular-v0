var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ModuleService } from 'src/app/shared/services/module.service';
import { environment } from 'src/environments/environment';
var ModulesMainComponent = /** @class */ (function () {
    function ModulesMainComponent(moduleService) {
        this.moduleService = moduleService;
        this.url_storage = environment.url_storage;
        this.modules = [];
    }
    ModulesMainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.moduleService.getAll$().subscribe(function (modules) { return _this.modules = modules; });
    };
    ModulesMainComponent = __decorate([
        Component({
            selector: 'app-modules-main',
            templateUrl: 'modules-main.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ModuleService])
    ], ModulesMainComponent);
    return ModulesMainComponent;
}());
export { ModulesMainComponent };
//# sourceMappingURL=modules-main.component.js.map