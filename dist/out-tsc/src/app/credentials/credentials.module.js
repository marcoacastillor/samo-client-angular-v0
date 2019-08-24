var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredentialsRoutingModule } from './credentials-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../shared/services/user.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { PersonService } from '../shared/services/person.service';
import { EnterpriseService } from '../shared/services/enterprise.service';
import { RolService } from '../shared/services/rol.service';
var CredentialsModule = /** @class */ (function () {
    function CredentialsModule() {
    }
    CredentialsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                CredentialsRoutingModule,
                MaterialModule,
                SharedModule,
                HttpClientModule
            ],
            declarations: [LoginComponent],
            exports: [LoginComponent],
            providers: [UserService, AuthenticationService, PersonService, EnterpriseService, RolService]
        })
    ], CredentialsModule);
    return CredentialsModule;
}());
export { CredentialsModule };
//# sourceMappingURL=credentials.module.js.map