var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { Operation } from 'src/app/shared/models/operation';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
var FormOperationModalComponent = /** @class */ (function () {
    function FormOperationModalComponent(fb, formToolService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.faSave = faSave;
        this.efecty_payment = environment.efecty_payment;
        this.type_payment = environment.type_payment;
        this.update = new EventEmitter();
    }
    FormOperationModalComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    FormOperationModalComponent.prototype.ngOnChanges = function (changes) {
        if (changes.operation) {
            if (changes.operation.currentValue != changes.operation.previousValue) {
                this.initForm();
            }
        }
    };
    FormOperationModalComponent.prototype.initForm = function () {
        this.operationForm = this.fb.group({
            pk_id_operation: [this.operation.pk_id_operation],
            fk_id_vendedor: [this.operation.fk_id_person],
            fk_id_provider: [this.operation.fk_id_enterprise],
            operation_type: [this.operation.operation_type],
            payment_type: [this.operation.payment_type],
            number_invoice: [this.operation.number_invoice],
            subtotal_operation: [this.operation.subtotal_operation],
            total_operation: [this.operation.total_operation],
            total_tax: [this.operation.total_tax],
            total_discounts: [this.operation.total_discounts, Validators.max(this.operation.total_operation - (this.operation.total_discounts + this.operation.total_pays))],
            total_pays: [this.operation.total_pays, Validators.max(this.operation.total_operation - (this.operation.total_discounts + this.operation.total_pays))],
        });
    };
    FormOperationModalComponent.prototype.updateOperation = function () {
        this.update.emit(this.operationForm.value);
        this.initForm();
    };
    /**
     * Funciones para verificar si los formularios son obligatorios o no.
     */
    FormOperationModalComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.operationForm, controlName);
    };
    FormOperationModalComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.operationForm, controlName);
    };
    FormOperationModalComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.operationForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", Operation)
    ], FormOperationModalComponent.prototype, "operation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FormOperationModalComponent.prototype, "lstParams", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FormOperationModalComponent.prototype, "update", void 0);
    FormOperationModalComponent = __decorate([
        Component({
            selector: 'app-form-operation-modal',
            templateUrl: 'form-operation-modal.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService])
    ], FormOperationModalComponent);
    return FormOperationModalComponent;
}());
export { FormOperationModalComponent };
//# sourceMappingURL=form-operation-modal.component.js.map