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
import { MComponent } from 'src/app/shared/models/m-component';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
var ComponentFormModalComponent = /** @class */ (function () {
    function ComponentFormModalComponent(fb, formToolService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.faSave = faSave;
        this.create = new EventEmitter();
        this.update = new EventEmitter();
    }
    ComponentFormModalComponent.prototype.ngOnInit = function () {
        this.initUpdForm(this.component);
    };
    ComponentFormModalComponent.prototype.ngOnChanges = function (changes) {
        if (changes.component) {
            if (changes.component.currentValue != changes.component.previousValue) {
                this.initUpdForm(changes.component.currentValue);
            }
        }
    };
    ComponentFormModalComponent.prototype.updateModule = function () {
        this.update.emit(this.componentForm.value);
    };
    ComponentFormModalComponent.prototype.createModule = function () {
        this.create.emit(this.componentForm.value);
        this.componentForm.reset();
    };
    ComponentFormModalComponent.prototype.initUpdForm = function (component) {
        this.componentForm = this.fb.group({
            pk_id_component: [component.pk_id_component],
            fk_id_module: [component.fk_id_module, Validators.required],
            name: [component.name, Validators.required],
            url_angular_component: [component.url_angular_component, Validators.required],
            order_component: [component.order_component, Validators.required]
        });
    };
    ComponentFormModalComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.componentForm, controlName);
    };
    ComponentFormModalComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.componentForm, controlName);
    };
    ComponentFormModalComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.componentForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", MComponent)
    ], ComponentFormModalComponent.prototype, "component", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ComponentFormModalComponent.prototype, "create", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ComponentFormModalComponent.prototype, "update", void 0);
    ComponentFormModalComponent = __decorate([
        Component({
            selector: 'app-component-form-modal',
            templateUrl: 'component-form-modal.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService])
    ], ComponentFormModalComponent);
    return ComponentFormModalComponent;
}());
export { ComponentFormModalComponent };
//# sourceMappingURL=component-form-modal.component.js.map