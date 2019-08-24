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
import { faPlusCircle, faEye, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ServiceEnterpriseService } from 'src/app/shared/services/service-enterprise.service';
import { ServiceEnterprise } from 'src/app/shared/models/service-enterprise';
var ServiceManagerListComponent = /** @class */ (function () {
    function ServiceManagerListComponent(serviceEnterprise) {
        this.serviceEnterprise = serviceEnterprise;
        this.faPlusCircle = faPlusCircle;
        this.faEye = faEye;
        this.faTrash = faTrash;
        this.faEdit = faEdit;
        this.success = false;
        this.message = '';
        this.lstClients = [];
        this.selectedObject = new ServiceEnterprise;
    }
    ServiceManagerListComponent.prototype.ngOnInit = function () {
        this.loadEnterpriseClient();
    };
    ServiceManagerListComponent.prototype.loadEnterpriseClient = function () {
        var _this = this;
        this.serviceEnterprise.getAll$().subscribe(function (lst_enterprises) { return _this.lstClients = lst_enterprises; });
    };
    ServiceManagerListComponent.prototype.onSelect = function (serviceEnterprise) {
        this.selectedObject = serviceEnterprise;
    };
    ServiceManagerListComponent.prototype.deleteObject = function () {
        var _this = this;
        this.serviceEnterprise.delete$(this.selectedObject.pk_id_service_enterprise).subscribe(function () {
            _this.loadEnterpriseClient();
            _this.success = true;
            _this.message = 'Se elimina el registro correctamente';
        });
    };
    ServiceManagerListComponent = __decorate([
        Component({
            selector: 'app-service-manager-list',
            templateUrl: 'service-manager-list.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ServiceEnterpriseService])
    ], ServiceManagerListComponent);
    return ServiceManagerListComponent;
}());
export { ServiceManagerListComponent };
//# sourceMappingURL=service-manager-list.component.js.map