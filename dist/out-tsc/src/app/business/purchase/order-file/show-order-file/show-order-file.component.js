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
import { Operation } from 'src/app/shared/models/operation';
import { ProductOperation } from 'src/app/shared/models/product-operation';
import { Validators, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
var ShowOrderFileComponent = /** @class */ (function () {
    function ShowOrderFileComponent(fb, formToolService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.credit_payment = environment.credit_payment;
        this.create = new EventEmitter();
    }
    ShowOrderFileComponent.prototype.ngOnInit = function () {
        this.initUpdForm();
    };
    ShowOrderFileComponent.prototype.ngOnChanges = function (changes) {
        if (changes.data) {
            if (changes.data.currentValue != changes.data.previousValue) {
                this.readInvoice(changes.data.currentValue);
                this.initUpdForm();
            }
        }
    };
    ShowOrderFileComponent.prototype.readInvoice = function (data) {
        if (data != []) {
            this.operation.external_reference = data[1][0];
            this.operation.number_invoice = data[1][1];
            var descuento = 0;
            var subtotal = 0;
            var totalTax = 0;
            for (var i = 1; i < data.length; i++) {
                if (data[i][0] != '' && data[i][1]) {
                    var product = new ProductOperation;
                    product.code = data[i][4];
                    product.name = data[i][3];
                    product.reference = data[i][2];
                    product.number_units = data[i][9];
                    product.cost_price = data[i][10];
                    product.tax_product = data[i][11];
                    product.sale_price_unit = data[i][13];
                    product.category = environment.clothes;
                    product.presentation = environment.individual;
                    product.trademark = data[i][8];
                    product.color = data[i][7];
                    product.size = data[i][5];
                    product.tax = data[i][11];
                    product.type_product = environment.type_product_purchase;
                    //Calcuar valores
                    var totalProduct = product.number_units * product.cost_price;
                    var discountProduct = ((data[i][12] * totalProduct) / 100);
                    //let value_tax_product   = (totalProduct - (totalProduct / (1+(product.tax/100))));
                    var value_tax_product = (totalProduct * product.tax / 100);
                    product.value_tax = value_tax_product;
                    product.discount = discountProduct;
                    product.subtotal = (totalProduct);
                    //product.total_product   = (totalProduct - discountProduct);
                    product.total_product = ((totalProduct + value_tax_product) - discountProduct);
                    //Calculo del valor de la factura
                    totalTax = (totalTax + product.value_tax);
                    subtotal = (subtotal + product.subtotal);
                    this.operation.products_list.push(product);
                    descuento = descuento + discountProduct;
                }
            }
            this.operation.total_discounts = Math.round(descuento);
            this.operation.subtotal_operation = Math.round(subtotal);
            this.operation.total_tax = Math.round(totalTax);
            this.operation.total_operation = Math.round(subtotal + totalTax);
        }
    };
    ShowOrderFileComponent.prototype.initUpdForm = function () {
        var net_value = (this.operation.total_operation - this.operation.total_discounts);
        this.orderFileForm = this.fb.group({
            type_payment: [environment.efecty_payment, Validators.required],
            total_purchase: [net_value],
            value_payment: [net_value, Validators.max(net_value)],
        });
    };
    ShowOrderFileComponent.prototype.updateState = function () {
        var type_payment = this.orderFileForm.value.type_payment;
        if (type_payment === environment.efecty_payment) {
            this.operation.state_operation = environment.state_payment_purchase;
        }
        else {
            this.operation.state_operation = environment.state_opened_purchase;
        }
        this.operation.payment_type = type_payment;
    };
    ShowOrderFileComponent.prototype.createPurchaseFile = function () {
        this.operation.value_payment = this.orderFileForm.value.value_payment;
        this.operation.payment_type = this.orderFileForm.value.type_payment;
        this.create.emit(this.operation);
    };
    /**
    * Funciones para verificar si los formularios son obligatorios o no.
    */
    ShowOrderFileComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.orderFileForm, controlName);
    };
    ShowOrderFileComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.orderFileForm, controlName);
    };
    ShowOrderFileComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.orderFileForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ShowOrderFileComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Operation)
    ], ShowOrderFileComponent.prototype, "operation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ShowOrderFileComponent.prototype, "lstParams", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ShowOrderFileComponent.prototype, "create", void 0);
    ShowOrderFileComponent = __decorate([
        Component({
            selector: 'app-show-order-file',
            templateUrl: 'show-order-file.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService])
    ], ShowOrderFileComponent);
    return ShowOrderFileComponent;
}());
export { ShowOrderFileComponent };
//# sourceMappingURL=show-order-file.component.js.map