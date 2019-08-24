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
import { Person } from 'src/app/shared/models/person';
import { FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { faSave } from '@fortawesome/free-solid-svg-icons';
var ModalPersonalFormComponent = /** @class */ (function () {
    function ModalPersonalFormComponent(fb, formToolService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.faSave = faSave;
        this.update = new EventEmitter();
    }
    ModalPersonalFormComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    ModalPersonalFormComponent.prototype.ngOnChanges = function (changes) {
        if (changes.person) {
            if (changes.person.currentValue != changes.person.previousValue) {
                this.initForm();
            }
        }
    };
    ModalPersonalFormComponent.prototype.initForm = function () {
        this.personalForm = this.fb.group({
            pk_id_person: [this.person.pk_id_person, Validators.required],
            type_id: [this.person.type_id, Validators.required],
            number_id: [this.person.number_id, Validators.required],
            names: [this.person.names, Validators.required],
            last_names: [this.person.last_names, Validators.required],
            address: [this.person.address, Validators.required],
            phone: [this.person.phone, Validators.required],
        });
    };
    ModalPersonalFormComponent.prototype.updatePerson = function () {
        this.update.emit(this.personalForm.value);
    };
    /**
    * Funciones para verificar si los formularios son obligatorios o no.
    */
    ModalPersonalFormComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.personalForm, controlName);
    };
    ModalPersonalFormComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.personalForm, controlName);
    };
    ModalPersonalFormComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.personalForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", Person)
    ], ModalPersonalFormComponent.prototype, "person", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ModalPersonalFormComponent.prototype, "personalParametersList", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalPersonalFormComponent.prototype, "update", void 0);
    ModalPersonalFormComponent = __decorate([
        Component({
            selector: 'app-modal-personal-form',
            templateUrl: 'modal-personal-form.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService])
    ], ModalPersonalFormComponent);
    return ModalPersonalFormComponent;
}());
export { ModalPersonalFormComponent };
//# sourceMappingURL=modal-personal-form.component.js.map