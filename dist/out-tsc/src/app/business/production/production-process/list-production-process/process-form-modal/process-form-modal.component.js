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
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductionProcess } from 'src/app/shared/models/production-process';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
var ProcessFormModalComponent = /** @class */ (function () {
    function ProcessFormModalComponent(fb, formToolService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.faCalendar = faCalendar;
        this.productionProcess = new ProductionProcess;
        this.onCreate = new EventEmitter();
    }
    ProcessFormModalComponent.prototype.ngOnInit = function () {
        this.initUpdForm();
    };
    ProcessFormModalComponent.prototype.create = function () {
        this.onCreate.emit(this.productionProcessForm.value);
    };
    /*
    * ------------------------------------------
    * Funciones propias del controlador
    * ------------------------------------------
    */
    ProcessFormModalComponent.prototype.initUpdForm = function () {
        this.productionProcessForm = this.fb.group({
            fk_id_enterprise: [this.fk_id_enterprise],
            defined_period: ['', Validators.required],
            reference: ['', Validators.required],
            date_init: ['', Validators.required],
            date_end: [null],
            state: ['Activo', Validators.required],
        });
    };
    /**
       * Funciones para verificar si los formularios son obligatorios o no.
       */
    ProcessFormModalComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.productionProcessForm, controlName);
    };
    ProcessFormModalComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.productionProcessForm, controlName);
    };
    ProcessFormModalComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.productionProcessForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ProcessFormModalComponent.prototype, "definedPeriodList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ProcessFormModalComponent.prototype, "fk_id_enterprise", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ProcessFormModalComponent.prototype, "onCreate", void 0);
    ProcessFormModalComponent = __decorate([
        Component({
            selector: 'app-process-form-modal',
            templateUrl: 'process-form-modal-component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService])
    ], ProcessFormModalComponent);
    return ProcessFormModalComponent;
}());
export { ProcessFormModalComponent };
//# sourceMappingURL=process-form-modal.component.js.map