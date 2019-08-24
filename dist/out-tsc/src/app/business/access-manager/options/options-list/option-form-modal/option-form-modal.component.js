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
import { Option } from 'src/app/shared/models/option';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
var OptionFormModalComponent = /** @class */ (function () {
    function OptionFormModalComponent(fb, formToolService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.faSave = faSave;
        this.create = new EventEmitter();
        this.update = new EventEmitter();
    }
    OptionFormModalComponent.prototype.ngOnInit = function () {
        this.initUpdForm(this.option);
    };
    OptionFormModalComponent.prototype.ngOnChanges = function (changes) {
        if (changes.option) {
            if (changes.option.currentValue != changes.option.previousValue) {
                this.initUpdForm(changes.option.currentValue);
            }
        }
    };
    OptionFormModalComponent.prototype.updateOption = function () {
        this.update.emit(this.optionForm.value);
        this.optionForm.reset();
    };
    OptionFormModalComponent.prototype.createOption = function () {
        this.create.emit(this.optionForm.value);
        this.optionForm.reset();
    };
    OptionFormModalComponent.prototype.initUpdForm = function (option) {
        this.optionForm = this.fb.group({
            pk_id_option: [option.pk_id_option],
            business_object: [option.business_object, Validators.required],
            action: [option.action, Validators.required],
            description: [option.description, Validators.required],
        });
    };
    OptionFormModalComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.optionForm, controlName);
    };
    OptionFormModalComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.optionForm, controlName);
    };
    OptionFormModalComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.optionForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", Option)
    ], OptionFormModalComponent.prototype, "option", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], OptionFormModalComponent.prototype, "create", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], OptionFormModalComponent.prototype, "update", void 0);
    OptionFormModalComponent = __decorate([
        Component({
            selector: 'app-option-form-modal',
            templateUrl: 'option-form-modal.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService])
    ], OptionFormModalComponent);
    return OptionFormModalComponent;
}());
export { OptionFormModalComponent };
//# sourceMappingURL=option-form-modal.component.js.map