var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ModulesMainComponent } from './modules-main/modules-main.component';
var routes = [
    {
        path: '',
        component: MainMenuComponent,
        children: [
            {
                path: 'administration',
                loadChildren: './administration/administration.module#AdministrationModule'
            },
            {
                path: 'access-manager',
                loadChildren: './access-manager/access-manager.module#AccessManagerModule'
            },
            {
                path: 'configuration',
                loadChildren: './configuration/configuration.module#ConfigurationModule'
            },
            {
                path: 'purchases',
                loadChildren: './purchase/purchase.module#PurchaseModule'
            },
            {
                path: 'sales',
                loadChildren: './sales/sales.module#SalesModule'
            },
            {
                path: 'products',
                loadChildren: './products/products.module#ProductsModule'
            },
            {
                path: 'human-resource',
                loadChildren: './human-resources/human-resources.module#HumanResourcesModule'
            },
            {
                path: 'enterprises',
                loadChildren: './enterprises/enterprises.module#EnterprisesModule'
            },
            {
                path: 'expenses',
                loadChildren: './expenses/expenses.module#ExpensesModule'
            },
            {
                path: 'production-process',
                loadChildren: './production/production.module#ProductionModule'
            },
            {
                path: 'settlements',
                loadChildren: './settlements/settlements.module#SettlementsModule'
            },
            {
                path: 'financial-reports',
                loadChildren: './financial-reports/financial-reports.module#FinancialReportsModule'
            }
        ]
    },
    {
        path: 'modules',
        component: ModulesMainComponent
    }
];
var BusinessRoutingModule = /** @class */ (function () {
    function BusinessRoutingModule() {
    }
    BusinessRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], BusinessRoutingModule);
    return BusinessRoutingModule;
}());
export { BusinessRoutingModule };
//# sourceMappingURL=business-routing.module.js.map