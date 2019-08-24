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
import { TypeService } from 'src/app/shared/models/type-service';
import { TypeServiceService } from 'src/app/shared/services/type-service.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/shared/services/utils.service';
var AdminTypeServiceComponent = /** @class */ (function () {
    function AdminTypeServiceComponent(typeServiceService, globalStoreService, parametersService, utilService) {
        var _this = this;
        this.typeServiceService = typeServiceService;
        this.globalStoreService = globalStoreService;
        this.parametersService = parametersService;
        this.utilService = utilService;
        this.showTypeService = false;
        this.listTypeService = true;
        this.newTypeService = false;
        this.typeServiceList = [];
        this.typeService = new TypeService;
        this.modeServiceList = [];
        this.typesServiceList = [];
        this.sizesEnterpriseList = [];
        /*
        * ------------------------------------------
        * Funciones validación de resultado
        * ------------------------------------------
        */
        this.onSuccess = function () {
            _this.globalStoreService.dispatchUserMessage('200', ' Se ejecutó exitosamente, la operación ');
            _this.getAllTypesServices();
        };
        this.onError = function (error) {
            _this.globalStoreService.dispatchUserMessage(error.status, error.statusText + ' : ' + error.error.error);
        };
    }
    AdminTypeServiceComponent.prototype.ngOnInit = function () {
        this.getAllTypesServices();
        this.getModeServiceList();
        this.getTypesServiceList();
        this.getSizesEnterpriseList();
    };
    AdminTypeServiceComponent.prototype.getModeServiceList = function () {
        var _this = this;
        this.parametersService.getByCodeCategory$(environment.mode_service).subscribe(function (lstModeTypes) { return _this.modeServiceList = lstModeTypes; });
    };
    AdminTypeServiceComponent.prototype.getTypesServiceList = function () {
        var _this = this;
        this.parametersService.getByCodeCategory$(environment.type_service).subscribe(function (lstTypes) { return _this.typesServiceList = lstTypes; });
    };
    AdminTypeServiceComponent.prototype.getSizesEnterpriseList = function () {
        var _this = this;
        this.parametersService.getByCodeCategory$(environment.size_enterprise).subscribe(function (lstSizesEnterprise) { return _this.sizesEnterpriseList = lstSizesEnterprise; });
    };
    AdminTypeServiceComponent.prototype.getAllTypesServices = function () {
        var _this = this;
        this.typeServiceService.getAll$().subscribe(function (lstTypes) { return _this.typeServiceList = lstTypes; });
    };
    AdminTypeServiceComponent.prototype.onCreate = function (typeService) {
        this.typeServiceService.store$(typeService).subscribe(this.onSuccess, this.onError);
    };
    AdminTypeServiceComponent.prototype.onUpdate = function (typeService) {
        this.typeServiceService.update$(typeService).subscribe(this.onSuccess, this.onError);
    };
    AdminTypeServiceComponent.prototype.onDelete = function (id) {
        this.typeServiceService.delete$(id).subscribe(this.onSuccess, this.onError);
    };
    AdminTypeServiceComponent.prototype.onLoad = function (typeService) {
        this.typeService = typeService;
        this.listTypeService = false;
        this.newTypeService = true;
    };
    AdminTypeServiceComponent.prototype.onCancel = function (show) {
        this.listTypeService = show;
        this.newTypeService = false;
        this.showTypeService = false;
    };
    /*
    * ------------------------------------------
    * Funciones visualización
    * ------------------------------------------
    */
    AdminTypeServiceComponent.prototype.getClassNew = function () {
        return this.utilService.getClassNew(this.newTypeService);
    };
    AdminTypeServiceComponent.prototype.getClassList = function () {
        return this.utilService.getClassList(this.listTypeService);
    };
    AdminTypeServiceComponent.prototype.getClassShow = function () {
        return this.utilService.getClassShow(this.showTypeService);
    };
    AdminTypeServiceComponent = __decorate([
        Component({
            selector: 'app-admin-type-service',
            templateUrl: 'admin-type-service.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [TypeServiceService,
            GlobalStoreService,
            ParameterService,
            UtilsService])
    ], AdminTypeServiceComponent);
    return AdminTypeServiceComponent;
}());
export { AdminTypeServiceComponent };
//# sourceMappingURL=admin-type-service.component.js.map