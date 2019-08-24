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
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { environment } from 'src/environments/environment';
import { ParameterService } from 'src/app/shared/services/parameter.service';
var ProviderListComponent = /** @class */ (function () {
    function ProviderListComponent(enterpriseService, globalStoreService, parameterService) {
        this.enterpriseService = enterpriseService;
        this.globalStoreService = globalStoreService;
        this.parameterService = parameterService;
        this.faPlusCircle = faPlusCircle;
        this.faEye = faEye;
        this.faEdit = faEdit;
        this.faTrash = faTrash;
        this.lstProviders = [];
        this.activeUser = new User;
        this.fk_id_enterprise = 0;
        this.enterprise = new Enterprise;
        this.parameterList = [];
    }
    ProviderListComponent.prototype.ngOnInit = function () {
        this.activeUser = this.globalStoreService.getUser();
        this.loadAllProviders();
    };
    ProviderListComponent.prototype.loadAllProviders = function () {
        var _this = this;
        this.fk_id_enterprise = this.activeUser.fk_id_enterprise;
        this.enterpriseService.getByType$(environment.enterprise_provider).subscribe(function (list_providers) { return _this.lstProviders = list_providers; });
    };
    ProviderListComponent.prototype.selectEnterprise = function (enterprise) {
        this.enterprise = enterprise;
    };
    ProviderListComponent.prototype.createEnterprise = function (enterprise) {
        var _this = this;
        this.enterpriseService.store$(enterprise).subscribe(function () {
            _this.enterprise = new Enterprise;
            _this.enterpriseService.getByType$(environment.enterprise_provider).subscribe(function (list_providers) { return _this.lstProviders = list_providers; });
        });
    };
    ProviderListComponent.prototype.updateEnterprise = function (enterprise) {
        var _this = this;
        this.enterpriseService.update$(enterprise).subscribe(function () {
            _this.enterprise = new Enterprise;
            _this.enterpriseService.getByType$(environment.enterprise_provider).subscribe(function (list_providers) { return _this.lstProviders = list_providers; });
        });
    };
    ProviderListComponent.prototype.deleteEnterprise = function () {
        var _this = this;
        this.enterpriseService.delete$(this.enterprise.pk_id_enterprise).subscribe(function () {
            _this.enterpriseService.getByType$(environment.enterprise_provider).subscribe(function (list_providers) { return _this.lstProviders = list_providers; });
        });
    };
    ProviderListComponent.prototype.loadParametersEnterprise = function () {
        var _this = this;
        this.parameterService.getByCodeCategory$(environment.regimen).subscribe(function (lst_parameters) { return _this.parameterList = lst_parameters; });
    };
    ProviderListComponent = __decorate([
        Component({
            selector: 'app-provider-list',
            templateUrl: 'provider-list.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [EnterpriseService,
            GlobalStoreService,
            ParameterService])
    ], ProviderListComponent);
    return ProviderListComponent;
}());
export { ProviderListComponent };
//# sourceMappingURL=provider-list.component.js.map