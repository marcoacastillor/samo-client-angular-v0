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
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Rol } from 'src/app/shared/models/rol';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
var RolFormModalComponent = /** @class */ (function () {
    function RolFormModalComponent(fb, formToolService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.faSave = faSave;
        this.create = new EventEmitter();
        this.update = new EventEmitter();
    }
    RolFormModalComponent.prototype.ngOnInit = function () {
        this.initUpdForm(this.rol);
    };
    RolFormModalComponent.prototype.ngOnChanges = function (changes) {
        if (changes.rol) {
            if (changes.rol.currentValue != changes.rol.previousValue) {
                this.initUpdForm(changes.rol.currentValue);
            }
        }
    };
    RolFormModalComponent.prototype.updateRol = function () {
        this.update.emit(this.rolForm.value);
    };
    RolFormModalComponent.prototype.createRol = function () {
        this.create.emit(this.rolForm.value);
        this.rolForm.reset();
    };
    RolFormModalComponent.prototype.initUpdForm = function (rol) {
        this.rolForm = this.fb.group({
            pk_id_rol: [rol.pk_id_rol],
            name: [rol.name, Validators.required],
            description: [rol.description],
        });
    };
    RolFormModalComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.rolForm, controlName);
    };
    RolFormModalComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.rolForm, controlName);
    };
    RolFormModalComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.rolForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", Rol)
    ], RolFormModalComponent.prototype, "rol", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], RolFormModalComponent.prototype, "create", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], RolFormModalComponent.prototype, "update", void 0);
    RolFormModalComponent = __decorate([
        Component({
            selector: 'app-rol-form-modal',
            templateUrl: 'rol-form-modal.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService])
    ], RolFormModalComponent);
    return RolFormModalComponent;
}());
export { RolFormModalComponent };
//# sourceMappingURL=rol-form-modal.component.js.map