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
var EnterprisePersonService = /** @class */ (function () {
    function EnterprisePersonService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_enterprise_person;
    }
    EnterprisePersonService.prototype.getActiveInfoByPerson$ = function (id) {
        var _this = this;
        var url = this._url + '/get-active-info-by-person/' + id.toString();
        return this.userService.validateOptionByToken('EnterprisePerson:getActiveInfoByPerson').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    EnterprisePersonService.prototype.getAllInfoByPerson$ = function (id) {
        var _this = this;
        var url = this._url + '/get-all-by-person/' + id.toString();
        return this.userService.validateOptionByToken('EnterprisePerson:getAllByPerson').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    EnterprisePersonService.prototype.show$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id.toString();
        return this.userService.validateOptionByToken('EnterprisePerson:show').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    EnterprisePersonService.prototype.inactivateContract$ = function (id) {
        var _this = this;
        var url = this._url + '/inactivate-contract/' + id.toString();
        return this.userService.validateOptionByToken('EnterprisePerson:inactiveContract').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    EnterprisePersonService.prototype.update$ = function (enterprisePerson) {
        var _this = this;
        return this.userService.validateOptionByToken('EnterprisePerson:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, enterprisePerson);
            }
        }));
    };
    EnterprisePersonService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], EnterprisePersonService);
    return EnterprisePersonService;
}());
export { EnterprisePersonService };
//# sourceMappingURL=enterprise-person.service.js.map