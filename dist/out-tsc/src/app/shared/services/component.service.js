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
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
var ComponentService = /** @class */ (function () {
    function ComponentService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_component;
    }
    ComponentService.prototype.getAll$ = function () {
        var _this = this;
        return this.userService.validateOptionByToken('Component:getAll').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(_this._url);
            }
        }));
    };
    ComponentService.prototype.store$ = function (cmp) {
        var _this = this;
        return this.userService.validateOptionByToken('Component:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, cmp);
            }
        }));
    };
    ComponentService.prototype.addOptionsByComponent$ = function (options_component) {
        var _this = this;
        var url = this._url + '/asign-options';
        return this.userService.validateOptionByToken('Component:asignOptions').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(url, options_component);
            }
        }));
    };
    ComponentService.prototype.show$ = function (id_cmp) {
        var _this = this;
        var url = this._url + '/' + id_cmp;
        return this.userService.validateOptionByToken('Component:show').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ComponentService.prototype.update$ = function (cmp) {
        var _this = this;
        return this.userService.validateOptionByToken('Component:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, cmp);
            }
        }));
    };
    ComponentService.prototype.delete$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id.toString();
        return this.userService.validateOptionByToken('Component:delete').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    ComponentService.prototype.getComponentsByModule$ = function (id_module) {
        var _this = this;
        var url = this._url + '/get-components-by-module/' + id_module;
        return this.userService.validateOptionByToken('Component:getByModule').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ComponentService.prototype.getComponentsByModuleAndRol$ = function (id_module, id_rol) {
        var _this = this;
        var url = this._url + '/get-components-by-module-and-rol/' + id_module + '/' + id_rol;
        return this.userService.validateOptionByToken('Component:getComponentsByModuleAndRol').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ComponentService.prototype.getNotComponentsByModuleAndRol$ = function (id_module, id_rol) {
        var _this = this;
        var url = this._url + '/get-not-components-by-module-and-rol/' + id_module + '/' + id_rol;
        return this.userService.validateOptionByToken('Component:getNotComponentsByModuleAndRol').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ComponentService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], ComponentService);
    return ComponentService;
}());
export { ComponentService };
//# sourceMappingURL=component.service.js.map