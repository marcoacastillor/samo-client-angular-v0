var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServiceManagerListComponent } from './service-manager-list/service-manager-list.component';
import { ServiceManagerShowComponent } from './service-manager-show/service-manager-show.component';
import { ServiceManagerCreateComponent } from './service-manager-create/service-manager-create.component';
var routes = [
    {
        path: '',
        redirectTo: 'list'
    },
    {
        path: 'list',
        component: ServiceManagerListComponent,
    },
    {
        path: 'show/:id',
        component: ServiceManagerShowComponent,
    },
    {
        path: 'create/:id',
        component: ServiceManagerCreateComponent,
    },
];
var ServiceManagerRoutingModule = /** @class */ (function () {
    function ServiceManagerRoutingModule() {
    }
    ServiceManagerRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], ServiceManagerRoutingModule);
    return ServiceManagerRoutingModule;
}());
export { ServiceManagerRoutingModule };
//# sourceMappingURL=service-manager-routing.module.js.map