var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { Category } from 'src/app/shared/models/category';
import { faThList } from '@fortawesome/free-solid-svg-icons';
var NewParamComponent = /** @class */ (function () {
    function NewParamComponent(fb, formToolService, cd) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.cd = cd;
        this.faThList = faThList;
        this.create = new EventEmitter();
        this.update = new EventEmitter();
        this.cancel = new EventEmitter();
    }
    NewParamComponent.prototype.ngOnInit = function () {
        this.initUpdForm();
    };
    NewParamComponent.prototype.ngOnChanges = function (changes) {
        if (changes.category) {
            if (changes.category.currentValue != changes.category.previousValue) {
                this.initUpdForm();
            }
        }
    };
    NewParamComponent.prototype.createModule = function () {
        this.create.emit(this.categoryForm.value);
        this.categoryForm.reset();
    };
    NewParamComponent.prototype.updateModule = function () {
        this.update.emit(this.categoryForm.value);
    };
    NewParamComponent.prototype.cancelModule = function () {
        this.cancel.emit(true);
    };
    /*
    * ------------------------------------------
    * Funciones propias del controlador
    * ------------------------------------------
    */
    NewParamComponent.prototype.initUpdForm = function () {
        this.categoryForm = this.fb.group({
            pk_id_category: [this.category.pk_id_category],
            code: [this.category.code, Validators.required],
            name: [this.category.name, Validators.required],
        });
    };
    NewParamComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.categoryForm, controlName);
    };
    NewParamComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.categoryForm, controlName);
    };
    NewParamComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.categoryForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", Category)
    ], NewParamComponent.prototype, "category", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NewParamComponent.prototype, "create", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NewParamComponent.prototype, "update", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NewParamComponent.prototype, "cancel", void 0);
    NewParamComponent = __decorate([
        Component({
            selector: 'app-new-param',
            templateUrl: 'new-param.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService,
            ChangeDetectorRef])
    ], NewParamComponent);
    return NewParamComponent;
}());
export { NewParamComponent };
//# sourceMappingURL=new-param.component.js.map