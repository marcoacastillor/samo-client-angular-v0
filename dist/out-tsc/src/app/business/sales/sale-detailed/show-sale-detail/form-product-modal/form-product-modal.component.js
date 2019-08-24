var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faSave, faCheckCircle, faSearch, faPlusCircle, faArchive, faUnderline } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { Operation } from 'src/app/shared/models/operation';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
var FormProductModalComponent = /** @class */ (function () {
    function FormProductModalComponent(fb, productService, formToolService) {
        this.fb = fb;
        this.productService = productService;
        this.formToolService = formToolService;
        this.faSave = faSave;
        this.faSearch = faSearch;
        this.faCheckCircle = faCheckCircle;
        this.faPlusCircle = faPlusCircle;
        this.faArchive = faArchive;
        this.faUnderline = faUnderline;
        this.taxes = environment.tax_purchase;
        this.addProduct = new EventEmitter();
        this.lstProductsCodes = [];
        this.lstProductsNames = [];
        this.product = new Product();
        this.lastkeydown1 = 0;
        this.selectedPresentation = '';
        this.units_available = 0;
    }
    FormProductModalComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    FormProductModalComponent.prototype.ngOnChanges = function (changes) {
        if (changes.operation) {
            if (changes.operation.currentValue != changes.operation.previousValue) {
                this.initForm();
            }
        }
    };
    FormProductModalComponent.prototype.initForm = function () {
        this.productForm = this.fb.group({
            fk_id_product: [this.product.pk_id_product],
            code_product: [this.product.code],
            name_product: [this.product.name],
            fk_id_operation: [this.operation.pk_id_operation],
            number_selected: ['0', Validators.required],
            cost_price: ['0'],
            presentation: [''],
            tax_product: ['0', Validators.required]
        });
    };
    FormProductModalComponent.prototype.onFindProductName = function (filter) {
        var _this = this;
        var nameProduct = document.getElementById('filterProductName').value;
        this.lstProductsNames = [];
        if (nameProduct.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.productService.getSalesProductsByNameFilter$(nameProduct).subscribe(function (lstProducts) {
                    _this.lstProductsNames = lstProducts;
                    if (lstProducts.length == 1) {
                        _this.selectProduct(lstProducts[0]);
                    }
                });
            }
        }
    };
    FormProductModalComponent.prototype.onFindProductCode = function (filter) {
        var _this = this;
        var codeProduct = document.getElementById('filterProductCode').value;
        this.lstProductsCodes = [];
        if (codeProduct.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.productService.getSalesProductsByCodeFilter$(codeProduct).subscribe(function (lstProducts) {
                    _this.lstProductsCodes = lstProducts;
                    if (lstProducts.length == 1) {
                        _this.selectProduct(lstProducts[0]);
                    }
                });
            }
        }
    };
    FormProductModalComponent.prototype.selectProduct = function (product) {
        var cost_price = 0;
        this.product = product;
        this.initForm();
        this.lstProductsCodes = [];
        this.lstProductsNames = [];
        if (this.product.presentation === environment.individual) {
            cost_price = this.product.sale_price_unit;
            this.setUnitsByProduct();
        }
        else {
            cost_price = this.product.sale_price_package;
            this.setPackageByProduct();
        }
        //Setear valores del producto seleccionado.
        this.productForm.patchValue({
            fk_id_product: product.pk_id_product,
            code_product: product.code,
            name_product: product.name,
            cost_price: cost_price,
            number_selected: 1
        });
        //pone el focus sobre el input de código.
        if (this.numberUnits)
            this.numberUnits.nativeElement.focus();
    };
    FormProductModalComponent.prototype.setUnitsByProduct = function () {
        this.units_available = this.product.units_available;
        this.selectedPresentation = 'INDIVIDUAL';
        this.productForm.patchValue({
            cost_price: this.product.sale_price_unit,
            presentation: 'INDIVIDUAL'
        });
    };
    FormProductModalComponent.prototype.setPackageByProduct = function () {
        this.units_available = this.product.units_available / this.product.units_package;
        this.selectedPresentation = 'PAQUETE';
        this.productForm.patchValue({
            cost_price: this.product.sale_price_package,
            presentation: 'PAQUETE'
        });
    };
    FormProductModalComponent.prototype.add = function () {
        this.addProduct.emit(this.productForm.value);
        this.product = new Product;
        this.initForm();
    };
    /**
     * Funciones para verificar si los formularios son obligatorios o no.
     */
    FormProductModalComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.productForm, controlName);
    };
    FormProductModalComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.productForm, controlName);
    };
    FormProductModalComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.productForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", Operation)
    ], FormProductModalComponent.prototype, "operation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FormProductModalComponent.prototype, "lstParams", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FormProductModalComponent.prototype, "addProduct", void 0);
    __decorate([
        ViewChild('number_units'),
        __metadata("design:type", ElementRef)
    ], FormProductModalComponent.prototype, "numberUnits", void 0);
    FormProductModalComponent = __decorate([
        Component({
            selector: 'app-form-product-modal',
            templateUrl: 'form-product-modal.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            ProductService,
            FormToolsService])
    ], FormProductModalComponent);
    return FormProductModalComponent;
}());
export { FormProductModalComponent };
//# sourceMappingURL=form-product-modal.component.js.map