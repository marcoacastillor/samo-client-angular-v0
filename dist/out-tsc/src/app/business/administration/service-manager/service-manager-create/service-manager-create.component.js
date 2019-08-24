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
import { FormBuilder, Validators } from '@angular/forms';
import { faThList, faSave, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { ServiceEnterpriseService } from 'src/app/shared/services/service-enterprise.service';
import { TypeServiceService } from 'src/app/shared/services/type-service.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { TypeService } from 'src/app/shared/models/type-service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { ActivatedRoute } from '@angular/router';
import { ServiceEnterprise } from 'src/app/shared/models/service-enterprise';
import { tap } from 'rxjs/operators';
var ServiceManagerCreateComponent = /** @class */ (function () {
    function ServiceManagerCreateComponent(activateRoute, fb, enterpriseService, typeService, formToolService, serviceEnterpriseService, parameterService) {
        this.activateRoute = activateRoute;
        this.fb = fb;
        this.enterpriseService = enterpriseService;
        this.typeService = typeService;
        this.formToolService = formToolService;
        this.serviceEnterpriseService = serviceEnterpriseService;
        this.parameterService = parameterService;
        this.id_enterprise_service = '';
        this.faThList = faThList;
        this.faSave = faSave;
        this.faCalendar = faCalendar;
        this.enterpriseList = [];
        this.servicesList = [];
        this.stateList = [];
        this.serviceEnterprise = new ServiceEnterprise;
        this.serviceSelected = new TypeService;
        this.success = false;
        this.message = '';
    }
    ServiceManagerCreateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        var id = this.activateRoute.snapshot.params['id'];
        this.id_enterprise_service = id;
        if (id == 'new') {
            this.serviceEnterprise = new ServiceEnterprise();
        }
        else {
            this.serviceEnterpriseService.show$(parseInt(id)).pipe(tap(function (serviceEnterprise) { return _this.loadTypeServiceBySize(serviceEnterprise.reference_enterprise.split(':')[2]); }), tap(function (serviceEnterprise) { return _this.serviceEnterprise = serviceEnterprise; }), tap(function () { return _this.initForm(); })).subscribe();
        }
        this.loadEnterpriseOwners();
        this.loadParameters();
    };
    ServiceManagerCreateComponent.prototype.loadParameters = function () {
        var _this = this;
        this.parameterService.getByCodeCategory$(environment.state_service).subscribe(function (lst_states) { return _this.stateList = lst_states; });
    };
    ServiceManagerCreateComponent.prototype.loadEnterpriseOwners = function () {
        var _this = this;
        this.enterpriseService.getAllByType$(environment.enterprise_owner).subscribe(function (lst_enterprise) { return _this.enterpriseList = lst_enterprise; });
    };
    ServiceManagerCreateComponent.prototype.loadServiceByEnterprise = function () {
        var enterprise = document.getElementById('enterpriseSelected').value;
        if (enterprise.length > 0) {
            this.loadTypeServiceBySize(enterprise.split(':')[2]);
        }
    };
    ServiceManagerCreateComponent.prototype.loadTypeServiceBySize = function (size) {
        var _this = this;
        this.typeService.getBySizes$(size).subscribe(function (lst_type_service) { return _this.servicesList = lst_type_service; });
    };
    ServiceManagerCreateComponent.prototype.initForm = function () {
        this.serviceEnterpriseForm = this.fb.group({
            pk_id_service_enterprise: [this.serviceEnterprise.pk_id_service_enterprise],
            reference_enterprise: [this.serviceEnterprise.reference_enterprise, Validators.required],
            fk_id_type_service: [this.serviceEnterprise.fk_id_type_service, Validators.required],
            date_init_service: [this.serviceEnterprise.date_init_service, Validators.required],
            date_end_service: [this.serviceEnterprise.date_end_service],
            days_service: [this.serviceEnterprise.days_service],
            state_service: [this.serviceEnterprise.state_service, Validators.required],
            balance_service: [this.serviceEnterprise.balance_service, Validators.required],
            observation: [this.serviceEnterprise.observation]
        });
    };
    ServiceManagerCreateComponent.prototype.getTypeService = function (id) {
        var resultado = this.servicesList.filter(function (type_service) { return type_service.pk_id_type_service === id; });
        this.serviceSelected = resultado[0];
    };
    ServiceManagerCreateComponent.prototype.onFindValuesByService = function () {
        var id_type_service = document.getElementById('typeServiceSelected').value;
        if (id_type_service.length > 0) {
            this.getTypeService(parseInt(id_type_service));
            if (this.serviceSelected.type_service == 'MENSUAL') {
                this.serviceEnterpriseForm.patchValue({
                    days_service: 30,
                    balance_service: this.serviceSelected.value_service
                });
            }
            if (this.serviceSelected.type_service == 'ANUAL') {
                this.serviceEnterpriseForm.patchValue({
                    days_service: 365,
                    balance_service: this.serviceSelected.value_service
                });
            }
            if (this.serviceSelected.type_service == 'PROPIETARIO') {
                this.serviceEnterpriseForm.patchValue({
                    days_service: 36500,
                    balance_service: this.serviceSelected.value_service
                });
            }
        }
    };
    ServiceManagerCreateComponent.prototype.saveServiceEnterprise = function () {
        var _this = this;
        this.serviceEnterpriseForm.patchValue({
            date_init_service: moment(this.serviceEnterpriseForm.value.date_init_service).format('YYYY-MM-DD')
        });
        this.serviceEnterpriseService.store$(this.serviceEnterpriseForm.value).subscribe(function () {
            _this.success = true;
            _this.message = 'Se crea un registro correctamente';
            _this.serviceEnterpriseForm.reset();
            _this.serviceSelected = new TypeService;
        });
    };
    ServiceManagerCreateComponent.prototype.updateServiceEnterprise = function () {
        var _this = this;
        this.serviceEnterpriseForm.patchValue({
            date_init_service: moment(this.serviceEnterpriseForm.value.date_init_service).format('YYYY-MM-DD')
        });
        this.serviceEnterpriseService.update$(this.serviceEnterpriseForm.value).subscribe(function () {
            _this.success = true;
            _this.message = 'Se actualiza el registro correctamente';
        });
    };
    /**
    * Funciones para verificar si los formularios son obligatorios o no.
    */
    ServiceManagerCreateComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.serviceEnterpriseForm, controlName);
    };
    ServiceManagerCreateComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.serviceEnterpriseForm, controlName);
    };
    ServiceManagerCreateComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.serviceEnterpriseForm, controlName, errorCode);
    };
    ServiceManagerCreateComponent = __decorate([
        Component({
            selector: 'app-service-manager-create',
            templateUrl: 'service-manager-create.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            FormBuilder,
            EnterpriseService,
            TypeServiceService,
            FormToolsService,
            ServiceEnterpriseService,
            ParameterService])
    ], ServiceManagerCreateComponent);
    return ServiceManagerCreateComponent;
}());
export { ServiceManagerCreateComponent };
//# sourceMappingURL=service-manager-create.component.js.map