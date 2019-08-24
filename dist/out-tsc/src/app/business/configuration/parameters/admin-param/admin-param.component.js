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
import { Category } from 'src/app/shared/models/category';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { tap } from 'rxjs/operators';
import { Parameter } from 'src/app/shared/models/parameter';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
var AdminParamComponent = /** @class */ (function () {
    function AdminParamComponent(globalStoreService, categoryService, parameterService, utilService) {
        var _this = this;
        this.globalStoreService = globalStoreService;
        this.categoryService = categoryService;
        this.parameterService = parameterService;
        this.utilService = utilService;
        this.showParam = false;
        this.listParam = true;
        this.newParam = false;
        this.categoryList = [];
        this.category = new Category;
        this.parameter = new Parameter;
        this.loadCategory = function (category) {
            _this.category = category;
        };
        /*
        * ------------------------------------------
        * Funciones validación de resultado
        * ------------------------------------------
        */
        this.onSuccess = function () {
            _this.globalStoreService.dispatchUserMessage('200', ' Se ejecutó exitosamente, la operación ');
            _this.loadAllCategories();
        };
        this.onError = function (error) {
            _this.globalStoreService.dispatchUserMessage(error.status, error.statusText + ' : ' + error.error.error);
        };
    }
    AdminParamComponent.prototype.ngOnInit = function () {
        this.loadAllCategories();
    };
    AdminParamComponent.prototype.loadAllCategories = function () {
        var _this = this;
        this.categoryService.getAll$().subscribe(function (categories) { return _this.categoryList = categories; });
    };
    AdminParamComponent.prototype.onCreate = function (category) {
        this.categoryService.store$(category).subscribe(this.onSuccess, this.onError);
    };
    AdminParamComponent.prototype.onUpdate = function (category) {
        this.categoryService.update$(category).subscribe(this.onSuccess, this.onError);
    };
    AdminParamComponent.prototype.onCancel = function (cancel) {
        this.listParam = cancel;
        this.newParam = false;
        this.showParam = false;
        if (cancel) {
            this.category = new Category;
        }
    };
    AdminParamComponent.prototype.onDelete = function (id) {
        this.categoryService.delete$(id).subscribe(this.onSuccess, this.onError);
    };
    AdminParamComponent.prototype.onSelect = function (param) {
        this.parameter = param;
    };
    /*
    Funciones para gestionar información de parámetros
    */
    AdminParamComponent.prototype.onCreateParam = function (parameter) {
        var _this = this;
        this.parameterService.store$(parameter).subscribe(function (param) {
            _this.onView(param.fk_id_category);
        }, this.onError);
    };
    AdminParamComponent.prototype.onUpdateParam = function (parameter) {
        var _this = this;
        this.parameterService.update$(parameter).subscribe(function (param) {
            _this.onView(param.fk_id_category);
        }, this.onError);
    };
    AdminParamComponent.prototype.onDeleteParam = function (id_param) {
        var _this = this;
        this.parameterService.delete$(id_param).subscribe(function (param) {
            _this.onView(param.fk_id_category);
        }, this.onError);
    };
    AdminParamComponent.prototype.onCancelParam = function (cancel) {
        this.showParam = false;
        this.listParam = true;
        this.newParam = false;
        if (cancel) {
            this.parameter = new Parameter;
        }
    };
    /*
    */
    AdminParamComponent.prototype.onView = function (pk_id_category) {
        this.showParam = true;
        this.listParam = false;
        this.newParam = false;
        this.categoryService.show$(pk_id_category).pipe(tap(this.loadCategory)).subscribe(this.onSuccess, this.onError);
    };
    AdminParamComponent.prototype.onUdp = function (category) {
        this.showParam = false;
        this.newParam = true;
        this.listParam = false;
        this.category = category;
    };
    /*
    * ------------------------------------------
    * Funciones visualización
    * ------------------------------------------
    */
    AdminParamComponent.prototype.getClassNew = function () {
        return this.utilService.getClassNew(this.newParam);
    };
    AdminParamComponent.prototype.getClassList = function () {
        return this.utilService.getClassList(this.listParam);
    };
    AdminParamComponent.prototype.getClassShow = function () {
        return this.utilService.getClassShow(this.showParam);
    };
    AdminParamComponent = __decorate([
        Component({
            selector: 'app-admin-param',
            templateUrl: 'admin-param.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [GlobalStoreService,
            CategoryService,
            ParameterService,
            UtilsService])
    ], AdminParamComponent);
    return AdminParamComponent;
}());
export { AdminParamComponent };
//# sourceMappingURL=admin-param.component.js.map