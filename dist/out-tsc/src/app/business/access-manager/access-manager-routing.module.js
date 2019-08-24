var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
var routes = [
    {
        path: '',
        children: [
            {
                path: 'modules',
                loadChildren: './modules/modules.module#ModulesModule'
            },
            {
                path: 'users',
                loadChildren: './users/users.module#UsersModule'
            },
            {
                path: 'users-owners',
                loadChildren: './users-owners/users-owners.module#UsersOwnersModule'
            },
            {
                path: 'rols',
                loadChildren: './rols/rols.module#RolsModule'
            },
            {
                path: 'options',
                loadChildren: './options/options.module#OptionsModule'
            },
        ]
    }
];
var AccessManagerRoutingModule = /** @class */ (function () {
    function AccessManagerRoutingModule() {
    }
    AccessManagerRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], AccessManagerRoutingModule);
    return AccessManagerRoutingModule;
}());
export { AccessManagerRoutingModule };
//# sourceMappingURL=access-manager-routing.module.js.map