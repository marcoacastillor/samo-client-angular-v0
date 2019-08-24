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
import { faThList, faSearch, faCheckCircle, faSave, faPlusCircle, faTrashAlt, faEye, faClone, faDonate, faUnderline, faArchive } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/models/user';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { OperationService } from 'src/app/shared/services/operation.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import * as moment from 'moment';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/shared/services/person.service';
import { tap } from 'rxjs/operators';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { ParameterConfigService } from 'src/app/shared/services/parameter-config.service';
var NewSaleDetailComponent = /** @class */ (function () {
    function NewSaleDetailComponent(operationService, fb, globalStore, personService, productService, parameterService, enterpriseService, parameterConfigService) {
        this.operationService = operationService;
        this.fb = fb;
        this.globalStore = globalStore;
        this.personService = personService;
        this.productService = productService;
        this.parameterService = parameterService;
        this.enterpriseService = enterpriseService;
        this.parameterConfigService = parameterConfigService;
        this.pk_id_operation = 0;
        this.faThList = faThList;
        this.faSearch = faSearch;
        this.faCheckCircle = faCheckCircle;
        this.faSave = faSave;
        this.faPlusCircle = faPlusCircle;
        this.faTrashAlt = faTrashAlt;
        this.faEye = faEye;
        this.faClone = faClone;
        this.faDonate = faDonate;
        this.faUnderline = faUnderline;
        this.faArchive = faArchive;
        this.activeUser = new User();
        this.person = new Person();
        this.product = new Product();
        this.enterprise = new Enterprise();
        this.lstParameters = [];
        this.lstClients = [];
        this.lstClientsModal = [];
        this.lstProducts = [];
        this.lstProductsByName = [];
        this.lstProductsModal = [];
        this.lstParams = [];
        this.type_payment = environment.type_payment;
        this.taxes = environment.tax_purchase;
        this.type_id = environment.type_ids;
        this.credit_payment = environment.credit_payment;
        this.separated_payment = environment.separated_payment;
        //Valores para actualizar los valores de facturación activas.
        this.code_paramSelected = '';
        this.value_paramSelected = '';
        this.selectedPresentation = '';
        this.units_available = 0;
        this.categories = { 'categories': [this.type_payment, this.taxes, this.type_id] };
        this.lastkeydown1 = 0;
        this.success = false;
        this.message = '';
        this.emptyCli = false;
        this.emptyPrd = false;
        this.url_storage = environment.url_sales_storage;
    }
    NewSaleDetailComponent.prototype.ngOnInit = function () {
        this.activeUser = this.globalStore.getUser();
        this.getMultipleParams();
        this.initForm();
        this.loadClientOther();
    };
    NewSaleDetailComponent.prototype.loadClientOther = function () {
        var _this = this;
        this.personService.getByTypeAndNumberId$('CC', '999999').subscribe(function (person) {
            _this.person = person;
            _this.selectClient(person);
        });
    };
    NewSaleDetailComponent.prototype.selectNumberSale = function () {
        var number_sale = '';
        var prefix_sale = this.getParameters(environment.prefix_sale);
        var current_sale = this.getParameters(environment.current_sale);
        if (prefix_sale) {
            if (current_sale) {
                number_sale = prefix_sale + (Number(current_sale) + 1);
            }
            else {
                number_sale = prefix_sale + '1';
            }
        }
        else {
            if (current_sale) {
                number_sale = (Number(current_sale) + 1).toString();
            }
            else {
                number_sale = '1';
            }
        }
        //Actualizar datos sobre numeración de facturas
        this.code_paramSelected = environment.current_sale;
        this.value_paramSelected = (Number(current_sale) + 1).toString();
        this.operationForm.patchValue({
            number_invoice: number_sale,
            current_invoice: (Number(current_sale) + 1)
        });
    };
    NewSaleDetailComponent.prototype.selectNumberInvoice = function () {
        var next_number = 0;
        var number_invoice = '';
        var enterprise_fact = this.getParameters(environment.enterprise_fact);
        var prefix_invoice = this.getParameters(environment.prefix_invoice);
        var current_invoice = this.getParameters(environment.current_invoice);
        var invoice_init = this.getParameters(environment.invoice_init);
        var invoice_end = this.getParameters(environment.invoice_end);
        if (enterprise_fact == 'true') {
            if (prefix_invoice) {
                if (current_invoice) {
                    next_number = Number(current_invoice) + 1;
                    if (next_number > Number(invoice_end)) {
                        number_invoice = '';
                    }
                    else {
                        number_invoice = prefix_invoice + (next_number);
                    }
                }
                else {
                    number_invoice = (Number(invoice_init)).toString();
                }
            }
            else {
                if (current_invoice) {
                    next_number = Number(current_invoice) + 1;
                    if (next_number > Number(invoice_end)) {
                        number_invoice = '';
                    }
                    else {
                        number_invoice = (next_number).toString();
                    }
                }
                else {
                    if (invoice_init) {
                        number_invoice = (Number(invoice_init)).toString();
                    }
                    else {
                        number_invoice = '';
                    }
                }
            }
        }
        else {
            number_invoice = '';
        }
        //Actualizar datos sobre numeración de facturas
        this.code_paramSelected = environment.current_invoice;
        this.value_paramSelected = (Number(current_invoice) + 1).toString();
        this.operationForm.patchValue({
            number_invoice: number_invoice,
            current_invoice: (Number(current_invoice) + 1)
        });
    };
    NewSaleDetailComponent.prototype.getParameters = function (code) {
        var resultado = this.lstParameters.filter(function (parameter) { return parameter.code === code; });
        if (resultado[0].value != code)
            return resultado[0].value;
        else
            return null;
    };
    NewSaleDetailComponent.prototype.getMultipleParams = function () {
        var _this = this;
        this.parameterService.getByMultipleCodeCategory$(this.categories).pipe(tap(function (params) { return _this.lstParams = params; }), tap(function () {
            _this.enterpriseService.show$(_this.activeUser.fk_id_enterprise).subscribe(function (enterprise) { return _this.enterprise = enterprise; });
        }), tap(function () {
            _this.getParametersByEnterprise();
        })).subscribe();
    };
    NewSaleDetailComponent.prototype.getParametersByEnterprise = function () {
        var _this = this;
        this.parameterConfigService.getByEnterprise$(this.activeUser.fk_id_enterprise).subscribe(function (lstParameters) {
            _this.lstParameters = lstParameters;
            _this.selectNumberSale();
        });
    };
    NewSaleDetailComponent.prototype.initForm = function () {
        this.operationForm = this.fb.group({
            fk_id_person: [this.activeUser.fk_id_person],
            operation_type: [environment.sales],
            state_operation: [environment.state_initial_purchase],
            total_operation: [0],
            total_tax: [0],
            total_discounts: [0],
            external_reference: ['', Validators.required],
            number_invoice: ['', Validators.required],
            subtotal_operation: [0],
            value_payment: [0],
            payment_type: [environment.efecty_payment, Validators.required],
            value_received: [0],
            current_invoice: [0],
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
            client: this.fb.group({
                type_id: [''],
                number_id: [''],
                names: [''],
                last_names: [''],
                address: [''],
                phone: [''],
            }),
            products_list: this.fb.array([])
        });
    };
    Object.defineProperty(NewSaleDetailComponent.prototype, "products_list", {
        get: function () {
            return this.operationForm.get('products_list');
        },
        enumerable: true,
        configurable: true
    });
    NewSaleDetailComponent.prototype.onSubmit = function () {
        this.saveProduct();
    };
    NewSaleDetailComponent.prototype.onFindClient = function (filter) {
        var _this = this;
        var idClient = document.getElementById('filterClient').value;
        this.lstClients = [];
        if (idClient.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.personService.getPersonsByIdFilter$(idClient).subscribe(function (lstClients) {
                    _this.lstClients = lstClients;
                    _this.emptyCli = false;
                }, function () {
                    _this.emptyCli = true;
                    _this.person = new Person;
                    _this.operationForm.get('client').patchValue({
                        number_id: _this.operationForm.value.external_reference
                    });
                });
            }
        }
    };
    NewSaleDetailComponent.prototype.selectClient = function (person) {
        this.emptyCli = false;
        this.person = person;
        this.lstClients = [];
        this.operationForm.patchValue({
            external_reference: person.pk_id_person
        });
    };
    NewSaleDetailComponent.prototype.onFindProduct = function (filter) {
        var _this = this;
        var codeProduct = document.getElementById('filterProduct').value;
        this.lstProducts = [];
        if (codeProduct.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.productService.getSalesProductsByCodeFilter$(codeProduct).subscribe(function (lstProducts) {
                    _this.lstProducts = lstProducts;
                    if (lstProducts.length == 1) {
                        _this.selectProduct(lstProducts[0]);
                    }
                    _this.emptyPrd = false;
                }, function () {
                    _this.emptyPrd = true;
                    _this.product = new Product;
                });
            }
        }
    };
    NewSaleDetailComponent.prototype.onFindProductByName = function (filter) {
        var _this = this;
        var nameProduct = document.getElementById('nameProduct').value;
        this.lstProductsByName = [];
        if (nameProduct.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.productService.getSalesProductsByNameFilter$(nameProduct).subscribe(function (lstProducts) {
                    _this.lstProductsByName = lstProducts;
                    if (lstProducts.length == 1) {
                        _this.selectProduct(lstProducts[0]);
                    }
                    _this.emptyPrd = false;
                }, function () { return _this.emptyPrd = true; });
            }
        }
    };
    NewSaleDetailComponent.prototype.selectProduct = function (product) {
        var cost_price = 0;
        this.emptyPrd = false;
        this.product = product;
        this.lstProducts = [];
        this.lstProductsByName = [];
        if (this.product.presentation === environment.individual) {
            cost_price = this.product.sale_price_unit;
            this.setUnitsByProduct();
        }
        else {
            cost_price = this.product.sale_price_package;
            this.setPackageByProduct();
        }
        this.operationForm.get('product').patchValue({
            code: product.code,
            cost_price: cost_price,
            number_units: 1
        });
        //pone el focus sobre el input de código.
        this.numberUnits.nativeElement.focus();
    };
    NewSaleDetailComponent.prototype.setUnitsByProduct = function () {
        this.units_available = this.product.units_available;
        this.selectedPresentation = 'INDIVIDUAL';
        this.operationForm.get('product').patchValue({
            cost_price: this.product.sale_price_unit,
            presentation: 'INDIVIDUAL'
        });
    };
    NewSaleDetailComponent.prototype.setPackageByProduct = function () {
        this.units_available = this.product.units_available / this.product.units_package;
        this.selectedPresentation = 'PAQUETE';
        this.operationForm.get('product').patchValue({
            cost_price: this.product.sale_price_package,
            presentation: 'PAQUETE'
        });
    };
    NewSaleDetailComponent.prototype.addProduct = function () {
        var value_payment = 0;
        var totalProduct = 0;
        var totalOperation = 0;
        var subTotalOperation = this.operationForm.value.subtotal_operation;
        var totalTaxOperation = this.operationForm.value.total_tax;
        var tax_product = this.operationForm.get('product').value.tax_product;
        var units = this.operationForm.get('product').value.number_units;
        var value = this.operationForm.get('product').value.cost_price;
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
            total_product: totalProduct
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
    NewSaleDetailComponent.prototype.updatePaymentValue = function () {
        if (this.operationForm.value.payment_type != environment.efecty_payment) {
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
    NewSaleDetailComponent.prototype.saveProductAndPrint = function () {
        var _this = this;
        this.operationService.storeOperation$(this.operationForm.value)
            .pipe(tap(function (operation) {
            _this.initForm();
            _this.pk_id_operation = operation.pk_id_operation;
            _this.person = new Person();
            _this.success = true;
            _this.message = 'Se realizó la creación de la factura con éxito.';
        }), tap(function () {
            _this.parameterConfigService.updateByEnterpriseAndCodeAndValue$(_this.activeUser.fk_id_enterprise, _this.code_paramSelected, _this.value_paramSelected).subscribe(function () { _this.getParametersByEnterprise(); });
        }), tap(function (operation) {
            _this.operationService.getOperationPDF$(operation.pk_id_operation).subscribe(function (path) {
                var configuracion_ventana = "menubar=no,width=800,height=1200,location=yes,resizable=yes,scrollbars=yes,status=yes";
                var w = window.open(_this.url_storage + path, "_blank", configuracion_ventana);
                //w.focus();
                //w.print();
                //w.close();         
            });
        }))
            .subscribe();
    };
    NewSaleDetailComponent.prototype.saveProduct = function () {
        var _this = this;
        this.operationService.storeOperation$(this.operationForm.value)
            .pipe(tap(function (operation) {
            _this.initForm();
            _this.pk_id_operation = operation.pk_id_operation;
            _this.person = new Person();
            _this.success = true;
            _this.message = 'Se realizó la creación de la factura con éxito.';
        }), tap(function () {
            _this.parameterConfigService.updateByEnterpriseAndCodeAndValue$(_this.activeUser.fk_id_enterprise, _this.code_paramSelected, _this.value_paramSelected).subscribe(function () { _this.getParametersByEnterprise(); });
        }))
            .subscribe();
    };
    NewSaleDetailComponent.prototype.delProduct = function (prd, idx) {
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
    ], NewSaleDetailComponent.prototype, "nameField", void 0);
    __decorate([
        ViewChild('number_units'),
        __metadata("design:type", ElementRef)
    ], NewSaleDetailComponent.prototype, "numberUnits", void 0);
    NewSaleDetailComponent = __decorate([
        Component({
            selector: 'app-new-sale-detail',
            templateUrl: 'new-sale-detail.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [OperationService,
            FormBuilder,
            GlobalStoreService,
            PersonService,
            ProductService,
            ParameterService,
            EnterpriseService,
            ParameterConfigService])
    ], NewSaleDetailComponent);
    return NewSaleDetailComponent;
}());
export { NewSaleDetailComponent };
//# sourceMappingURL=new-sale-detail.component.js.map