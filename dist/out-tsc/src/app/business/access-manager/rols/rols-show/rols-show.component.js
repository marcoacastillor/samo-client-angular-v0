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
import { Rol } from 'src/app/shared/models/rol';
import { ActivatedRoute } from '@angular/router';
import { RolService } from 'src/app/shared/services/rol.service';
import { ModuleService } from 'src/app/shared/services/module.service';
import { tap } from 'rxjs/operators';
import { faThList, faPlus, faFolderOpen, faTasks, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { OptionService } from 'src/app/shared/services/option.service';
import { VisualizationRolService } from 'src/app/shared/services/visualization-rol.service';
import { OptionRolService } from 'src/app/shared/services/option-rol.service';
var RolsShowComponent = /** @class */ (function () {
    function RolsShowComponent(activateRoute, rolService, moduleService, optionService, visualizationRolService, optionRolService) {
        this.activateRoute = activateRoute;
        this.rolService = rolService;
        this.moduleService = moduleService;
        this.optionService = optionService;
        this.visualizationRolService = visualizationRolService;
        this.optionRolService = optionRolService;
        this.faThList = faThList;
        this.faFolderOpen = faFolderOpen;
        this.faTasks = faTasks;
        this.faPlus = faPlus;
        this.faArrowAltCircleLeft = faArrowAltCircleLeft;
        this.success = false;
        this.message = '';
        this.id_rol = 0;
        this.rol = new Rol;
        this.lstModules = [];
        this.lstOptions = [];
        this.lstAllModules = [];
        this.lstAllObjects = [];
    }
    RolsShowComponent.prototype.ngOnInit = function () {
        var id = this.activateRoute.snapshot.params['id'];
        this.id_rol = id;
        this.getDetailById(id);
    };
    RolsShowComponent.prototype.getAllModels = function () {
        var _this = this;
        this.moduleService.getAll$().subscribe(function (lst_modules) { return _this.lstAllModules = lst_modules; });
    };
    RolsShowComponent.prototype.getAllObjects = function () {
        var _this = this;
        this.optionService.getBusinessObject$().subscribe(function (lst_options) { return _this.lstAllObjects = lst_options; });
    };
    RolsShowComponent.prototype.getDetailById = function (id) {
        var _this = this;
        this.rolService.show$(id).pipe(tap(function (rol) { return _this.rol = rol; }), tap(function (rol) { return _this.getVisualizationByRol(rol.pk_id_rol); }), tap(function (rol) { return _this.getOptionsByRol(rol.pk_id_rol); })).subscribe();
    };
    RolsShowComponent.prototype.getVisualizationByRol = function (id) {
        var _this = this;
        this.moduleService.getModulesByRol$(id.toString()).subscribe(function (modules) { return _this.lstModules = modules; });
    };
    RolsShowComponent.prototype.getOptionsByRol = function (id) {
        var _this = this;
        this.optionService.getByRol$(id).subscribe(function (lst_options) { return _this.lstOptions = lst_options; });
    };
    RolsShowComponent.prototype.onRefresh = function (id_rol) {
        this.getVisualizationByRol(id_rol);
    };
    RolsShowComponent.prototype.onRefreshOptions = function (id_rol) {
        this.getOptionsByRol(id_rol);
    };
    RolsShowComponent.prototype.delComponent = function (id) {
        var _this = this;
        this.visualizationRolService.delete$(id).subscribe(function (visualization) {
            _this.getVisualizationByRol(visualization.fk_id_rol);
        });
    };
    RolsShowComponent = __decorate([
        Component({
            selector: 'app-rols-show',
            templateUrl: 'rols-show.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            RolService,
            ModuleService,
            OptionService,
            VisualizationRolService,
            OptionRolService])
    ], RolsShowComponent);
    return RolsShowComponent;
}());
export { RolsShowComponent };
//# sourceMappingURL=rols-show.component.js.map