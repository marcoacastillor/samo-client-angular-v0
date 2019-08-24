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
import { EnterprisePerson } from 'src/app/shared/models/enterprise-person';
import { faSave, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import * as moment from 'moment';
var ModalContractFormComponent = /** @class */ (function () {
    function ModalContractFormComponent(fb, formToolService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.faSave = faSave;
        this.faCalendar = faCalendar;
        this.update = new EventEmitter();
    }
    ModalContractFormComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    ModalContractFormComponent.prototype.ngOnChanges = function (changes) {
        if (changes.enterprisePerson) {
            if (changes.enterprisePerson.currentValue != changes.enterprisePerson.previousValue) {
                this.initForm();
            }
        }
    };
    ModalContractFormComponent.prototype.initForm = function () {
        this.enterprisePersonForm = this.fb.group({
            pk_id_enterprise_person: [this.enterprisePerson.pk_id_enterprise_person, Validators.required],
            fk_id_position: [this.enterprisePerson.fk_id_position, Validators.required],
            date_register: [this.enterprisePerson.date_register, Validators.required],
        });
    };
    ModalContractFormComponent.prototype.updateEnterprisePerson = function () {
        this.enterprisePersonForm.patchValue({
            date_register: moment(this.enterprisePersonForm.value.date_register).format('YYYY-MM-DD'),
        });
        this.update.emit(this.enterprisePersonForm.value);
    };
    /**
    * Funciones para verificar si los formularios son obligatorios o no.
    */
    ModalContractFormComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.enterprisePersonForm, controlName);
    };
    ModalContractFormComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.enterprisePersonForm, controlName);
    };
    ModalContractFormComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.enterprisePersonForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", EnterprisePerson)
    ], ModalContractFormComponent.prototype, "enterprisePerson", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ModalContractFormComponent.prototype, "positionsList", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalContractFormComponent.prototype, "update", void 0);
    ModalContractFormComponent = __decorate([
        Component({
            selector: 'app-modal-contract-form',
            templateUrl: 'modal-contract-form.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService])
    ], ModalContractFormComponent);
    return ModalContractFormComponent;
}());
export { ModalContractFormComponent };
//# sourceMappingURL=modal-contract-form.component.js.map