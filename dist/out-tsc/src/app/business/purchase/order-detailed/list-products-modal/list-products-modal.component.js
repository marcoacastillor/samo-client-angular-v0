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
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/shared/services/product.service';
var ListProductsModalComponent = /** @class */ (function () {
    function ListProductsModalComponent(productService) {
        this.productService = productService;
        this.selectProduct = new EventEmitter();
        this.lastkeydown1 = 0;
        this.faCheckCircle = faCheckCircle;
        this.empty = false;
    }
    ListProductsModalComponent.prototype.ngOnInit = function () {
    };
    ListProductsModalComponent.prototype.onSelectProduct = function (product) {
        this.selectProduct.emit(product);
    };
    ListProductsModalComponent.prototype.onFindProduct = function (filter) {
        var _this = this;
        var nameProduct = document.getElementById('name_product').value;
        this.lstProducts = [];
        if (nameProduct.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.productService.getByNameFilterAndType$(nameProduct).subscribe(function (lstProducts) {
                    _this.lstProducts = lstProducts;
                    _this.empty = false;
                }, function () { return _this.empty = true; });
            }
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ListProductsModalComponent.prototype, "lstProducts", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListProductsModalComponent.prototype, "selectProduct", void 0);
    ListProductsModalComponent = __decorate([
        Component({
            selector: 'app-list-products-modal',
            templateUrl: 'list-products-modal.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ProductService])
    ], ListProductsModalComponent);
    return ListProductsModalComponent;
}());
export { ListProductsModalComponent };
//# sourceMappingURL=list-products-modal.component.js.map