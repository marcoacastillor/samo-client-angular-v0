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
import { TypeService } from 'src/app/shared/models/type-service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { faThList } from '@fortawesome/free-solid-svg-icons';
var NewTypeServiceComponent = /** @class */ (function () {
    function NewTypeServiceComponent(fb, formToolService, cd) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.cd = cd;
        this.faThList = faThList;
        this.create = new EventEmitter();
        this.update = new EventEmitter();
        this.cancel = new EventEmitter();
    }
    NewTypeServiceComponent.prototype.ngOnInit = function () {
        this.initUpdForm();
    };
    NewTypeServiceComponent.prototype.ngOnChanges = function (changes) {
        if (changes.typeService) {
            if (changes.typeService.currentValue != changes.typeService.previousValue) {
                this.initUpdForm();
            }
        }
    };
    NewTypeServiceComponent.prototype.createTypeService = function () {
        this.create.emit(this.typeServiceForm.value);
        this.typeServiceForm.reset();
    };
    NewTypeServiceComponent.prototype.updateTypeService = function () {
        this.update.emit(this.typeServiceForm.value);
        this.typeServiceForm.reset();
    };
    NewTypeServiceComponent.prototype.clear = function () {
        this.typeServiceForm.reset();
    };
    NewTypeServiceComponent.prototype.cancelNew = function () {
        this.cancel.emit(true);
    };
    /*
    * ------------------------------------------
    * Funciones propias del controlador
    * ------------------------------------------
    */
    NewTypeServiceComponent.prototype.initUpdForm = function () {
        this.typeServiceForm = this.fb.group({
            pk_id_type_service: [this.typeService.pk_id_type_service],
            type_enterprise: [this.typeService.type_enterprise, Validators.required],
            code_service: [this.typeService.code_service],
            mode_service: [this.typeService.mode_service, Validators.required],
            value_service: [this.typeService.value_service, Validators.required],
            type_service: [this.typeService.type_service, Validators.required],
            description: [this.typeService.description],
        });
    };
    NewTypeServiceComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.typeServiceForm, controlName);
    };
    NewTypeServiceComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.typeServiceForm, controlName);
    };
    NewTypeServiceComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.typeServiceForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", TypeService)
    ], NewTypeServiceComponent.prototype, "typeService", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], NewTypeServiceComponent.prototype, "modeServiceList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], NewTypeServiceComponent.prototype, "typesServiceList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], NewTypeServiceComponent.prototype, "sizesEnterpriseList", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NewTypeServiceComponent.prototype, "create", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NewTypeServiceComponent.prototype, "update", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NewTypeServiceComponent.prototype, "cancel", void 0);
    NewTypeServiceComponent = __decorate([
        Component({
            selector: 'app-new-type-service',
            templateUrl: 'new-type-service.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService,
            ChangeDetectorRef])
    ], NewTypeServiceComponent);
    return NewTypeServiceComponent;
}());
export { NewTypeServiceComponent };
//# sourceMappingURL=new-type-service.component.js.map