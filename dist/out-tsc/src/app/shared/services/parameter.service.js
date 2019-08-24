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
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
var ParameterService = /** @class */ (function () {
    function ParameterService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_parameter;
    }
    ParameterService.prototype.store$ = function (cmp) {
        var _this = this;
        return this.userService.validateOptionByToken('Parameter:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, cmp);
            }
        }));
    };
    ParameterService.prototype.getByCodeCategory$ = function (code) {
        var _this = this;
        var url = this._url + '/get-param-by-categ/' + code;
        return this.userService.validateOptionByToken('Parameter:getByCategory').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ParameterService.prototype.getByMultipleCodeCategory$ = function (codes) {
        var _this = this;
        var url = this._url + '/get-param-by-multiple-categ';
        return this.userService.validateOptionByToken('Parameter:getByMultipleCategory').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(url, codes);
            }
        }));
    };
    ParameterService.prototype.update$ = function (cmp) {
        var _this = this;
        return this.userService.validateOptionByToken('Parameter:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, cmp);
            }
        }));
    };
    ParameterService.prototype.delete$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id.toString();
        return this.userService.validateOptionByToken('Parameter:delete').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    ParameterService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], ParameterService);
    return ParameterService;
}());
export { ParameterService };
//# sourceMappingURL=parameter.service.js.map