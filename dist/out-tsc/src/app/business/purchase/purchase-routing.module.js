var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewOrderFileComponent } from './order-file/new-order-file/new-order-file.component';
import { ListOrderDetailComponent } from './order-detailed/list-order-detail/list-order-detail.component';
import { NewOrderDetailComponent } from './order-detailed/new-order-detail/new-order-detail.component';
import { ShowOrderDetailComponent } from './order-detailed/show-order-detail/show-order-detail.component';
var routes = [
    {
        path: '',
        children: [
            {
                path: "purchase-consolidated",
                loadChildren: './consolidated/consolidated.module#ConsolidatedModule',
            },
            {
                path: "purchase-reports",
                loadChildren: './purchase-reports/purchase-reports.module#PurchaseReportsModule',
            }
        ]
    },
    {
        path: 'purchase-file',
        component: NewOrderFileComponent
    },
    {
        path: 'purchase-detailed',
        component: ListOrderDetailComponent,
    },
    {
        path: 'purchase-detailed-new',
        component: NewOrderDetailComponent,
    },
    {
        path: 'purchase-detailed-show/:id',
        component: ShowOrderDetailComponent,
    },
];
var PurchaseRoutingModule = /** @class */ (function () {
    function PurchaseRoutingModule() {
    }
    PurchaseRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], PurchaseRoutingModule);
    return PurchaseRoutingModule;
}());
export { PurchaseRoutingModule };
//# sourceMappingURL=purchase-routing.module.js.map