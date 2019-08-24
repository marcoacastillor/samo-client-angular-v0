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
import { Operation } from 'src/app/shared/models/operation';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
var FormPaymentModalComponent = /** @class */ (function () {
    function FormPaymentModalComponent(fb, formToolService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.faSave = faSave;
        this.addPayment = new EventEmitter();
    }
    FormPaymentModalComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    FormPaymentModalComponent.prototype.ngOnChanges = function (changes) {
        if (changes.operation) {
            if (changes.operation.currentValue != changes.operation.previousValue) {
                this.initForm();
            }
        }
    };
    FormPaymentModalComponent.prototype.initForm = function () {
        this.paymentForm = this.fb.group({
            fk_id_operation: [this.operation.pk_id_operation],
            value_payment: [0, [Validators.required, Validators.max(this.operation.total_operation - (this.operation.total_discounts + this.operation.total_pays))]],
            value_received: [0]
        });
    };
    FormPaymentModalComponent.prototype.add = function () {
        this.addPayment.emit(this.paymentForm.value);
        this.initForm();
    };
    /**
     * Funciones para verificar si los formularios son obligatorios o no.
     */
    FormPaymentModalComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.paymentForm, controlName);
    };
    FormPaymentModalComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.paymentForm, controlName);
    };
    FormPaymentModalComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.paymentForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", Operation)
    ], FormPaymentModalComponent.prototype, "operation", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FormPaymentModalComponent.prototype, "addPayment", void 0);
    FormPaymentModalComponent = __decorate([
        Component({
            selector: 'app-form-payment-modal',
            templateUrl: 'form-payment-modal.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService])
    ], FormPaymentModalComponent);
    return FormPaymentModalComponent;
}());
export { FormPaymentModalComponent };
//# sourceMappingURL=form-payment-modal.component.js.map