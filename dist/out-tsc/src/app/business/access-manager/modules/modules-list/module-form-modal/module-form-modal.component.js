var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { Module } from 'src/app/shared/models/module';
var ModuleFormModalComponent = /** @class */ (function () {
    function ModuleFormModalComponent(fb, formToolService, cd) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.cd = cd;
        this.faSave = faSave;
        this.create = new EventEmitter();
        this.update = new EventEmitter();
    }
    ModuleFormModalComponent.prototype.ngOnInit = function () {
        this.initUpdForm(this.module);
    };
    ModuleFormModalComponent.prototype.ngOnChanges = function (changes) {
        if (changes.module) {
            if (changes.module.currentValue != changes.module.previousValue) {
                this.initUpdForm(changes.module.currentValue);
            }
        }
    };
    ModuleFormModalComponent.prototype.updateModule = function () {
        this.update.emit(this.moduleForm.value);
        this.moduleForm.reset();
    };
    ModuleFormModalComponent.prototype.createModule = function () {
        this.create.emit(this.moduleForm.value);
        this.moduleForm.reset();
    };
    ModuleFormModalComponent.prototype.onFileSelected = function (event) {
        var _this = this;
        var reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            var image = event.target.files[0];
            reader.readAsDataURL(image);
            reader.onload = function () {
                _this.moduleForm.patchValue({
                    file_image: reader.result
                });
                // need to run CD since file load runs outside of zone
                _this.cd.markForCheck();
            };
        }
    };
    ModuleFormModalComponent.prototype.initUpdForm = function (module) {
        this.moduleForm = this.fb.group({
            pk_id_module: [module.pk_id_module],
            name: [module.name, Validators.required],
            description: [module.description, Validators.required],
            url_image: [module.url_image, Validators.required],
            file_image: [null],
            url_angular_module: [module.url_angular_module, Validators.required],
            icon_name: [module.icon_name, Validators.required],
            order_module: [module.order_module, Validators.required]
        });
    };
    ModuleFormModalComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.moduleForm, controlName);
    };
    ModuleFormModalComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.moduleForm, controlName);
    };
    ModuleFormModalComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.moduleForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", Module)
    ], ModuleFormModalComponent.prototype, "module", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModuleFormModalComponent.prototype, "create", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModuleFormModalComponent.prototype, "update", void 0);
    ModuleFormModalComponent = __decorate([
        Component({
            selector: 'app-module-form-modal',
            templateUrl: 'module-form-modal.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService,
            ChangeDetectorRef])
    ], ModuleFormModalComponent);
    return ModuleFormModalComponent;
}());
export { ModuleFormModalComponent };
//# sourceMappingURL=module-form-modal.component.js.map