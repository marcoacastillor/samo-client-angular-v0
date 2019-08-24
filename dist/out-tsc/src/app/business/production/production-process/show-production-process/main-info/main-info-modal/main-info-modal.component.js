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
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductionProcess } from 'src/app/shared/models/production-process';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
var MainInfoModalComponent = /** @class */ (function () {
    function MainInfoModalComponent(fb, formToolService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.faCalendar = faCalendar;
        this.onUpdate = new EventEmitter();
    }
    MainInfoModalComponent.prototype.ngOnInit = function () {
        this.initUpdForm();
    };
    MainInfoModalComponent.prototype.ngOnChanges = function (changes) {
        if (changes.productionProcess) {
            if (changes.productionProcess.currentValue) {
                this.initUpdForm();
            }
        }
    };
    MainInfoModalComponent.prototype.update = function () {
        this.onUpdate.emit(this.productionProcessForm.value);
    };
    /*
    * ------------------------------------------
    * Funciones propias del controlador
    * ------------------------------------------
    */
    MainInfoModalComponent.prototype.initUpdForm = function () {
        this.productionProcessForm = this.fb.group({
            pk_id_production_process: [this.productionProcess.pk_id_production_process],
            defined_period: [this.productionProcess.defined_period, Validators.required],
            reference: [this.productionProcess.reference, Validators.required],
            date_init: [this.productionProcess.date_init, Validators.required],
            date_end: [null],
            state: [this.productionProcess.state, Validators.required],
        });
    };
    /**
       * Funciones para verificar si los formularios son obligatorios o no.
       */
    MainInfoModalComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.productionProcessForm, controlName);
    };
    MainInfoModalComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.productionProcessForm, controlName);
    };
    MainInfoModalComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.productionProcessForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], MainInfoModalComponent.prototype, "definedPeriodList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", ProductionProcess)
    ], MainInfoModalComponent.prototype, "productionProcess", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MainInfoModalComponent.prototype, "onUpdate", void 0);
    MainInfoModalComponent = __decorate([
        Component({
            selector: 'app-main-info-modal',
            templateUrl: 'main-info-modal.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService])
    ], MainInfoModalComponent);
    return MainInfoModalComponent;
}());
export { MainInfoModalComponent };
//# sourceMappingURL=main-info-modal.component.js.map