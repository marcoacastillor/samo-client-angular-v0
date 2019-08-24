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
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
var OptionService = /** @class */ (function () {
    function OptionService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_option;
    }
    OptionService.prototype.getAll$ = function () {
        var _this = this;
        return this.userService.validateOptionByToken('Option:getAll').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(_this._url);
            }
        }));
    };
    OptionService.prototype.getBusinessObject$ = function () {
        var _this = this;
        var url = this._url + '/get-business-object';
        return this.userService.validateOptionByToken('Option:getBusinessObject').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OptionService.prototype.getOptionsByBusinessObjectAndRol$ = function (buss_object, id_rol) {
        var _this = this;
        var url = this._url + '/get-options-by-business-object-and-rol/' + buss_object + '/' + id_rol;
        return this.userService.validateOptionByToken('Option:getOptionsByBusinessObjectAndRol').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OptionService.prototype.getNotOptionsByBusinessObjectAndRol$ = function (buss_object, id_rol) {
        var _this = this;
        var url = this._url + '/get-not-options-by-business-object-and-rol/' + buss_object + '/' + id_rol;
        return this.userService.validateOptionByToken('Option:getNotOptionsByBusinessObjectAndRol').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OptionService.prototype.getByBusinessObject$ = function (business_object) {
        var _this = this;
        var url = this._url + '/get-by-business-object/' + business_object;
        return this.userService.validateOptionByToken('Option:getByBusinessObject').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OptionService.prototype.getByAction$ = function (action) {
        var _this = this;
        var url = this._url + '/get-by-action/' + action;
        return this.userService.validateOptionByToken('Option:getByAction').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OptionService.prototype.getByRol$ = function (id) {
        var _this = this;
        var url = this._url + '/get-by-rol/' + id;
        return this.userService.validateOptionByToken('Option:getByRol').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OptionService.prototype.store$ = function (option) {
        var _this = this;
        return this.userService.validateOptionByToken('Option:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, option);
            }
        }));
    };
    OptionService.prototype.show$ = function (id_option) {
        var _this = this;
        var url = this._url + '/' + id_option;
        return this.userService.validateOptionByToken('Option:show').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OptionService.prototype.delete$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id.toString();
        return this.userService.validateOptionByToken('Option:delete').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    OptionService.prototype.update$ = function (option) {
        var _this = this;
        return this.userService.validateOptionByToken('Option:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, option);
            }
        }));
    };
    OptionService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], OptionService);
    return OptionService;
}());
export { OptionService };
//# sourceMappingURL=option.service.js.map