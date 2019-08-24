var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { faThList, faSave } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
var ProductFormClothesComponent = /** @class */ (function () {
    function ProductFormClothesComponent(activateRoute, productService, fb, formToolService, parameterService) {
        this.activateRoute = activateRoute;
        this.productService = productService;
        this.fb = fb;
        this.formToolService = formToolService;
        this.parameterService = parameterService;
        this.faThList = faThList;
        this.faSave = faSave;
        this.showPackageInfo = false;
        this.id_product = '';
        this.product = new Product;
        this.success = false;
        this.message = '';
        this.parametersList = [];
        //consultar parámetros
        this.type_product = environment.product_type;
        this.presentation = environment.presentation_product;
        this.categories = { 'categories': [this.type_product, this.presentation] };
    }
    ProductFormClothesComponent.prototype.ngOnInit = function () {
        this.createFormFood();
        this.id_product = this.activateRoute.snapshot.params['id'];
        this.initProduct(this.id_product);
        this.loadParameters();
    };
    ProductFormClothesComponent.prototype.initProduct = function (id) {
        if (this.id_product == 'new') {
            this.newProduct();
        }
        else {
            this.getProductDetailById(Number(this.id_product));
        }
    };
    ProductFormClothesComponent.prototype.loadParameters = function () {
        var _this = this;
        this.parameterService.getByMultipleCodeCategory$(this.categories).subscribe(function (parameters_list) { return _this.parametersList = parameters_list; });
    };
    ProductFormClothesComponent.prototype.newProduct = function () {
        this.product = new Product;
        this.product.category = environment.clothes;
        this.product.presentation = environment.individual;
        this.product.sale_price_package = 0;
        this.product.sale_price_unit = 0;
        this.createFormFood();
    };
    ProductFormClothesComponent.prototype.getProductDetailById = function (id) {
        var _this = this;
        this.productService.show$(id).subscribe(function (product) {
            _this.product = product;
            _this.createFormFood();
        });
    };
    ProductFormClothesComponent.prototype.createFormFood = function () {
        this.clothesForm = this.fb.group({
            pk_id_product: [this.product.pk_id_product],
            code: [this.product.code, Validators.required],
            reference: [this.product.reference],
            category: [this.product.category, Validators.required],
            name: [this.product.name, Validators.required],
            presentation: [this.product.presentation, Validators.required],
            units_package: [this.product.units_package],
            sale_price_unit: [this.product.sale_price_unit, Validators.required],
            sale_price_package: [this.product.sale_price_package],
            type_product: [this.product.type_product, Validators.required],
            units_available: [this.product.units_available],
            size: [this.product.size, Validators.required],
            color: [this.product.color, Validators.required],
            trademark: [this.product.trademark, Validators.required],
        });
    };
    ProductFormClothesComponent.prototype.createProduct = function () {
        var _this = this;
        this.productService.store$(this.clothesForm.value).subscribe(function () {
            _this.initProduct(_this.id_product);
            _this.success = true;
            _this.message = 'Se creó producto correctamente.';
        });
    };
    ProductFormClothesComponent.prototype.updateProduct = function () {
        var _this = this;
        this.productService.update$(this.clothesForm.value).subscribe(function () {
            _this.initProduct(_this.id_product);
            _this.success = true;
            _this.message = 'Se actualizó información de producto correctamente.';
        });
    };
    /**
     * Funciones para verificar si los formularios son obligatorios o no.
     */
    ProductFormClothesComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.clothesForm, controlName);
    };
    ProductFormClothesComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.clothesForm, controlName);
    };
    ProductFormClothesComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.clothesForm, controlName, errorCode);
    };
    ProductFormClothesComponent = __decorate([
        Component({
            selector: 'app-product-form-clothes',
            templateUrl: 'product-form-clothes.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            ProductService,
            FormBuilder,
            FormToolsService,
            ParameterService])
    ], ProductFormClothesComponent);
    return ProductFormClothesComponent;
}());
export { ProductFormClothesComponent };
//# sourceMappingURL=product-form-clothes.component.js.map