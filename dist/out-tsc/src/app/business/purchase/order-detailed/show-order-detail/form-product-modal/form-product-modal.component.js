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
import { faSave, faSearch, faCheckCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Operation } from 'src/app/shared/models/operation';
import { Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/shared/services/product.service';
var FormProductModalComponent = /** @class */ (function () {
    function FormProductModalComponent(fb, productService) {
        this.fb = fb;
        this.productService = productService;
        this.faSave = faSave;
        this.faSearch = faSearch;
        this.faCheckCircle = faCheckCircle;
        this.faPlusCircle = faPlusCircle;
        this.taxes = environment.tax_purchase;
        this.addProduct = new EventEmitter();
        //@ViewChild('units_product') nameField: ElementRef;
        this.lstProductsCodes = [];
        this.lstProductsNames = [];
        this.product = new Product();
        this.lastkeydown1 = 0;
    }
    FormProductModalComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    FormProductModalComponent.prototype.ngOnChanges = function (changes) {
        if (changes.operation) {
            if (changes.operation.currentValue != changes.operation.previousValue) {
                this.product = new Product;
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
            number_selected: ['0'],
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
                this.productService.getByNameFilterAndType$(nameProduct).subscribe(function (lstProducts) { return _this.lstProductsNames = lstProducts; });
            }
        }
    };
    FormProductModalComponent.prototype.onFindProductCode = function (filter) {
        var _this = this;
        var codeProduct = document.getElementById('filterProductCode').value;
        this.lstProductsCodes = [];
        if (codeProduct.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.productService.getByCodeFilterAndType$(codeProduct).subscribe(function (lstProducts) { return _this.lstProductsCodes = lstProducts; });
            }
        }
    };
    FormProductModalComponent.prototype.selectProduct = function (product) {
        this.product = product;
        this.lstProductsCodes = [];
        this.lstProductsNames = [];
        this.productForm.patchValue({
            fk_id_product: product.pk_id_product,
            code_product: product.code,
            name_product: product.name,
            presentation: product.presentation
        });
        //resetear producto seleccionado con código de barras.
        //this.nameField.nativeElement.focus();
    };
    FormProductModalComponent.prototype.add = function () {
        this.addProduct.emit(this.productForm.value);
        this.initForm();
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
    FormProductModalComponent = __decorate([
        Component({
            selector: 'app-form-product-modal',
            templateUrl: 'form-product-modal.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            ProductService])
    ], FormProductModalComponent);
    return FormProductModalComponent;
}());
export { FormProductModalComponent };
//# sourceMappingURL=form-product-modal.component.js.map