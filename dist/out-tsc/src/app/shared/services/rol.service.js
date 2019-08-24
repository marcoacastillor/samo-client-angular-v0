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
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
var RolService = /** @class */ (function () {
    function RolService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_rol;
    }
    RolService.prototype.getAll$ = function () {
        var _this = this;
        return this.userService.validateOptionByToken('Rol:getAll').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(_this._url);
            }
        }));
    };
    RolService.prototype.getAllNotSuperadmin$ = function () {
        var _this = this;
        var url = this._url + '/get-not-superadmin';
        return this.userService.validateOptionByToken('Rol:getNotSuperadmin').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    RolService.prototype.store$ = function (rol) {
        var _this = this;
        return this.userService.validateOptionByToken('Rol:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, rol);
            }
        }));
    };
    RolService.prototype.show$ = function (id_rol) {
        var _this = this;
        var url = this._url + '/' + id_rol;
        return this.userService.validateOptionByToken('Rol:show').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    RolService.prototype.showLogin$ = function (id) {
        var url = this._url + '/show-login/' + id;
        return this.http.get(url);
    };
    RolService.prototype.delete$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id.toString();
        return this.userService.validateOptionByToken('Rol:delete').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    RolService.prototype.getRolWithOptions$ = function (id) {
        var _this = this;
        var url = this._url + '/get-options-selected-by-rol/' + id.toString();
        return this.userService.validateOptionByToken('Rol:getWithOptions').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    RolService.prototype.update$ = function (Rol) {
        var _this = this;
        return this.userService.validateOptionByToken('Rol:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, Rol);
            }
        }));
    };
    RolService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], RolService);
    return RolService;
}());
export { RolService };
//# sourceMappingURL=rol.service.js.map