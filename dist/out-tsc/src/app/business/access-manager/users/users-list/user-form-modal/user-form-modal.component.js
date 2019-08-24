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
import { User } from 'src/app/shared/models/user';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
var UserFormModalComponent = /** @class */ (function () {
    function UserFormModalComponent(fb, formToolService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.faSave = faSave;
        this.create = new EventEmitter();
        this.update = new EventEmitter();
        this.getEmployees = new EventEmitter();
    }
    UserFormModalComponent.prototype.ngOnInit = function () {
        this.initUpdForm(this.user);
    };
    UserFormModalComponent.prototype.ngOnChanges = function (changes) {
        if (changes.user) {
            if (changes.user.currentValue != changes.user.previousValue) {
                this.initUpdForm(changes.user.currentValue);
            }
        }
    };
    UserFormModalComponent.prototype.getEmployeesByEnterprise = function () {
        this.getEmployees.emit(this.userForm.value.fk_id_enterprise);
    };
    UserFormModalComponent.prototype.updateUser = function () {
        this.update.emit(this.userForm.value);
        this.userForm.reset();
    };
    UserFormModalComponent.prototype.createUser = function () {
        this.create.emit(this.userForm.value);
        this.userForm.reset();
    };
    UserFormModalComponent.prototype.initUpdForm = function (user) {
        this.userForm = this.fb.group({
            pk_id_user: [user.pk_id_user],
            fk_id_person: [user.fk_id_person, Validators.required],
            fk_id_enterprise: [user.fk_id_enterprise, Validators.required],
            fk_id_rol: [user.fk_id_rol, Validators.required],
            username: [user.username, Validators.required],
            email: [user.email, [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(3)]],
            state_user: [user.state_user, Validators.required]
        });
    };
    UserFormModalComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.userForm, controlName);
    };
    UserFormModalComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.userForm, controlName);
    };
    UserFormModalComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.userForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", User)
    ], UserFormModalComponent.prototype, "user", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], UserFormModalComponent.prototype, "lstRoles", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], UserFormModalComponent.prototype, "lstPersons", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], UserFormModalComponent.prototype, "lstParameters", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], UserFormModalComponent.prototype, "lstEnterprise", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], UserFormModalComponent.prototype, "create", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], UserFormModalComponent.prototype, "update", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], UserFormModalComponent.prototype, "getEmployees", void 0);
    UserFormModalComponent = __decorate([
        Component({
            selector: 'app-user-form-modal',
            templateUrl: 'user-form-modal.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService])
    ], UserFormModalComponent);
    return UserFormModalComponent;
}());
export { UserFormModalComponent };
//# sourceMappingURL=user-form-modal.component.js.map