var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, ViewChild } from '@angular/core';
import { faThList, faSearch, faCheckCircle, faSave, faPlusCircle, faTrashAlt, faDonate, faClone } from '@fortawesome/free-solid-svg-icons';
import { OperationService } from 'src/app/shared/services/operation.service';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import * as moment from 'moment';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Product } from 'src/app/shared/models/product';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { tap } from 'rxjs/operators';
import { ParameterConfigService } from 'src/app/shared/services/parameter-config.service';
var NewOrderDetailComponent = /** @class */ (function () {
    function NewOrderDetailComponent(operationService, fb, globalStore, enterpriseService, productService, parameterService, parameterConfigService) {
        this.operationService = operationService;
        this.fb = fb;
        this.globalStore = globalStore;
        this.enterpriseService = enterpriseService;
        this.productService = productService;
        this.parameterService = parameterService;
        this.parameterConfigService = parameterConfigService;
        this.faThList = faThList;
        this.faSearch = faSearch;
        this.faCheckCircle = faCheckCircle;
        this.faSave = faSave;
        this.faPlusCircle = faPlusCircle;
        this.faTrashAlt = faTrashAlt;
        this.faDonate = faDonate;
        this.faClone = faClone;
        this.activeUser = new User();
        this.enterprise = new Enterprise();
        this.product = new Product();
        this.lstProviders = [];
        this.lstProvidersModal = [];
        this.lstProducts = [];
        this.lstProductsModal = [];
        this.lstParams = [];
        this.lstParameters = [];
        this.type_payment = environment.type_payment;
        this.taxes = environment.tax_purchase;
        this.credit_payment = environment.credit_payment;
        this.categories = { 'categories': [this.type_payment, this.taxes] };
        this.readOnly = false;
        //Valores para actualizar los valores de facturación activas.
        this.code_paramSelected = '';
        this.value_paramSelected = '';
        this.lastkeydown1 = 0;
        this.success = false;
        this.message = '';
        this.emptyProv = false;
        this.emptyPrd = false;
    }
    NewOrderDetailComponent.prototype.ngOnInit = function () {
        this.activeUser = this.globalStore.getUser();
        this.getMultipleParams();
        this.initForm();
        this.selectNumberInvoice();
    };
    NewOrderDetailComponent.prototype.disableNumberInvoice = function () {
        this.readOnly = false;
        //Actualizar datos sobre numeración de facturas
        var current_purchase = this.getParameters(environment.current_purchase);
        this.code_paramSelected = environment.current_purchase;
        this.value_paramSelected = current_purchase;
        this.operationForm.patchValue({
            number_invoice: 0,
            current_invoice: 0
        });
    };
    NewOrderDetailComponent.prototype.selectNumberInvoice = function () {
        var number_invoice = '';
        var enterprise_purchase = this.getParameters(environment.enterprise_purchase_fact);
        var prefix_purchase = this.getParameters(environment.prefix_purchase);
        var current_purchase = this.getParameters(environment.current_purchase);
        if (enterprise_purchase) {
            if (prefix_purchase) {
                if (current_purchase) {
                    number_invoice = prefix_purchase + (Number(current_purchase) + 1);
                }
                else {
                    number_invoice = prefix_purchase + 1;
                }
            }
            this.readOnly = true;
        }
        //Actualizar datos sobre numeración de facturas
        this.code_paramSelected = environment.current_purchase;
        this.value_paramSelected = (Number(current_purchase) + 1).toString();
        this.operationForm.patchValue({
            number_invoice: number_invoice,
            current_invoice: current_purchase + '1'
        });
    };
    NewOrderDetailComponent.prototype.getParameters = function (code) {
        if (this.lstParameters.length > 0) {
            var resultado = this.lstParameters.filter(function (parameter) { return parameter.code === code; });
            if (resultado[0].value != code)
                return resultado[0].value;
            else
                return null;
        }
        else {
            return null;
        }
    };
    NewOrderDetailComponent.prototype.getMultipleParams = function () {
        var _this = this;
        this.parameterService.getByMultipleCodeCategory$(this.categories).pipe(tap(function (params) { return _this.lstParams = params; }), tap(function () {
            _this.enterpriseService.show$(_this.activeUser.fk_id_enterprise).subscribe(function (enterprise) { return _this.enterprise = enterprise; });
        }), tap(function () {
            _this.getParametersByEnterprise();
        })).subscribe();
    };
    NewOrderDetailComponent.prototype.getParametersByEnterprise = function () {
        var _this = this;
        this.parameterConfigService.getByEnterprise$(this.activeUser.fk_id_enterprise).subscribe(function (lstParameters) {
            _this.lstParameters = lstParameters;
        });
    };
    NewOrderDetailComponent.prototype.initForm = function () {
        this.operationForm = this.fb.group({
            fk_id_person: [this.activeUser.fk_id_person],
            operation_type: [environment.purchase],
            state_operation: [environment.state_initial_purchase],
            total_operation: [0],
            total_tax: [0],
            total_discounts: [0],
            external_reference: ['', Validators.required],
            number_invoice: ['', Validators.required],
            subtotal_operation: [0],
            value_payment: [0],
            value_received: [0],
            current_invoice: [0],
            payment_type: [environment.efecty_payment, Validators.required],
            date_operation: [moment().format('YYYY-MM-DD')],
            product: this.fb.group({
                code: [''],
                name: [''],
                reference: [''],
                number_units: ['0'],
                cost_price: ['0'],
                tax_product: ['0'],
                sale_price_unit: [0],
                category: [''],
                presentation: [''],
                trademark: [''],
                color: [''],
                size: [''],
                tax: [''],
                type_product: [''],
                value_tax: [0],
                discount: [0],
                subtotal: [0],
                total_product: [0],
            }),
            products_list: this.fb.array([])
        });
    };
    Object.defineProperty(NewOrderDetailComponent.prototype, "products_list", {
        get: function () {
            return this.operationForm.get('products_list');
        },
        enumerable: true,
        configurable: true
    });
    NewOrderDetailComponent.prototype.onSubmit = function () {
        this.saveProduct();
    };
    NewOrderDetailComponent.prototype.onFindProvider = function (filter) {
        var _this = this;
        var codeProvider = document.getElementById('filterProvider').value;
        this.lstProviders = [];
        if (codeProvider.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.enterpriseService.getByCodeFilter$(codeProvider, environment.enterprise_provider).subscribe(function (lstProviders) { return _this.lstProviders = lstProviders; }, function () { return _this.emptyProv = true; });
            }
        }
    };
    NewOrderDetailComponent.prototype.selectProvider = function (provider) {
        this.enterprise = provider;
        this.lstProviders = [];
        this.operationForm.patchValue({
            external_reference: provider.pk_id_enterprise
        });
    };
    NewOrderDetailComponent.prototype.onFindProduct = function (filter) {
        var _this = this;
        var codeProduct = document.getElementById('filterProduct').value;
        this.lstProducts = [];
        if (codeProduct.length > 0) {
            this.emptyPrd = false;
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.productService.getByCodeFilterAndType$(codeProduct).subscribe(function (lstProducts) {
                    _this.lstProducts = lstProducts;
                    if (lstProducts.length == 1) {
                        _this.selectProduct(lstProducts[0]);
                    }
                }, function () { return _this.emptyPrd = true; });
            }
        }
    };
    NewOrderDetailComponent.prototype.selectProduct = function (product) {
        this.product = product;
        this.lstProducts = [];
        this.operationForm.get('product').patchValue({
            code: product.code,
            number_units: 1,
            cost_price: 0
        });
        //pone el focus sobre el input de código.
        this.numberUnits.nativeElement.focus();
    };
    NewOrderDetailComponent.prototype.loadAllProviders = function () {
        var _this = this;
        this.enterpriseService.getByType$(environment.enterprise_provider).subscribe(function (lstProviders) { return _this.lstProvidersModal = lstProviders; });
    };
    NewOrderDetailComponent.prototype.addProduct = function () {
        var totalProduct = 0;
        var totalOperation = 0;
        var subTotalOperation = this.operationForm.value.subtotal_operation;
        var totalTaxOperation = this.operationForm.value.total_tax;
        var tax_product = this.operationForm.get('product').value.tax_product;
        var units = this.operationForm.get('product').value.number_units;
        var value = this.operationForm.get('product').value.cost_price;
        var presentation = this.product.presentation;
        var name = this.product.name;
        //Calcular el valor de compra
        totalProduct = units * value;
        //Calcular impuesto para producto
        var value_tax_product = (totalProduct - (totalProduct / (1 + (tax_product / 100))));
        //Calculo del valor de la factura
        subTotalOperation = Math.round(subTotalOperation + (totalProduct - value_tax_product));
        totalTaxOperation = Math.round(totalTaxOperation + value_tax_product);
        totalOperation = Math.round(subTotalOperation + totalTaxOperation);
        //Actualizar datos para producto seleccionado
        this.operationForm.get('product').patchValue({
            value_tax: value_tax_product,
            name: name,
            total_product: totalProduct,
            presentation: presentation
        });
        this.operationForm.patchValue({
            subtotal_operation: subTotalOperation,
            total_operation: totalOperation,
            total_tax: totalTaxOperation,
            value_payment: Math.round(totalOperation - this.operationForm.value.total_discounts)
        });
        //Sacar producto para agregarlo
        var prd = this.fb.group(this.operationForm.get('product').value);
        //Agregar producto a listado
        this.products_list.push(prd);
        //resetear los valores del producto.
        this.operationForm.get('product').patchValue({
            code: '',
            name: '',
            presentation: '',
            number_units: 0,
            cost_price: 0,
            value_tax: 0,
            tax_product: '0',
            total_product: 0
        });
        //resetear producto seleccionado con código de barras.
        this.nameField.nativeElement.focus();
        //limpiar producto seleccionado.
        this.product = new Product();
    };
    NewOrderDetailComponent.prototype.updatePaymentValue = function () {
        if (this.operationForm.value.payment_type != 'Efectivo') {
            this.operationForm.patchValue({
                value_payment: 0
            });
        }
        else {
            this.operationForm.patchValue({
                value_payment: Math.round(this.operationForm.value.total_operation - this.operationForm.value.total_discounts)
            });
        }
    };
    NewOrderDetailComponent.prototype.saveProduct = function () {
        var _this = this;
        this.operationService.storeOperation$(this.operationForm.value)
            .pipe(tap(function () {
            _this.initForm();
            _this.enterprise = new Enterprise();
            _this.success = true;
            _this.message = 'Se realizó la creación de la factura con éxito.';
        }), tap(function () {
            _this.parameterConfigService.updateByEnterpriseAndCodeAndValue$(_this.activeUser.fk_id_enterprise, _this.code_paramSelected, _this.value_paramSelected).subscribe(function () { _this.getParametersByEnterprise(); });
        }))
            .subscribe();
    };
    NewOrderDetailComponent.prototype.delProduct = function (prd, idx) {
        var total_tax = this.operationForm.value.total_tax;
        var subtotal_operation = this.operationForm.value.subtotal_operation;
        var total_product = prd.total_product;
        var value_tax = prd.value_tax;
        subtotal_operation = subtotal_operation - (total_product - value_tax);
        total_tax = total_tax - value_tax;
        this.operationForm.patchValue({
            subtotal_operation: subtotal_operation,
            total_tax: total_tax,
            total_operation: (subtotal_operation + total_tax),
        });
        this.products_list.removeAt(idx);
    };
    __decorate([
        ViewChild('code_product'),
        __metadata("design:type", ElementRef)
    ], NewOrderDetailComponent.prototype, "nameField", void 0);
    __decorate([
        ViewChild('number_units'),
        __metadata("design:type", ElementRef)
    ], NewOrderDetailComponent.prototype, "numberUnits", void 0);
    NewOrderDetailComponent = __decorate([
        Component({
            selector: 'app-new-order-detail',
            templateUrl: 'new-order-detail.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [OperationService,
            FormBuilder,
            GlobalStoreService,
            EnterpriseService,
            ProductService,
            ParameterService,
            ParameterConfigService])
    ], NewOrderDetailComponent);
    return NewOrderDetailComponent;
}());
export { NewOrderDetailComponent };
//# sourceMappingURL=new-order-detail.component.js.map