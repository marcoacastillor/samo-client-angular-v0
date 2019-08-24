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
import { environment } from '../../../environments/environment';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
var OptionRolService = /** @class */ (function () {
    function OptionRolService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_rol_option;
    }
    OptionRolService.prototype.getModulesByRol$ = function (rol_option) {
        var _this = this;
        return this.userService.validateOptionByToken('OptionRol:getModulesByRol').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, rol_option);
            }
        }));
    };
    OptionRolService.prototype.create$ = function (pk_id_option, pk_id_rol) {
        var _this = this;
        var url = this._url + '/create/' + pk_id_option + '/' + pk_id_rol;
        return this.userService.validateOptionByToken('OptionRol:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OptionRolService.prototype.delete$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id;
        return this.userService.validateOptionByToken('OptionRol:delete').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    OptionRolService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], OptionRolService);
    return OptionRolService;
}());
export { OptionRolService };
//# sourceMappingURL=option-rol.service.js.map