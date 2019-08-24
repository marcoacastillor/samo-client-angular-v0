var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ComponentService } from 'src/app/shared/services/component.service';
import { tap } from 'rxjs/operators';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { VisualizationRolService } from 'src/app/shared/services/visualization-rol.service';
var ComponentFormModalComponent = /** @class */ (function () {
    function ComponentFormModalComponent(componentService, visualizationRolService) {
        this.componentService = componentService;
        this.visualizationRolService = visualizationRolService;
        this.faArrowAltCircleRight = faArrowAltCircleRight;
        this.faArrowAltCircleLeft = faArrowAltCircleLeft;
        this.refresh = new EventEmitter();
        this.lstComponents = [];
        this.lstSelectedComponents = [];
    }
    ComponentFormModalComponent.prototype.ngOnInit = function () {
    };
    ComponentFormModalComponent.prototype.ngOnChanges = function (changes) {
        if (changes.lstAllModules) {
            if (changes.lstAllModules.currentValue != changes.lstAllModules.previousValue) {
                this.lstAllModules = changes.lstAllModules.currentValue;
            }
        }
    };
    ComponentFormModalComponent.prototype.loadComponentsByModule = function (id_module) {
        var _this = this;
        if (id_module != '') {
            this.componentService.getComponentsByModuleAndRol$(parseInt(id_module), this.pk_id_rol).pipe(tap(function (lst_components) { return _this.lstSelectedComponents = lst_components; })).subscribe();
            this.componentService.getNotComponentsByModuleAndRol$(parseInt(id_module), this.pk_id_rol).pipe(tap(function (lst_components) { return _this.lstComponents = lst_components; })).subscribe();
        }
    };
    ComponentFormModalComponent.prototype.addComponent = function (component) {
        var _this = this;
        this.visualizationRolService.create$(component.fk_id_module, component.pk_id_component, this.pk_id_rol).subscribe(function () {
            _this.loadComponentsByModule(component.fk_id_module.toString());
            _this.refresh.emit(_this.pk_id_rol);
        });
    };
    ComponentFormModalComponent.prototype.delComponent = function (id) {
        var _this = this;
        this.visualizationRolService.delete$(id).subscribe(function (visualization) {
            _this.loadComponentsByModule(visualization.fk_id_module.toString());
            _this.refresh.emit(_this.pk_id_rol);
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ComponentFormModalComponent.prototype, "lstAllModules", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ComponentFormModalComponent.prototype, "pk_id_rol", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ComponentFormModalComponent.prototype, "refresh", void 0);
    ComponentFormModalComponent = __decorate([
        Component({
            selector: 'app-component-form-modal',
            templateUrl: 'component-form-modal.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ComponentService,
            VisualizationRolService])
    ], ComponentFormModalComponent);
    return ComponentFormModalComponent;
}());
export { ComponentFormModalComponent };
//# sourceMappingURL=component-form-modal.component.js.map