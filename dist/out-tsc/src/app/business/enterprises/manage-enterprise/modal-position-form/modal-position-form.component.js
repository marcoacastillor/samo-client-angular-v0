var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { Position } from 'src/app/shared/models/position';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
var ModalPositionFormComponent = /** @class */ (function () {
    function ModalPositionFormComponent(fb, formToolService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.faSave = faSave;
        this.create = new EventEmitter();
        this.update = new EventEmitter();
    }
    ModalPositionFormComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    ModalPositionFormComponent.prototype.ngOnChanges = function (changes) {
        if (changes.position) {
            if (changes.position.currentValue != changes.position.previousValue) {
                this.initForm();
            }
        }
        if (changes.fk_id_enterprise) {
            this.fk_id_enterprise = changes.fk_id_enterprise.currentValue;
        }
    };
    ModalPositionFormComponent.prototype.initForm = function () {
        this.positionForm = this.fb.group({
            pk_id_position: [this.position.pk_id_position],
            fk_id_enterprise: [this.fk_id_enterprise],
            code: [this.position.code, Validators.required],
            name: [this.position.name, Validators.required]
        });
    };
    ModalPositionFormComponent.prototype.updatePosition = function () {
        this.update.emit(this.positionForm.value);
    };
    ModalPositionFormComponent.prototype.createPosition = function () {
        this.create.emit(this.positionForm.value);
    };
    /**
    * Funciones para verificar si los formularios son obligatorios o no.
    */
    ModalPositionFormComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.positionForm, controlName);
    };
    ModalPositionFormComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.positionForm, controlName);
    };
    ModalPositionFormComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.positionForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", Position)
    ], ModalPositionFormComponent.prototype, "position", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ModalPositionFormComponent.prototype, "fk_id_enterprise", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalPositionFormComponent.prototype, "create", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalPositionFormComponent.prototype, "update", void 0);
    ModalPositionFormComponent = __decorate([
        Component({
            selector: 'app-modal-position-form',
            templateUrl: 'modal-position-form.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService])
    ], ModalPositionFormComponent);
    return ModalPositionFormComponent;
}());
export { ModalPositionFormComponent };
//# sourceMappingURL=modal-position-form.component.js.map