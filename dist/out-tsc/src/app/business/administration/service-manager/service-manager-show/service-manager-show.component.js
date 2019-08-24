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
import { ActivatedRoute } from '@angular/router';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { ServiceEnterprise } from 'src/app/shared/models/service-enterprise';
import { ServiceEnterpriseService } from 'src/app/shared/services/service-enterprise.service';
import { faDonate, faDollarSign, faThList, faShieldAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { tap } from 'rxjs/operators';
import { PaymentServicesService } from 'src/app/shared/services/payment-services.service';
import { PaymentService } from 'src/app/shared/models/payment-service';
import { TypeService } from 'src/app/shared/models/type-service';
import { TypeServiceService } from 'src/app/shared/services/type-service.service';
import { AccessEnterpriseService } from 'src/app/shared/services/access-enterprise.service';
import { AccessEnterprise } from 'src/app/shared/models/access-enterprise';
var ServiceManagerShowComponent = /** @class */ (function () {
    function ServiceManagerShowComponent(activateRoute, serviceEnterpriseService, enterpriseService, paymentServiceService, typeServiceService, accessEnterpriseService) {
        this.activateRoute = activateRoute;
        this.serviceEnterpriseService = serviceEnterpriseService;
        this.enterpriseService = enterpriseService;
        this.paymentServiceService = paymentServiceService;
        this.typeServiceService = typeServiceService;
        this.accessEnterpriseService = accessEnterpriseService;
        this.faDonate = faDonate;
        this.faDollarSign = faDollarSign;
        this.faThList = faThList;
        this.faShieldAlt = faShieldAlt;
        this.faTrashAlt = faTrashAlt;
        this.id = 0;
        this.serviceEnterprise = new ServiceEnterprise;
        this.enterprise = new Enterprise;
        this.paymentLst = [];
        this.typeService = new TypeService;
        this.accessEnterprise = new AccessEnterprise;
        this.selectedPayment = new PaymentService;
        this.success = false;
        this.message = '';
    }
    ServiceManagerShowComponent.prototype.ngOnInit = function () {
        var id = this.activateRoute.snapshot.params['id'];
        this.loadInfoById(id);
    };
    ServiceManagerShowComponent.prototype.loadInfoById = function (id) {
        var _this = this;
        this.serviceEnterpriseService.show$(id).pipe(tap(function (service_enterprise) { return _this.serviceEnterprise = service_enterprise; }), tap(function (service_enterprise) { return _this.getEnterprise(parseInt(service_enterprise.reference_enterprise.split(':')[0])); }), tap(function (service_enterprise) { return _this.getPaymentsByService(service_enterprise.pk_id_service_enterprise); }), tap(function (service_enterprise) { return _this.getTypeServiceById(service_enterprise.fk_id_type_service); }), tap(function (service_enterprise) { return _this.getInfoAccessEnterprise(parseInt(service_enterprise.reference_enterprise.split(':')[0])); })).subscribe();
    };
    ServiceManagerShowComponent.prototype.generateCypherKey = function (id) {
        var _this = this;
        this.enterpriseService.getCypherKeyByEnterprise$(id).subscribe(function () { return _this.getEnterprise(id); });
    };
    ServiceManagerShowComponent.prototype.getInfoAccessEnterprise = function (id) {
        var _this = this;
        this.accessEnterpriseService.getAccessByEnterprise$(id).subscribe(function (access_enterprise) { return _this.accessEnterprise = access_enterprise; });
    };
    ServiceManagerShowComponent.prototype.getEnterprise = function (id) {
        var _this = this;
        this.enterpriseService.show$(id).subscribe(function (enterprise) { return _this.enterprise = enterprise; });
    };
    ServiceManagerShowComponent.prototype.getPaymentsByService = function (id) {
        var _this = this;
        this.paymentServiceService.getByEnterpriseService$(id).subscribe(function (payments_service) { return _this.paymentLst = payments_service; });
    };
    ServiceManagerShowComponent.prototype.getTypeServiceById = function (id) {
        var _this = this;
        this.typeServiceService.show$(id).subscribe(function (type_service) { return _this.typeService = type_service; });
    };
    ServiceManagerShowComponent.prototype.onAddPayment = function (paymentService) {
        var _this = this;
        this.paymentServiceService.store$(paymentService).pipe(tap(function (payment) {
            if (_this.typeService.type_service == 'PROPIETARIO') {
                _this.serviceEnterprise.balance_service = _this.serviceEnterprise.balance_service - payment.value_payment;
                _this.serviceEnterpriseService.update$(_this.serviceEnterprise).subscribe(function (service_enterprise) { return _this.serviceEnterprise = service_enterprise; });
            }
        }), tap(function (payment) {
            var access = new AccessEnterprise;
            access.fk_id_enterprise = _this.enterprise.pk_id_enterprise;
            access.date_init_access = payment.date_init_service;
            access.date_end_access = payment.date_end_service;
            access.cypher_key = _this.enterprise.cypher_key;
            _this.accessEnterpriseService.store$(access).subscribe(function (access_enterprise) { return _this.getInfoAccessEnterprise(access_enterprise.fk_id_enterprise); });
        }), 
        //tap(() => this.getInfoAccessEnterprise(this.enterprise.pk_id_enterprise)),
        tap(function (payment) {
            _this.getPaymentsByService(payment.fk_id_service_enterprise);
            _this.success = true;
            _this.message = 'Se registra un pago satisfactoriamente';
        })).subscribe();
    };
    ServiceManagerShowComponent = __decorate([
        Component({
            selector: 'app-service-manager-show',
            templateUrl: 'service-manager-show.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            ServiceEnterpriseService,
            EnterpriseService,
            PaymentServicesService,
            TypeServiceService,
            AccessEnterpriseService])
    ], ServiceManagerShowComponent);
    return ServiceManagerShowComponent;
}());
export { ServiceManagerShowComponent };
//# sourceMappingURL=service-manager-show.component.js.map