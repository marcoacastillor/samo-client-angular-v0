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
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { faThList, faSave } from '@fortawesome/free-solid-svg-icons';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { environment } from 'src/environments/environment';
var ProductFormFoodComponent = /** @class */ (function () {
    function ProductFormFoodComponent(activateRoute, productService, fb, formToolService, parameterService) {
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
    ProductFormFoodComponent.prototype.ngOnInit = function () {
        this.createFormFood();
        this.id_product = this.activateRoute.snapshot.params['id'];
        this.initProduct(this.id_product);
        this.loadParameters();
    };
    ProductFormFoodComponent.prototype.initProduct = function (id) {
        if (this.id_product == 'new') {
            this.newProduct();
        }
        else {
            this.getProductDetailById(Number(this.id_product));
        }
    };
    ProductFormFoodComponent.prototype.loadParameters = function () {
        var _this = this;
        this.parameterService.getByMultipleCodeCategory$(this.categories).subscribe(function (parameters_list) { return _this.parametersList = parameters_list; });
    };
    ProductFormFoodComponent.prototype.newProduct = function () {
        this.product = new Product;
        this.product.category = environment.foods;
        this.product.units_package = 0;
        this.product.sale_price_unit = 0;
        this.product.sale_price_package = 0;
        this.createFormFood();
    };
    ProductFormFoodComponent.prototype.getProductDetailById = function (id) {
        var _this = this;
        this.productService.show$(id).subscribe(function (product) {
            _this.product = product;
            _this.createFormFood();
        });
    };
    ProductFormFoodComponent.prototype.createFormFood = function () {
        this.foodsForm = this.fb.group({
            pk_id_product: [this.product.pk_id_product],
            code: [this.product.code, Validators.required],
            reference: [this.product.reference],
            category: [this.product.category, Validators.required],
            name: [this.product.name, Validators.required],
            presentation: [this.product.presentation, Validators.required],
            units_package: [this.product.units_package, Validators.required],
            sale_price_unit: [this.product.sale_price_unit, Validators.required],
            sale_price_package: [this.product.sale_price_package, Validators.required],
            type_product: [this.product.type_product, Validators.required],
            units_available: [this.product.units_available],
            size: [''],
            color: [''],
            trademark: [''],
        });
    };
    ProductFormFoodComponent.prototype.createProduct = function () {
        var _this = this;
        this.productService.store$(this.foodsForm.value).subscribe(function () {
            _this.initProduct(_this.id_product);
            _this.success = true;
            _this.message = 'Se creó producto correctamente.';
        });
    };
    ProductFormFoodComponent.prototype.updateProduct = function () {
        var _this = this;
        this.productService.update$(this.foodsForm.value).subscribe(function () {
            _this.initProduct(_this.id_product);
            _this.success = true;
            _this.message = 'Se actualizó información de producto correctamente.';
        });
    };
    /**
     * Funciones para verificar si los formularios son obligatorios o no.
     */
    ProductFormFoodComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.foodsForm, controlName);
    };
    ProductFormFoodComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.foodsForm, controlName);
    };
    ProductFormFoodComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.foodsForm, controlName, errorCode);
    };
    ProductFormFoodComponent = __decorate([
        Component({
            selector: 'app-product-form-food',
            templateUrl: 'product-form-food.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            ProductService,
            FormBuilder,
            FormToolsService,
            ParameterService])
    ], ProductFormFoodComponent);
    return ProductFormFoodComponent;
}());
export { ProductFormFoodComponent };
//# sourceMappingURL=product-form-food.component.js.map