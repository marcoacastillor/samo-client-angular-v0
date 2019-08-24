var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksRoutingModule } from './stocks-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductService } from 'src/app/shared/services/product.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ProductShowComponent } from './product-show/product-show.component';
import { ProductFormClothesComponent } from './product-form-clothes/product-form-clothes.component';
import { ProductFormFoodComponent } from './product-form-food/product-form-food.component';
import { ParameterService } from 'src/app/shared/services/parameter.service';
var StocksModule = /** @class */ (function () {
    function StocksModule() {
    }
    StocksModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                StocksRoutingModule,
                SharedModule,
                FontAwesomeModule,
            ],
            providers: [
                ProductService, UtilsService, ParameterService
            ],
            declarations: [ProductListComponent, ProductShowComponent, ProductFormClothesComponent, ProductFormFoodComponent]
        })
    ], StocksModule);
    return StocksModule;
}());
export { StocksModule };
//# sourceMappingURL=stocks.module.js.map