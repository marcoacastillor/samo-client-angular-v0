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
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { CuttingPeriod } from 'src/app/shared/models/cutting-period';
import { DetailProductInput } from 'src/app/shared/models/detail-product-input';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { faCheckCircle, faArchive, faUnderline } from '@fortawesome/free-solid-svg-icons';
var ProductFormModalComponent = /** @class */ (function () {
    function ProductFormModalComponent(fb, formToolService, productService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.productService = productService;
        this.faCheckCircle = faCheckCircle;
        this.faArchive = faArchive;
        this.faUnderline = faUnderline;
        this.selectedPresentation = '';
        this.lstProductsNames = [];
        this.lstProductsCodes = [];
        this.units_available = 0;
        this.product = new Product;
        this.lastkeydown1 = 0;
        this.onCreateDetailProduct = new EventEmitter();
    }
    ProductFormModalComponent.prototype.ngOnInit = function () {
        this.initUpdForm(0);
    };
    ProductFormModalComponent.prototype.ngOnChanges = function (changes) {
        if (changes.cuttingPeriod) {
            if (changes.cuttingPeriod.currentValue) {
                this.initUpdForm(0);
            }
        }
    };
    ProductFormModalComponent.prototype.onFindProductName = function (filter) {
        var _this = this;
        var nameProduct = document.getElementById('filterProductName').value;
        this.lstProductsNames = [];
        if (nameProduct.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.productService.getByNameFilterAndTypeINProduction$(nameProduct).subscribe(function (lstProducts) { return _this.lstProductsNames = lstProducts; });
            }
        }
    };
    ProductFormModalComponent.prototype.onFindProductCode = function (filter) {
        var _this = this;
        var codeProduct = document.getElementById('filterProductCode').value;
        this.lstProductsCodes = [];
        if (codeProduct.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.productService.getByCodeFilterAndTypeINProduction$(codeProduct).subscribe(function (lstProducts) { return _this.lstProductsCodes = lstProducts; });
            }
        }
    };
    ProductFormModalComponent.prototype.selectProduct = function (product) {
        this.product = product;
        this.lstProductsCodes = [];
        this.lstProductsNames = [];
        this.detailProductForm.patchValue({
            fk_id_product: product.pk_id_product,
            code_product: product.code,
            name_product: product.name,
            presentation: product.presentation
        });
        this.selectedPresentation = product.presentation;
        if (this.product.type_product == 'Producto Insumo') {
            if (product.presentation == 'INDIVIDUAL') {
                this.initUpdForm(this.product.units_available);
            }
            else {
                this.initUpdForm(this.product.units_available / this.product.units_package);
            }
        }
        else {
            this.initUpdForm(10000);
        }
    };
    ProductFormModalComponent.prototype.setUnitsByProduct = function () {
        this.selectedPresentation = 'INDIVIDUAL';
        if (this.product.type_product == 'Producto Insumo') {
            this.initUpdForm(this.product.units_available);
        }
        this.detailProductForm.patchValue({
            code_product: this.product.code,
            name_product: this.product.name,
            presentation: 'INDIVIDUAL'
        });
    };
    ProductFormModalComponent.prototype.setPackageByProduct = function () {
        this.selectedPresentation = 'PAQUETE';
        if (this.product.type_product == 'Producto Insumo') {
            this.initUpdForm(this.product.units_available / this.product.units_package);
        }
        this.detailProductForm.patchValue({
            code_product: this.product.code,
            name_product: this.product.name,
            presentation: 'PAQUETE',
        });
    };
    ProductFormModalComponent.prototype.create = function () {
        this.onCreateDetailProduct.emit(this.detailProductForm.value);
        this.product = new Product;
        this.initUpdForm(0);
    };
    /*
    * ------------------------------------------
    * Funciones propias del controlador
    * ------------------------------------------
    */
    ProductFormModalComponent.prototype.initUpdForm = function (units) {
        this.detailProductForm = this.fb.group({
            pk_id_detail_product_input: [this.detailProductInput.pk_id_detail_product_input],
            fk_id_cutting_period: [this.cuttingPeriod.pk_id_cutting_period, Validators.required],
            fk_id_product: [this.product.pk_id_product, Validators.required],
            code_product: [this.product.code],
            name_product: [this.product.name],
            presentation: [this.product.presentation],
            amount_use_product: [0, [Validators.required, Validators.max(units)]],
        });
    };
    /**
     * Funciones para verificar si los formularios son obligatorios o no.
     */
    ProductFormModalComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.detailProductForm, controlName);
    };
    ProductFormModalComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.detailProductForm, controlName);
    };
    ProductFormModalComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.detailProductForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", CuttingPeriod)
    ], ProductFormModalComponent.prototype, "cuttingPeriod", void 0);
    __decorate([
        Input(),
        __metadata("design:type", DetailProductInput)
    ], ProductFormModalComponent.prototype, "detailProductInput", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ProductFormModalComponent.prototype, "onCreateDetailProduct", void 0);
    ProductFormModalComponent = __decorate([
        Component({
            selector: 'app-product-form-modal',
            templateUrl: 'product-form-modal.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService,
            ProductService])
    ], ProductFormModalComponent);
    return ProductFormModalComponent;
}());
export { ProductFormModalComponent };
//# sourceMappingURL=product-form-modal.component.js.map