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
import { faPlusCircle, faTrash, faEdit, faSearch, faFlag, faEye } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/shared/services/product.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { User } from 'src/app/shared/models/user';
import { Product } from 'src/app/shared/models/product';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(productService, globalStoreService, utilService, router) {
        this.productService = productService;
        this.globalStoreService = globalStoreService;
        this.utilService = utilService;
        this.router = router;
        this.faPlusCircle = faPlusCircle;
        this.faTrash = faTrash;
        this.faEdit = faEdit;
        this.faSearch = faSearch;
        this.faFlag = faFlag;
        this.faEye = faEye;
        this.user = new User;
        this.lstProducts = [];
        this.product = new Product;
        this.lastkeydown1 = 0;
        this.valMin = environment.min_products;
        this.valMedium = environment.medium_products;
    }
    ProductListComponent.prototype.ngOnInit = function () {
        this.user = this.globalStoreService.getUser();
        this.loadAllProductsByEnterprise(this.user.fk_id_enterprise);
    };
    ProductListComponent.prototype.loadAllProductsByEnterprise = function (id_enterprise) {
        var _this = this;
        this.productService.getAllByEnterprise$(id_enterprise).subscribe(function (lst_products) { return _this.lstProducts = lst_products; });
    };
    ProductListComponent.prototype.onFindProductByCode = function (filter) {
        var _this = this;
        var codeProduct = document.getElementById('codeProduct').value;
        this.lstProducts = [];
        if (codeProduct.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.productService.getByCodeFilterAndEnterprise$(codeProduct, this.user.fk_id_enterprise).subscribe(function (lst_products) {
                    _this.lstProducts = lst_products;
                });
            }
        }
        else {
            this.loadAllProductsByEnterprise(this.user.fk_id_enterprise);
        }
    };
    ProductListComponent.prototype.onFindProductByName = function (filter) {
        var _this = this;
        var nameProduct = document.getElementById('nameProduct').value;
        this.lstProducts = [];
        if (nameProduct.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.productService.getByNameFilterAndEnterprise$(nameProduct, this.user.fk_id_enterprise).subscribe(function (lst_products) {
                    _this.lstProducts = lst_products;
                });
            }
        }
        else {
            this.loadAllProductsByEnterprise(this.user.fk_id_enterprise);
        }
    };
    ProductListComponent.prototype.onFindProductByReference = function (filter) {
        var _this = this;
        var refProduct = document.getElementById('referenceProduct').value;
        this.lstProducts = [];
        if (refProduct.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.productService.getByReferenceFilterAndEnterprise$(refProduct, this.user.fk_id_enterprise).subscribe(function (lst_products) {
                    _this.lstProducts = lst_products;
                });
            }
        }
        else {
            this.loadAllProductsByEnterprise(this.user.fk_id_enterprise);
        }
    };
    ProductListComponent.prototype.selectProduct = function (product) {
        this.product = product;
    };
    ProductListComponent.prototype.deleteProduct = function () {
        var _this = this;
        this.productService.delete$(this.product.pk_id_product).subscribe(function () { return _this.loadAllProductsByEnterprise(_this.user.fk_id_enterprise); });
    };
    ProductListComponent.prototype.getClassByUnits = function (units) {
        return this.utilService.getClassByUnits(units);
    };
    ProductListComponent.prototype.crtProduct = function (type) {
        this.router.navigateByUrl('sales-admin/products/stocks/create/' + type + '/new');
    };
    ProductListComponent.prototype.updProduct = function (category, id) {
        if (category == environment.foods) {
            this.router.navigateByUrl('sales-admin/products/stocks/create/food/' + id);
        }
        if (category == environment.clothes) {
            this.router.navigateByUrl('sales-admin/products/stocks/create/clothes/' + id);
        }
    };
    ProductListComponent = __decorate([
        Component({
            selector: 'app-product-list',
            templateUrl: 'product-list.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ProductService,
            GlobalStoreService,
            UtilsService,
            Router])
    ], ProductListComponent);
    return ProductListComponent;
}());
export { ProductListComponent };
//# sourceMappingURL=product-list.component.js.map