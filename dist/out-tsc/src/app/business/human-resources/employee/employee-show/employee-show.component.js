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
import { faThList, faAddressCard, faUserCheck, faServer, faFileSignature, faFolderOpen, faFolderPlus, faFilePrescription, faTrash, faEdit, faBan } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/shared/models/person';
import { EnterprisePerson } from 'src/app/shared/models/enterprise-person';
import { LaboralCondition } from 'src/app/shared/models/laboral-condition';
import { WorkerNews } from 'src/app/shared/models/worker-news';
import { PersonService } from 'src/app/shared/services/person.service';
import { EnterprisePersonService } from 'src/app/shared/services/enterprise-person.service';
import { LaboralConditionService } from 'src/app/shared/services/laboral-condition.service';
import { PayingEmployeeService } from 'src/app/shared/services/paying-employee.service';
import { WorkerNewService } from 'src/app/shared/services/worker-new.service';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { PositionService } from 'src/app/shared/services/position.service';
var EmployeeShowComponent = /** @class */ (function () {
    function EmployeeShowComponent(activateRoute, personService, enterprisePersonService, laboralConditionService, payingEmployeeService, workerNewsService, parameterService, positionService) {
        this.activateRoute = activateRoute;
        this.personService = personService;
        this.enterprisePersonService = enterprisePersonService;
        this.laboralConditionService = laboralConditionService;
        this.payingEmployeeService = payingEmployeeService;
        this.workerNewsService = workerNewsService;
        this.parameterService = parameterService;
        this.positionService = positionService;
        this.faThList = faThList;
        this.faAddressCard = faAddressCard;
        this.faUserCheck = faUserCheck;
        this.faServer = faServer;
        this.faFileSignature = faFileSignature;
        this.faFolderOpen = faFolderOpen;
        this.faFolderPlus = faFolderPlus;
        this.faFilePrescription = faFilePrescription;
        this.faTrash = faTrash;
        this.faEdit = faEdit;
        this.faBan = faBan;
        this.person = new Person;
        this.enterprisePerson = new EnterprisePerson;
        this.laboralCondition = new LaboralCondition;
        this.workerNews = [];
        this.paymentsEmployee = [];
        this.allEnterprisePerson = [];
        this.selectedWorkerNew = new WorkerNews;
        //parametros para información personal
        //cargar parámetros para la creación del empleado
        //tipos de id; tipos de salario; tipo de contrato; porcentajes parafiscales
        this.type_id = environment.type_ids;
        this.type_salary = environment.salary_type;
        this.type_contract = environment.contract_type;
        this.type_worker_new = environment.type_worker_new;
        this.laboral_period = environment.laboral_period;
        this.categories = { 'categories': [this.type_salary, this.type_contract, this.laboral_period] };
        this.categories_news = { 'categories': [this.type_worker_new] };
        this.positionsList = [];
        this.personalParametersList = [];
        this.laboralConditionParametersList = [];
        this.workerNewsParameterList = [];
        this.success = false;
        this.message = '';
    }
    EmployeeShowComponent.prototype.ngOnInit = function () {
        this.id_person = this.activateRoute.snapshot.params['id'];
        this.getLaboralDetailActive(this.id_person);
    };
    EmployeeShowComponent.prototype.getLaboralDetailActive = function (id_person) {
        var _this = this;
        this.personService.show$(id_person).pipe(tap(function (person) {
            _this.person = person;
        }), tap(function (person) {
            _this.enterprisePersonService.getAllInfoByPerson$(person.pk_id_person).subscribe(function (enterprise_laborals) { return _this.allEnterprisePerson = enterprise_laborals; });
        }), switchMap(function (person) { return _this.enterprisePersonService.getActiveInfoByPerson$(person.pk_id_person); }), tap(function (enterprise_person) {
            _this.enterprisePerson = enterprise_person;
        }), tap(function (enterprise_person) {
            _this.laboralConditionService.getInfoByEnterprisePerson$(enterprise_person.pk_id_enterprise_person).subscribe(function (laboral_condition) { return _this.laboralCondition = laboral_condition; });
        }), tap(function (enterprise_person) {
            _this.workerNewsService.getInfoByEnterprisePerson$(enterprise_person.pk_id_enterprise_person).subscribe(function (worker_news) { return _this.workerNews = worker_news; });
        }), tap(function (enterprise_person) {
            _this.payingEmployeeService.getInfoByEnterprisePerson$(enterprise_person.pk_id_enterprise_person).subscribe(function (payments_employee) { return _this.paymentsEmployee = payments_employee; });
        })).subscribe();
    };
    EmployeeShowComponent.prototype.selectWorkNew = function (news) {
        this.selectedWorkerNew = news;
    };
    EmployeeShowComponent.prototype.getLaboralDetailByContract = function (id_contract) {
        var _this = this;
        this.enterprisePersonService.show$(id_contract).pipe(tap(function (enterprise_person) {
            _this.enterprisePerson = enterprise_person;
        }), tap(function (enterprise_person) {
            _this.laboralConditionService.getInfoByEnterprisePerson$(enterprise_person.pk_id_enterprise_person).subscribe(function (laboral_condition) { return _this.laboralCondition = laboral_condition; });
        }), tap(function (enterprise_person) {
            _this.workerNewsService.getInfoByEnterprisePerson$(enterprise_person.pk_id_enterprise_person).subscribe(function (worker_news) { return _this.workerNews = worker_news; });
        }), tap(function (enterprise_person) {
            _this.payingEmployeeService.getInfoByEnterprisePerson$(enterprise_person.pk_id_enterprise_person).subscribe(function (payments_employee) { return _this.paymentsEmployee = payments_employee; });
        })).subscribe();
    };
    EmployeeShowComponent.prototype.inactiveContract = function (id) {
        var _this = this;
        this.enterprisePersonService.inactivateContract$(id).pipe(tap(function () {
            _this.enterprisePersonService.show$(id).subscribe(function (enterprise_person) { return _this.enterprisePerson = enterprise_person; });
        }), tap(function (enterprise_person) {
            _this.enterprisePersonService.getAllInfoByPerson$(enterprise_person.fk_id_person).subscribe(function (enterprise_laborals) { return _this.allEnterprisePerson = enterprise_laborals; });
        })).subscribe(function () {
            _this.success = true;
            _this.message = 'Se inactivo contrato correctamente.';
        });
    };
    /**
     * inicio información personal
     */
    EmployeeShowComponent.prototype.loadPersonalParameters = function () {
        var _this = this;
        this.parameterService.getByCodeCategory$(this.type_id).subscribe(function (parameters) { return _this.personalParametersList = parameters; });
    };
    EmployeeShowComponent.prototype.updatePersonal = function (person) {
        var _this = this;
        this.personService.update$(person).subscribe(function (person) {
            _this.person = person;
            _this.success = true;
            _this.message = 'Se actualizó información laboral, correctamente.';
        });
    };
    /**
     * fin información personal
     */
    EmployeeShowComponent.prototype.loadContractParameters = function () {
        var _this = this;
        this.positionService.getByEnterpsie$(this.enterprisePerson.fk_id_enterprise).subscribe(function (position_list) { return _this.positionsList = position_list; });
    };
    EmployeeShowComponent.prototype.updateEnterprisePerson = function (enterprisePerson) {
        var _this = this;
        this.enterprisePersonService.update$(enterprisePerson).subscribe(function (enterprise_person) {
            _this.enterprisePersonService.getActiveInfoByPerson$(enterprise_person.fk_id_person).subscribe(function (enterprise_person) {
                _this.enterprisePerson = enterprise_person;
                _this.success = true;
                _this.message = 'Se actualizó información de contrato, correctamente.';
            });
        });
    };
    /**
     * Condiciones laborales
     */
    EmployeeShowComponent.prototype.loadLaboralConditionParameters = function () {
        var _this = this;
        this.parameterService.getByMultipleCodeCategory$(this.categories).subscribe(function (parameters_list) { return _this.laboralConditionParametersList = parameters_list; });
    };
    EmployeeShowComponent.prototype.createLaboralCondition = function (laboralCondition) {
        var _this = this;
        this.laboralConditionService.create$(laboralCondition).subscribe(function (laboral_condition) {
            _this.laboralConditionService.getInfoByEnterprisePerson$(laboral_condition.fk_id_enterprise_person).subscribe(function (laboral_condition) {
                _this.laboralCondition = laboral_condition;
                _this.success = true;
                _this.message = 'Se creó información de condiciones laborales, correctamente.';
            });
        });
    };
    EmployeeShowComponent.prototype.updateLaboralCondition = function (laboralCondition) {
        var _this = this;
        this.laboralConditionService.update$(laboralCondition).subscribe(function (laboral_condition) {
            _this.laboralConditionService.getInfoByEnterprisePerson$(laboral_condition.fk_id_enterprise_person).subscribe(function (laboral_condition) {
                _this.laboralCondition = laboral_condition;
                _this.success = true;
                _this.message = 'Se actualizó información de condiciones laborales, correctamente.';
            });
        });
    };
    /**
       * Información parámetros tipos de novedad
       */
    EmployeeShowComponent.prototype.loadWorkerNewsParameter = function () {
        var _this = this;
        this.parameterService.getByMultipleCodeCategory$(this.categories_news).subscribe(function (parameter_worker_new) {
            _this.workerNewsParameterList = parameter_worker_new;
        });
    };
    EmployeeShowComponent.prototype.createWorkerNews = function (worker_mews) {
        var _this = this;
        this.workerNewsService.create$(worker_mews).subscribe(function () { return _this.workerNewsService.getInfoByEnterprisePerson$(_this.enterprisePerson.pk_id_enterprise_person).subscribe(function (worker_news) {
            _this.workerNews = worker_news;
            _this.success = true;
            _this.message = 'Se creó novedad para el trabajador.';
        }); });
    };
    EmployeeShowComponent.prototype.updateWorkerNews = function (worker_mews) {
        var _this = this;
        this.workerNewsService.update$(worker_mews).subscribe(function () { return _this.workerNewsService.getInfoByEnterprisePerson$(_this.enterprisePerson.pk_id_enterprise_person).subscribe(function (worker_news) {
            _this.workerNews = worker_news;
            _this.success = true;
            _this.message = 'Se actualizó novedad para el trabajador.';
        }); });
    };
    EmployeeShowComponent.prototype.deleteWorkerNew = function () {
        var _this = this;
        this.workerNewsService.delete$(this.selectedWorkerNew.pk_id_worker_news).subscribe(function () { return _this.workerNewsService.getInfoByEnterprisePerson$(_this.enterprisePerson.pk_id_enterprise_person).subscribe(function (worker_news) {
            _this.workerNews = worker_news;
            _this.success = true;
            _this.message = 'Se actualizó novedad para el trabajador.';
        }); });
    };
    EmployeeShowComponent = __decorate([
        Component({
            selector: 'app-employee-show',
            templateUrl: 'employee-show.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            PersonService,
            EnterprisePersonService,
            LaboralConditionService,
            PayingEmployeeService,
            WorkerNewService,
            ParameterService,
            PositionService])
    ], EmployeeShowComponent);
    return EmployeeShowComponent;
}());
export { EmployeeShowComponent };
//# sourceMappingURL=employee-show.component.js.map