var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faSave, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { PersonService } from 'src/app/shared/services/person.service';
import * as moment from 'moment';
import { Employee } from 'src/app/shared/models/employee';
var ModalEmployeeFormComponent = /** @class */ (function () {
    function ModalEmployeeFormComponent(fb, formToolService, personService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.personService = personService;
        this.faSave = faSave;
        this.faCalendar = faCalendar;
        this.type_id = environment.type_ids;
        this.lstClients = [];
        this.create = new EventEmitter();
        this.update = new EventEmitter();
        this.lastkeydown1 = 0;
    }
    ModalEmployeeFormComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    ModalEmployeeFormComponent.prototype.ngOnChanges = function (changes) {
        if (changes.employee) {
            if (changes.employee.currentValue != changes.employee.previousValue) {
                this.initForm();
            }
        }
    };
    ModalEmployeeFormComponent.prototype.initForm = function () {
        this.employeeForm = this.fb.group({
            person: this.fb.group({
                pk_id_person: [this.employee.fk_id_person],
                type_id: [this.employee.type_id, Validators.required],
                number_id: [this.employee.number_id, Validators.required],
                names: [this.employee.names, Validators.required],
                last_names: [this.employee.last_names, Validators.required],
                address: [this.employee.address, Validators.required],
                phone: [this.employee.phone, Validators.required],
            }),
            enterprise_person: this.fb.group({
                pk_id_enterprise_person: [this.employee.pk_id_enterprise_person],
                fk_id_position: [this.employee.fk_id_position, Validators.required],
                date_register: [this.employee.date_register, Validators.required],
                state: ['Activo']
            }),
        });
    };
    ModalEmployeeFormComponent.prototype.onFindClient = function (filter) {
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
    ModalEmployeeFormComponent.prototype.selectClient = function (person) {
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
    ModalEmployeeFormComponent.prototype.createEmployee = function () {
        this.employeeForm.get('enterprise_person').patchValue({
            date_register: moment(this.employeeForm.get('enterprise_person').value.date_register).format('YYYY-MM-DD'),
        });
        this.create.emit(this.employeeForm.value);
    };
    ModalEmployeeFormComponent.prototype.updateEmployee = function () {
        this.employeeForm.get('enterprise_person').patchValue({
            date_register: moment(this.employeeForm.get('enterprise_person').value.date_register).format('YYYY-MM-DD'),
        });
        this.update.emit(this.employeeForm.value);
    };
    /**
    * Funciones para verificar si los formularios son obligatorios o no.
    */
    ModalEmployeeFormComponent.prototype.getErrors = function (controlName, controlNameChild) {
        return this.formToolService.getErrorsChild(this.employeeForm, controlName, controlNameChild);
    };
    ModalEmployeeFormComponent.prototype.mustShowError = function (controlName, controlNameChild) {
        return this.formToolService.mustShowErrorChild(this.employeeForm, controlName, controlNameChild);
    };
    ModalEmployeeFormComponent.prototype.hasError = function (controlName, controlNameChild, errorCode) {
        return this.formToolService.hasErrorChild(this.employeeForm, controlName, controlNameChild, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ModalEmployeeFormComponent.prototype, "fk_id_enterprise", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ModalEmployeeFormComponent.prototype, "lstParametersEmployee", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ModalEmployeeFormComponent.prototype, "lstPositions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Employee)
    ], ModalEmployeeFormComponent.prototype, "employee", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalEmployeeFormComponent.prototype, "create", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalEmployeeFormComponent.prototype, "update", void 0);
    ModalEmployeeFormComponent = __decorate([
        Component({
            selector: 'app-modal-employee-form',
            templateUrl: 'modal-employee-form.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService,
            PersonService])
    ], ModalEmployeeFormComponent);
    return ModalEmployeeFormComponent;
}());
export { ModalEmployeeFormComponent };
//# sourceMappingURL=modal-employee-form.component.js.map