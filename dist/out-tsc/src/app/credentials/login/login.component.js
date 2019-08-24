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
import { FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from '../../shared/services/form-tools.service';
import { GlobalStoreService } from '../../core/services/global-store.service';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Authentication } from 'src/app/shared/models/authentication';
import { tap } from 'rxjs/operators';
import { PersonService } from 'src/app/shared/services/person.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { RolService } from 'src/app/shared/services/rol.service';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, formToolService, userService, globalStoreService, router, personService, authenticationService, enterPriseService, rolService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.userService = userService;
        this.globalStoreService = globalStoreService;
        this.router = router;
        this.personService = personService;
        this.authenticationService = authenticationService;
        this.enterPriseService = enterPriseService;
        this.rolService = rolService;
        this.userLogin = new User;
        this.success = true;
        this.code = '';
        this.description = '';
        this.user$ = this.globalStoreService.getUser$();
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    LoginComponent.prototype.initForm = function () {
        this.authenticationForm = this.fb.group({
            username: ['', Validators.required],
            token: [''],
            password: ['', [Validators.required, Validators.minLength(3)]],
        });
    };
    /*
    * ------------------------------------------
    * Funciones propias del controlador
    * ------------------------------------------
    */
    LoginComponent.prototype.onLogin = function () {
        var _this = this;
        this.userService.sendCredential$(this.authenticationForm.value).pipe(tap(function (user) {
            _this.userLogin = user;
        }), tap(function (user) {
            _this.rolService.showLogin$(user.fk_id_rol).subscribe(function (rol) { return _this.userLogin.rol = rol; });
        }), tap(function (user) {
            _this.personService.showLogin$(user.fk_id_person).subscribe(function (person) { return _this.userLogin.person = person; });
        }), tap(function (user) {
            _this.enterPriseService.showLogin$(user.fk_id_enterprise).subscribe(function (enterprise) { return _this.userLogin.enterprise = enterprise; });
        }), tap(function (user) {
            _this.globalStoreService.setUser(user);
        }), tap(function (user) {
            var auth = new Authentication;
            auth.api_token = user.api_token;
            auth.username = user.username;
            _this.authenticationService.store$(auth).subscribe();
        }))
            .subscribe(function () { return _this.router.navigateByUrl('/sales-admin/modules'); }, function (error) {
            _this.success = false;
            _this.code = error.error.code;
            _this.description = error.error.message;
            _this.initForm();
        });
    };
    LoginComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.authenticationForm, controlName);
    };
    LoginComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.authenticationForm, controlName);
    };
    LoginComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.authenticationForm, controlName, errorCode);
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: 'login.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService,
            UserService,
            GlobalStoreService,
            Router,
            PersonService,
            AuthenticationService,
            EnterpriseService,
            RolService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map