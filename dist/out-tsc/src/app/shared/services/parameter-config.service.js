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
var ParameterConfigService = /** @class */ (function () {
    function ParameterConfigService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_parameter_config;
    }
    ParameterConfigService.prototype.getByEnterprise$ = function (id_enterprise) {
        var _this = this;
        var url = this._url + '/get-by-enterprise/' + id_enterprise.toString();
        return this.userService.validateOptionByToken('ParameterConfig:getByEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ParameterConfigService.prototype.store$ = function (cmp) {
        var _this = this;
        return this.userService.validateOptionByToken('ParameterConfig:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, cmp);
            }
        }));
    };
    ParameterConfigService.prototype.createAllsParamsBytype$ = function (type, id_enterprise) {
        var _this = this;
        var url = this._url + '/create-all-params-by-type/' + type + '/' + id_enterprise.toString();
        return this.userService.validateOptionByToken('ParameterConfig:createAllParamsByType').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ParameterConfigService.prototype.update$ = function (cmp) {
        var _this = this;
        return this.userService.validateOptionByToken('ParameterConfig:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, cmp);
            }
        }));
    };
    ParameterConfigService.prototype.updateByEnterpriseAndCodeAndValue$ = function (id_enterprise, code, value) {
        var _this = this;
        var url = this._url + '/update-by-enterprise-and-code-and-value/' + id_enterprise.toString() + '/' + code + '/' + value;
        return this.userService.validateOptionByToken('ParameterConfig:updateByEnterpriseAndCodeAndValue').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ParameterConfigService.prototype.delete$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id.toString();
        return this.userService.validateOptionByToken('ParameterConfig:delete').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    ParameterConfigService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], ParameterConfigService);
    return ParameterConfigService;
}());
export { ParameterConfigService };
//# sourceMappingURL=parameter-config.service.js.map