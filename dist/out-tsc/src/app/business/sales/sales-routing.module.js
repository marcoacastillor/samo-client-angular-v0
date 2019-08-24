var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewSaleDetailComponent } from './sale-detailed/new-sale-detail/new-sale-detail.component';
import { ShowSaleDetailComponent } from './sale-detailed/show-sale-detail/show-sale-detail.component';
import { ListSaleDetailComponent } from './sale-detailed/list-sale-detail/list-sale-detail.component';
var routes = [
    {
        path: '',
        children: [
            {
                path: "consolidated",
                loadChildren: './consolidated-sale/consolidated-sale.module#ConsolidatedSaleModule'
            }
        ]
    },
    {
        path: 'sales-detailed',
        component: ListSaleDetailComponent,
    },
    {
        path: 'sales-detailed-new',
        component: NewSaleDetailComponent,
    },
    {
        path: 'sales-detailed-show/:id',
        component: ShowSaleDetailComponent
    }
];
var SalesRoutingModule = /** @class */ (function () {
    function SalesRoutingModule() {
    }
    SalesRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], SalesRoutingModule);
    return SalesRoutingModule;
}());
export { SalesRoutingModule };
//# sourceMappingURL=sales-routing.module.js.map