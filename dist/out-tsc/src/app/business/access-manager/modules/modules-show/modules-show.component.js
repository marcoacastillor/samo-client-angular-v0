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
import { faThList, faCartArrowDown, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from 'src/app/shared/services/module.service';
import { Module } from 'src/app/shared/models/module';
import { MComponent } from 'src/app/shared/models/m-component';
import { tap } from 'rxjs/operators';
import { ComponentService } from 'src/app/shared/services/component.service';
var ModulesShowComponent = /** @class */ (function () {
    function ModulesShowComponent(activateRoute, moduleService, componenteService) {
        this.activateRoute = activateRoute;
        this.moduleService = moduleService;
        this.componenteService = componenteService;
        this.faThList = faThList;
        this.faCartArrowDown = faCartArrowDown;
        this.faPlus = faPlus;
        this.faEdit = faEdit;
        this.faTrash = faTrash;
        this.success = false;
        this.message = '';
        this.module = new Module;
        this.lstComponent = [];
        this.selectedComponet = new MComponent;
        this.id_module = 0;
    }
    ModulesShowComponent.prototype.ngOnInit = function () {
        var id = this.activateRoute.snapshot.params['id'];
        this.id_module = id;
        this.getModuleById(id);
    };
    ModulesShowComponent.prototype.getModuleById = function (id) {
        var _this = this;
        this.moduleService.show$(id).pipe(tap(function (module) { return _this.module = module; }), tap(function (module) { return _this.getComponentsByModule(module.pk_id_module); })).subscribe();
    };
    ModulesShowComponent.prototype.getComponentsByModule = function (id) {
        var _this = this;
        this.componenteService.getComponentsByModule$(id).subscribe(function (lst_components) { return _this.lstComponent = lst_components; });
    };
    ModulesShowComponent.prototype.newComponent = function () {
        this.selectedComponet = new MComponent;
        this.selectedComponet.fk_id_module = this.module.pk_id_module;
    };
    ModulesShowComponent.prototype.selectComponent = function (component) {
        this.selectedComponet = component;
    };
    ModulesShowComponent.prototype.onCreateComponent = function (component) {
        var _this = this;
        this.componenteService.store$(component).subscribe(function (component) {
            _this.getComponentsByModule(component.fk_id_module);
            _this.success = true;
            _this.message = 'Se creó componente satisfactoriamente.';
        });
    };
    ModulesShowComponent.prototype.onUpdateComponent = function (component) {
        var _this = this;
        this.componenteService.update$(component).subscribe(function (component) {
            _this.getComponentsByModule(component.fk_id_module);
            _this.success = true;
            _this.message = 'Se actualizó componente satisfactoriamente.';
        });
    };
    ModulesShowComponent.prototype.deleteComponent = function () {
        var _this = this;
        this.componenteService.delete$(this.selectedComponet.pk_id_component).subscribe(function (component) {
            _this.getComponentsByModule(component.fk_id_module);
            _this.success = true;
            _this.message = 'Se eliminó componente satisfactoriamente.';
        });
    };
    ModulesShowComponent = __decorate([
        Component({
            selector: 'app-modules-show',
            templateUrl: 'module-show.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            ModuleService,
            ComponentService])
    ], ModulesShowComponent);
    return ModulesShowComponent;
}());
export { ModulesShowComponent };
//# sourceMappingURL=modules-show.component.js.map