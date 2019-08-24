var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeShowComponent } from './employee-show/employee-show.component';
var routes = [
    {
        path: '',
        redirectTo: 'list'
    },
    {
        path: 'list',
        component: EmployeeListComponent,
    },
    {
        path: 'create/:id',
        component: EmployeeFormComponent,
    },
    {
        path: 'show/:id',
        component: EmployeeShowComponent,
    }
];
var EmployeeRoutingModule = /** @class */ (function () {
    function EmployeeRoutingModule() {
    }
    EmployeeRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], EmployeeRoutingModule);
    return EmployeeRoutingModule;
}());
export { EmployeeRoutingModule };
//# sourceMappingURL=employee-routing.module.js.map