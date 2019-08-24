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
import { faPlusCircle, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Module } from 'src/app/shared/models/module';
import { ModuleService } from 'src/app/shared/services/module.service';
var ModulesListComponent = /** @class */ (function () {
    function ModulesListComponent(moduleService) {
        this.moduleService = moduleService;
        this.faPlusCircle = faPlusCircle;
        this.faEye = faEye;
        this.faEdit = faEdit;
        this.faTrash = faTrash;
        this.lstModules = [];
        this.selectedModule = new Module;
        this.success = false;
        this.message = '';
    }
    ModulesListComponent.prototype.ngOnInit = function () {
        this.loadAllModules();
    };
    ModulesListComponent.prototype.loadAllModules = function () {
        var _this = this;
        this.moduleService.getAll$().subscribe(function (modules) { return _this.lstModules = modules; });
    };
    ModulesListComponent.prototype.newModule = function () {
        this.selectedModule = new Module;
    };
    ModulesListComponent.prototype.selectModule = function (module) {
        this.selectedModule = module;
    };
    ModulesListComponent.prototype.deleteModule = function () {
        var _this = this;
        this.moduleService.delete$(this.selectedModule.pk_id_module).subscribe(function () {
            _this.loadAllModules();
            _this.success = true;
            _this.message = 'Se elimina registro satisfactoriamente.';
        });
    };
    ModulesListComponent.prototype.onCreate = function (module) {
        var _this = this;
        this.moduleService.store$(module).subscribe(function () {
            _this.loadAllModules();
            _this.success = true;
            _this.message = 'Se crea registro satisfactoriamente.';
        });
    };
    ModulesListComponent.prototype.onUpdate = function (module) {
        var _this = this;
        this.moduleService.update$(module).subscribe(function () {
            _this.loadAllModules();
            _this.success = true;
            _this.message = 'Se actualiza registro satisfactoriamente.';
        });
    };
    ModulesListComponent = __decorate([
        Component({
            selector: 'app-modules-list',
            templateUrl: 'module-list.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ModuleService])
    ], ModulesListComponent);
    return ModulesListComponent;
}());
export { ModulesListComponent };
//# sourceMappingURL=modules-list.component.js.map