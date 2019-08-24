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
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
var ModuleService = /** @class */ (function () {
    function ModuleService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_module;
    }
    ModuleService.prototype.getAll$ = function () {
        var _this = this;
        return this.userService.validateOptionByToken('Module:getAll').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(_this._url);
            }
        }));
    };
    ModuleService.prototype.show$ = function (id_module) {
        var _this = this;
        var url = this._url + '/' + id_module;
        return this.userService.validateOptionByToken('Module:show').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ModuleService.prototype.store$ = function (module) {
        var _this = this;
        return this.userService.validateOptionByToken('Module:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, module);
            }
        }));
    };
    ModuleService.prototype.update$ = function (module) {
        var _this = this;
        return this.userService.validateOptionByToken('Module:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, module);
            }
        }));
    };
    ModuleService.prototype.getAllDetailed$ = function (id_rol) {
        var _this = this;
        var url = this._url + '/get-modules-detailed/' + id_rol;
        return this.userService.validateOptionByToken('Module:getModulesDetailed').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ModuleService.prototype.getModulesByRol$ = function (id_rol) {
        var _this = this;
        var url = this._url + '/get-modules-by-rol/' + id_rol;
        return this.userService.validateOptionByToken('Module:getByRol').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ModuleService.prototype.delete$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id.toString();
        return this.userService.validateOptionByToken('Module:delete').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    ModuleService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], ModuleService);
    return ModuleService;
}());
export { ModuleService };
//# sourceMappingURL=module.service.js.map