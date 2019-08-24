var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductShowComponent } from './product-show/product-show.component';
import { ProductFormClothesComponent } from './product-form-clothes/product-form-clothes.component';
import { ProductFormFoodComponent } from './product-form-food/product-form-food.component';
var routes = [
    {
        path: '',
        redirectTo: 'list'
    },
    {
        path: 'list',
        component: ProductListComponent
    },
    {
        path: 'show/:id',
        component: ProductShowComponent
    },
    {
        path: 'create/clothes/:id',
        component: ProductFormClothesComponent
    },
    {
        path: 'create/food/:id',
        component: ProductFormFoodComponent
    }
];
var StocksRoutingModule = /** @class */ (function () {
    function StocksRoutingModule() {
    }
    StocksRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], StocksRoutingModule);
    return StocksRoutingModule;
}());
export { StocksRoutingModule };
//# sourceMappingURL=stocks-routing.module.js.map