var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        this._url = environment.url_authentication_ventas;
    }
    AuthenticationService.prototype.store$ = function (auth) {
        return this.http.post(this._url, auth);
    };
    AuthenticationService.prototype.refreshSales = function () {
        var url = environment.url_refresh_sales;
        return this.http.get(url);
    };
    AuthenticationService.prototype.refreshUsers = function () {
        var url = environment.url_refresh_users;
        return this.http.get(url);
    };
    AuthenticationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map