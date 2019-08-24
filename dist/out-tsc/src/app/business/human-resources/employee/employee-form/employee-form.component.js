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
import { faThList, faSave, faCalendar, faEye } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { environment } from 'src/environments/environment';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { PositionService } from 'src/app/shared/services/position.service';
import { tap } from 'rxjs/operators';
import { PersonService } from 'src/app/shared/services/person.service';
import { ProductService } from 'src/app/shared/services/product.service';
import * as moment from 'moment';
var EmployeeFormComponent = /** @class */ (function () {
    function EmployeeFormComponent(fb, globalStoreService, parameterService, formToolService, positionService, personService, productService) {
        this.fb = fb;
        this.globalStoreService = globalStoreService;
        this.parameterService = parameterService;
        this.formToolService = formToolService;
        this.positionService = positionService;
        this.personService = personService;
        this.productService = productService;
        this.faThList = faThList;
        this.faSave = faSave;
        this.faCalendar = faCalendar;
        this.faEye = faEye;
        //cargar parámetros para la creación del empleado
        //tipos de id; tipos de salario; tipo de contrato; porcentajes parafiscales
        this.type_id = environment.type_ids;
        this.type_salary = environment.salary_type;
        this.type_contract = environment.contract_type;
        this.laboral_period = environment.laboral_period;
        this.categories = { 'categories': [this.type_id, this.type_salary, this.type_contract, this.laboral_period] };
        this.activeUser = new User;
        this.parametersList = [];
        this.positionsList = [];
        this.lstClients = [];
        this.lstProducts = [];
        this.lastkeydown1 = 0;
        this.success = false;
        this.message = '';
    }
    EmployeeFormComponent.prototype.ngOnInit = function () {
        this.activeUser = this.globalStoreService.getUser();
        this.initForm();
        this.loadParameters();
    };
    EmployeeFormComponent.prototype.loadParameters = function () {
        var _this = this;
        this.parameterService.getByMultipleCodeCategory$(this.categories).pipe(tap(function (parametersLst) {
            _this.parametersList = parametersLst;
        }), tap(function () {
            _this.positionService.getByEnterpsie$(_this.activeUser.fk_id_enterprise).subscribe(function (positionLst) { return _this.positionsList = positionLst; });
        })).subscribe();
    };
    EmployeeFormComponent.prototype.initForm = function () {
        this.employeeForm = this.fb.group({
            person: this.fb.group({
                type_id: ['', Validators.required],
                number_id: ['', Validators.required],
                names: ['', Validators.required],
                last_names: ['', Validators.required],
                address: ['', Validators.required],
                phone: ['', Validators.required],
            }),
            enterprise_person: this.fb.group({
                fk_id_position: ['', Validators.required],
                date_register: ['', Validators.required],
                state: ['']
            }),
            laboral_conditions: this.fb.group({
                contract_type: ['', Validators.required],
                salary_type: ['', Validators.required],
                salary: [''],
                period: [''],
                production_unit: [''],
                pk_product_unit: [''],
                value_product_unit: [''],
                benefit_health: [''],
                benefit_pension: [''],
                benefit_arl: [''],
                benefit_compensation_box: [''],
            }),
        });
    };
    EmployeeFormComponent.prototype.onFindClient = function (filter) {
        var _this = this;
        var idClient = document.getElementById('filterClient').value;
        this.lstClients = [];
        if (idClient.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.personService.getPersonsByIdFilter$(idClient).subscribe(function (lstClients) {
                    _this.lstClients = lstClients;
                });
            }
        }
    };
    EmployeeFormComponent.prototype.selectClient = function (person) {
        this.lstClients = [];
        this.employeeForm.get('person').patchValue({
            type_id: person.type_id,
            number_id: person.number_id,
            names: person.names,
            last_names: person.last_names,
            address: person.address,
            phone: person.phone
        });
    };
    EmployeeFormComponent.prototype.onFindProduct = function (filter) {
        var _this = this;
        var nameProduct = document.getElementById('filterProduct').value;
        this.lstProducts = [];
        if (nameProduct.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.productService.getNotSalesProductsByNameFilter$(nameProduct).subscribe(function (lstProducts) {
                    _this.lstProducts = lstProducts;
                });
            }
        }
    };
    EmployeeFormComponent.prototype.selectProduct = function (product) {
        this.lstProducts = [];
        this.employeeForm.get('laboral_conditions').patchValue({
            production_unit: product.name,
            pk_product_unit: product.pk_id_product,
        });
    };
    EmployeeFormComponent.prototype.saveEmployee = function () {
        var _this = this;
        this.employeeForm.get('enterprise_person').patchValue({
            date_register: moment(this.employeeForm.get('enterprise_person').value.date_register).format('YYYY-MM-DD'),
        });
        this.personService.createEmployee$(this.employeeForm.value).subscribe(function () {
            _this.success = true;
            _this.message = 'Se crea correctamente el empleado';
            _this.employeeForm.reset();
        });
    };
    /**
    * Funciones para verificar si los formularios son obligatorios o no.
    */
    EmployeeFormComponent.prototype.getErrors = function (controlName, controlNameChild) {
        return this.formToolService.getErrorsChild(this.employeeForm, controlName, controlNameChild);
    };
    EmployeeFormComponent.prototype.mustShowError = function (controlName, controlNameChild) {
        return this.formToolService.mustShowErrorChild(this.employeeForm, controlName, controlNameChild);
    };
    EmployeeFormComponent.prototype.hasError = function (controlName, controlNameChild, errorCode) {
        return this.formToolService.hasErrorChild(this.employeeForm, controlName, controlNameChild, errorCode);
    };
    EmployeeFormComponent = __decorate([
        Component({
            selector: 'app-employee-form',
            templateUrl: 'employee-form.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            GlobalStoreService,
            ParameterService,
            FormToolsService,
            PositionService,
            PersonService,
            ProductService])
    ], EmployeeFormComponent);
    return EmployeeFormComponent;
}());
export { EmployeeFormComponent };
//# sourceMappingURL=employee-form.component.js.map