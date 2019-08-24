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
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { ParameterConfig } from 'src/app/shared/models/parameter-config';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
var ModalParameterFormComponent = /** @class */ (function () {
    function ModalParameterFormComponent(fb, formToolService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.faSave = faSave;
        this.update = new EventEmitter();
    }
    ModalParameterFormComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    ModalParameterFormComponent.prototype.ngOnChanges = function (changes) {
        if (changes.parameterConfig) {
            if (changes.parameterConfig.currentValue != changes.parameterConfig.previousValue) {
                this.initForm();
            }
        }
        if (changes.fk_id_enterprise) {
            this.fk_id_enterprise = changes.fk_id_enterprise.currentValue;
        }
    };
    ModalParameterFormComponent.prototype.initForm = function () {
        this.parameterForm = this.fb.group({
            pk_id_parameter_config: [this.parameterConfig.pk_id_parameter_config],
            fk_id_enterprise: [this.fk_id_enterprise],
            code: [this.parameterConfig.code],
            description: [this.parameterConfig.description],
            value: [this.parameterConfig.value, Validators.required]
        });
    };
    ModalParameterFormComponent.prototype.updateParameter = function () {
        this.update.emit(this.parameterForm.value);
    };
    /**
    * Funciones para verificar si los formularios son obligatorios o no.
    */
    ModalParameterFormComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.parameterForm, controlName);
    };
    ModalParameterFormComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.parameterForm, controlName);
    };
    ModalParameterFormComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.parameterForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", ParameterConfig)
    ], ModalParameterFormComponent.prototype, "parameterConfig", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ModalParameterFormComponent.prototype, "fk_id_enterprise", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalParameterFormComponent.prototype, "update", void 0);
    ModalParameterFormComponent = __decorate([
        Component({
            selector: 'app-modal-parameter-form',
            templateUrl: 'modal-parameter-form.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService])
    ], ModalParameterFormComponent);
    return ModalParameterFormComponent;
}());
export { ModalParameterFormComponent };
//# sourceMappingURL=modal-parameter-form.component.js.map