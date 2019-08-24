var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
var FormToolsService = /** @class */ (function () {
    function FormToolsService() {
        this.getControl = function (form, controlName) { return form.controls[controlName]; };
        this.getControlChild = function (form, controlName, controlNameChild) { return form.controls[controlName]['controls'][controlNameChild]; };
    }
    FormToolsService.prototype.getErrors = function (form, controlName) {
        var control = this.getControl(form, controlName);
        return control.errors;
    };
    FormToolsService.prototype.getErrorsChild = function (form, controlName, controlNameChild) {
        var control = this.getControlChild(form, controlName, controlNameChild);
        return control.errors;
    };
    FormToolsService.prototype.mustShowError = function (form, controlName) {
        var control = this.getControl(form, controlName);
        if (control.invalid && (control.dirty || control.touched)) {
            return true;
        }
        else {
            return false;
        }
    };
    FormToolsService.prototype.mustShowErrorChild = function (form, controlName, controlNameChild) {
        var control = this.getControlChild(form, controlName, controlNameChild);
        if (control.invalid && (control.dirty || control.touched)) {
            return true;
        }
        else {
            return false;
        }
    };
    FormToolsService.prototype.hasError = function (form, controlName, errorCode) {
        var control = this.getControl(form, controlName);
        var error = control.getError(errorCode);
        if (error) {
            return true;
        }
        else {
            return false;
        }
    };
    FormToolsService.prototype.hasErrorChild = function (form, controlName, controlNameChild, errorCode) {
        var control = this.getControlChild(form, controlName, controlNameChild);
        var error = control.getError(errorCode);
        if (error) {
            return true;
        }
        else {
            return false;
        }
    };
    FormToolsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], FormToolsService);
    return FormToolsService;
}());
export { FormToolsService };
//# sourceMappingURL=form-tools.service.js.map