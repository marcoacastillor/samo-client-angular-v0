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
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this._url = environment.url_user;
    }
    UserService.prototype.sendCredential$ = function (credential) {
        var url = this._url + '/login';
        return this.http.post(url, credential);
    };
    UserService.prototype.validateOptionByToken = function (code_option) {
        var url = this._url + '/validate-option-by-token-and-code-option' + '/' + code_option;
        return this.http.get(url);
    };
    UserService.prototype.getAll$ = function () {
        var _this = this;
        return this.validateOptionByToken('User:getAll').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(_this._url);
            }
        }));
    };
    UserService.prototype.getUserByEnteprise$ = function (id_enterprise) {
        var _this = this;
        var url = this._url + '/get-by-enterprise/' + id_enterprise;
        return this.validateOptionByToken('User:getByEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    UserService.prototype.show$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id.toString();
        return this.validateOptionByToken('User:show').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    UserService.prototype.store$ = function (user) {
        var _this = this;
        return this.validateOptionByToken('User:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, user);
            }
        }));
    };
    UserService.prototype.delete$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id.toString();
        return this.validateOptionByToken('User:delete').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    UserService.prototype.update$ = function (user) {
        var _this = this;
        return this.validateOptionByToken('User:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, user);
            }
        }));
    };
    UserService.prototype.inactiveUserByPerson$ = function (id_person) {
        var _this = this;
        var url = this._url + '/inactive-user-by-person/' + id_person.toString();
        return this.validateOptionByToken('User:inactiveByPerson').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    UserService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map