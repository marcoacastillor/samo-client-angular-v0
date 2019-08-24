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
import { Enterprise } from 'src/app/shared/models/enterprise';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { environment } from 'src/environments/environment';
import { ParameterService } from 'src/app/shared/services/parameter.service';
var OwnerListComponent = /** @class */ (function () {
    function OwnerListComponent(enterpriseService, globalStoreService, parameterService) {
        this.enterpriseService = enterpriseService;
        this.globalStoreService = globalStoreService;
        this.parameterService = parameterService;
        this.faPlusCircle = faPlusCircle;
        this.faEye = faEye;
        this.faEdit = faEdit;
        this.faTrash = faTrash;
        this.lstOwners = [];
        this.enterprise = new Enterprise;
        this.parameterList = [];
        this.categories = { 'categories': [environment.regimen, environment.size_enterprise] };
        this.success = false;
        this.message = '';
    }
    OwnerListComponent.prototype.ngOnInit = function () {
        this.loadAllOwners();
    };
    OwnerListComponent.prototype.newEnterprise = function () {
        this.enterprise = new Enterprise;
    };
    OwnerListComponent.prototype.loadAllOwners = function () {
        var _this = this;
        this.enterpriseService.getByType$(environment.enterprise_owner).subscribe(function (list_owners) { return _this.lstOwners = list_owners; });
    };
    OwnerListComponent.prototype.selectEnterprise = function (enterprise) {
        this.enterprise = enterprise;
    };
    OwnerListComponent.prototype.createEnterprise = function (enterprise) {
        var _this = this;
        this.enterpriseService.store$(enterprise).subscribe(function () {
            _this.enterprise = new Enterprise;
            _this.enterpriseService.getByType$(environment.enterprise_owner).subscribe(function (list_owners) {
                _this.lstOwners = list_owners;
                _this.success = true;
                _this.message = 'Se crea empresa satisfactoriamente.';
            });
        });
    };
    OwnerListComponent.prototype.updateEnterprise = function (enterprise) {
        var _this = this;
        this.enterpriseService.update$(enterprise).subscribe(function () {
            _this.enterprise = new Enterprise;
            _this.enterpriseService.getByType$(environment.enterprise_owner).subscribe(function (list_owners) {
                _this.lstOwners = list_owners;
                _this.success = true;
                _this.message = 'Se actualiza empresa satisfactoriamente.';
            });
        });
    };
    OwnerListComponent.prototype.deleteEnterprise = function () {
        var _this = this;
        this.enterpriseService.delete$(this.enterprise.pk_id_enterprise).subscribe(function () {
            _this.enterpriseService.getByType$(environment.enterprise_owner).subscribe(function (list_owners) {
                _this.lstOwners = list_owners;
                _this.success = true;
                _this.message = 'Se elimina empresa satisfactoriamente.';
            });
        });
    };
    OwnerListComponent.prototype.loadParametersEnterprise = function () {
        var _this = this;
        this.parameterService.getByMultipleCodeCategory$(this.categories).subscribe(function (lst_parameters) { return _this.parameterList = lst_parameters; });
    };
    OwnerListComponent = __decorate([
        Component({
            selector: 'app-owner-list',
            templateUrl: 'owner-list.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [EnterpriseService,
            GlobalStoreService,
            ParameterService])
    ], OwnerListComponent);
    return OwnerListComponent;
}());
export { OwnerListComponent };
//# sourceMappingURL=owner-list.component.js.map