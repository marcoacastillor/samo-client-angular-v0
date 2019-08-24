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
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { tap } from 'rxjs/operators';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/shared/services/person.service';
import { ParameterConfig } from 'src/app/shared/models/parameter-config';
import { ParameterConfigService } from 'src/app/shared/services/parameter-config.service';
import { PositionService } from 'src/app/shared/services/position.service';
import { Position } from 'src/app/shared/models/position';
import { faUserTag, faUserCheck, faCogs, faWrench, faEye, faEdit, faTrash, faIndustry, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/shared/models/employee';
var EnterpriseShowComponent = /** @class */ (function () {
    function EnterpriseShowComponent(activateRoute, globalStoreService, enterpriseService, personService, parameterConfigService, positionService, parameterService) {
        this.activateRoute = activateRoute;
        this.globalStoreService = globalStoreService;
        this.enterpriseService = enterpriseService;
        this.personService = personService;
        this.parameterConfigService = parameterConfigService;
        this.positionService = positionService;
        this.parameterService = parameterService;
        this.faEye = faEye;
        this.faTrash = faTrash;
        this.faUserTag = faUserTag;
        this.faUserCheck = faUserCheck;
        this.faCogs = faCogs;
        this.faWrench = faWrench;
        this.faEdit = faEdit;
        this.faIndustry = faIndustry;
        this.faAddressCard = faAddressCard;
        this.user = new User;
        this.enterprise = new Enterprise;
        this.position = new Position;
        this.parameterConfig = new ParameterConfig;
        this.employee = new Person;
        this.lstEmployee = [];
        this.lstParametersConfig = [];
        this.lstPositions = [];
        this.lstParametersEnterprise = [];
        this.lstParametersEmployee = [];
        this.url_storage = environment.url_sales_storage;
        //parametros para empresas
        this.regimen = environment.regimen;
        this.size = environment.size_enterprise;
        this.categories = { 'categories': [this.regimen, this.size] };
        //tipos para trabajador
        this.type_id = environment.type_ids;
        this.categories_employee = { 'categories': [this.type_id] };
        this.success = false;
        this.message = '';
    }
    EnterpriseShowComponent.prototype.ngOnInit = function () {
        if (this.activateRoute.snapshot.params['id'] == 'owner') {
            this.user = this.globalStoreService.getUser();
            this.loadInfoByEnterprise(this.user.fk_id_enterprise);
        }
        else {
            this.loadInfoByEnterprise(this.activateRoute.snapshot.params['id']);
        }
    };
    EnterpriseShowComponent.prototype.loadInfoByEnterprise = function (id_enterprise) {
        var _this = this;
        this.enterpriseService.show$(id_enterprise).pipe(tap(function (enterprise) {
            _this.enterprise = enterprise;
        }), tap(function (enterprise) {
            _this.personService.getActiveEmployeesByEnterprise$(enterprise.pk_id_enterprise).subscribe(function (persons) { return _this.lstEmployee = persons; });
        }), tap(function (enterprise) {
            _this.parameterConfigService.getByEnterprise$(enterprise.pk_id_enterprise).subscribe(function (parameters) { return _this.lstParametersConfig = parameters; });
        }), tap(function (enterprise) {
            _this.positionService.getByEnterpsie$(enterprise.pk_id_enterprise).subscribe(function (positions) { return _this.lstPositions = positions; });
        })).subscribe();
    };
    /**
     * funciones para empresa
     */
    EnterpriseShowComponent.prototype.loadParametersEnterprise = function () {
        var _this = this;
        this.success = false;
        this.parameterService.getByMultipleCodeCategory$(this.categories).subscribe(function (parameters) { return _this.lstParametersEnterprise = parameters; });
    };
    EnterpriseShowComponent.prototype.updateEnterprise = function (enterprise) {
        var _this = this;
        this.enterpriseService.update$(enterprise).subscribe(function (enterprise) {
            _this.enterprise = enterprise;
            _this.success = true;
            _this.message = 'Se actualizó información de emrpresa, satisfactoriamente.';
        });
    };
    /**
     * funciones para empresa
     */
    EnterpriseShowComponent.prototype.newPosition = function () {
        this.position = new Position;
    };
    EnterpriseShowComponent.prototype.selectPosition = function (position) {
        this.position = position;
    };
    EnterpriseShowComponent.prototype.updatePosition = function (position) {
        var _this = this;
        this.positionService.update$(position).subscribe(function () {
            _this.positionService.getByEnterpsie$(_this.enterprise.pk_id_enterprise).subscribe(function (positions) {
                _this.success = true;
                _this.lstPositions = positions;
                _this.message = 'Se actualiza un cargo, satisfactoriamente.';
            });
        });
    };
    EnterpriseShowComponent.prototype.createPosition = function (position) {
        var _this = this;
        this.positionService.store$(position).subscribe(function () {
            _this.positionService.getByEnterpsie$(_this.enterprise.pk_id_enterprise).subscribe(function (positions) {
                _this.success = true;
                _this.lstPositions = positions;
                _this.message = 'Se crea un cargo, satisfactoriamente.';
            });
        });
    };
    EnterpriseShowComponent.prototype.deletePosition = function () {
        var _this = this;
        this.positionService.delete$(this.position.pk_id_position).subscribe(function () {
            _this.positionService.getByEnterpsie$(_this.enterprise.pk_id_enterprise).subscribe(function (positions) {
                _this.success = true;
                _this.lstPositions = positions;
                _this.message = 'Se elimina un cargo, satisfactoriamente.';
            });
        });
    };
    /**
     * Funciones parámetros de empresa
     */
    EnterpriseShowComponent.prototype.selectParameter = function (parameter) {
        this.parameterConfig = parameter;
    };
    EnterpriseShowComponent.prototype.createParametersConfig = function () {
        var _this = this;
        this.parameterConfigService.createAllsParamsBytype$(environment.parameters_enterprises, this.enterprise.pk_id_enterprise).subscribe(function () {
            _this.parameterConfigService.getByEnterprise$(_this.enterprise.pk_id_enterprise).subscribe(function (parameters) {
                _this.lstParametersConfig = parameters;
                _this.success = true;
                _this.message = 'Se crean parámetros, satisfactoriamente.';
            });
        });
    };
    EnterpriseShowComponent.prototype.updateParameterConfig = function (parameter) {
        var _this = this;
        this.parameterConfigService.update$(parameter).subscribe(function () {
            _this.parameterConfigService.getByEnterprise$(_this.enterprise.pk_id_enterprise).subscribe(function (parameters) {
                _this.lstParametersConfig = parameters;
                _this.success = true;
                _this.message = 'Se actualiza valor del parámetro, satisfactoriamente.';
            });
        });
    };
    /**
     * Funciones parámetros de empleado
     */
    EnterpriseShowComponent.prototype.loadParametersEmployee = function () {
        var _this = this;
        this.employee = new Employee;
        this.parameterService.getByMultipleCodeCategory$(this.categories_employee).pipe(tap(function (parametersLst) {
            _this.lstParametersEmployee = parametersLst;
        })).subscribe();
    };
    EnterpriseShowComponent.prototype.selectEmployee = function (employee) {
        this.employee = employee;
    };
    EnterpriseShowComponent.prototype.saveEmployee = function (laboralInfo) {
        var _this = this;
        this.personService.createEmployee$(laboralInfo).subscribe(function () {
            _this.personService.getEmployeesByEnterprise$(_this.enterprise.pk_id_enterprise).subscribe(function (employees) {
                _this.lstEmployee = employees;
                _this.success = true;
                _this.message = 'Se crea correctamente el empleado';
            });
        });
    };
    EnterpriseShowComponent.prototype.deleteEmployee = function () {
        var _this = this;
        this.personService.deleteLaboralInfo$(this.employee.pk_id_person).subscribe(function () {
            _this.personService.getEmployeesByEnterprise$(_this.enterprise.pk_id_enterprise).subscribe(function (employees) {
                _this.success = true;
                _this.lstEmployee = employees;
                _this.message = 'Se elimina un trabajador, satisfactoriamente.';
            });
        });
    };
    EnterpriseShowComponent.prototype.updateEmployee = function (laboralInfo) {
        var _this = this;
        this.personService.updateEmployee$(laboralInfo).subscribe(function () {
            _this.personService.getEmployeesByEnterprise$(_this.enterprise.pk_id_enterprise).subscribe(function (employees) {
                _this.success = true;
                _this.lstEmployee = employees;
                _this.message = 'Se actualiza un trabajador, satisfactoriamente.';
            });
        });
    };
    EnterpriseShowComponent = __decorate([
        Component({
            selector: 'app-enterprise-show',
            templateUrl: 'enterprise-show.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            GlobalStoreService,
            EnterpriseService,
            PersonService,
            ParameterConfigService,
            PositionService,
            ParameterService])
    ], EnterpriseShowComponent);
    return EnterpriseShowComponent;
}());
export { EnterpriseShowComponent };
//# sourceMappingURL=enterprise-show.component.js.map