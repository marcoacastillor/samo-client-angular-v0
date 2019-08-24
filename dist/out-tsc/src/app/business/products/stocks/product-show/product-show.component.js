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
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
var ProductShowComponent = /** @class */ (function () {
    function ProductShowComponent(activateRoute, productService) {
        this.activateRoute = activateRoute;
        this.productService = productService;
        this.faThList = faThList;
        this.product = new Product;
    }
    ProductShowComponent.prototype.ngOnInit = function () {
        this.id_product = this.activateRoute.snapshot.params['id'];
        this.getProductDetailById(Number(this.id_product));
    };
    ProductShowComponent.prototype.getProductDetailById = function (id) {
        var _this = this;
        this.productService.show$(id).subscribe(function (product) { return _this.product = product; });
    };
    ProductShowComponent.prototype.getPDFCode = function (html_code) {
        var configuracion_ventana = "menubar=yes,width=800,height=300,location=yes,resizable=yes,scrollbars=yes,status=yes";
        var w = window.open('', "_blank", configuracion_ventana);
        w.document.write(html_code);
        w.document.close();
        w.focus();
        w.print();
        w.close();
    };
    ProductShowComponent = __decorate([
        Component({
            selector: 'app-product-show',
            templateUrl: 'product-show.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            ProductService])
    ], ProductShowComponent);
    return ProductShowComponent;
}());
export { ProductShowComponent };
//# sourceMappingURL=product-show.component.js.map