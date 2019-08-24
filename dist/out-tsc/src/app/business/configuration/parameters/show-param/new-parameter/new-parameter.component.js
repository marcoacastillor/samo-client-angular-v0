var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Parameter } from 'src/app/shared/models/parameter';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
var NewParameterComponent = /** @class */ (function () {
    function NewParameterComponent(fb, formToolService, cd) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.cd = cd;
        this.create = new EventEmitter();
        this.update = new EventEmitter();
        this.cancel = new EventEmitter();
    }
    NewParameterComponent.prototype.ngOnInit = function () {
        this.initUpdForm();
    };
    NewParameterComponent.prototype.ngOnChanges = function (changes) {
        if (changes.parameter.currentValue.pk_id_parameter) {
            if (changes.parameter.currentValue.pk_id_parameter != changes.parameter.previousValue.pk_id_parameter) {
                this.initUpdForm();
            }
        }
    };
    NewParameterComponent.prototype.createParameter = function () {
        this.create.emit(this.parameterForm.value);
        this.parameterForm.reset();
    };
    NewParameterComponent.prototype.updateParameter = function () {
        this.update.emit(this.parameterForm.value);
    };
    NewParameterComponent.prototype.cancelParameter = function () {
        this.cancel.emit(true);
    };
    /*
    * ------------------------------------------
    * Funciones propias del controlador
    * ------------------------------------------
    */
    NewParameterComponent.prototype.initUpdForm = function () {
        this.parameterForm = this.fb.group({
            pk_id_parameter: [this.parameter.pk_id_parameter],
            fk_id_category: [this.parameter.fk_id_category],
            name: [this.parameter.name, Validators.required],
            value: [this.parameter.value, Validators.required],
        });
    };
    NewParameterComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.parameterForm, controlName);
    };
    NewParameterComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.parameterForm, controlName);
    };
    NewParameterComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.parameterForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", Parameter)
    ], NewParameterComponent.prototype, "parameter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NewParameterComponent.prototype, "create", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NewParameterComponent.prototype, "update", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NewParameterComponent.prototype, "cancel", void 0);
    NewParameterComponent = __decorate([
        Component({
            selector: 'app-new-parameter',
            templateUrl: 'new-parameter.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService,
            ChangeDetectorRef])
    ], NewParameterComponent);
    return NewParameterComponent;
}());
export { NewParameterComponent };
//# sourceMappingURL=new-parameter.component.js.map