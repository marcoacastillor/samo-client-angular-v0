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
var EnterpriseService = /** @class */ (function () {
    function EnterpriseService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_enterprise;
    }
    EnterpriseService.prototype.getAllByType$ = function (type) {
        var _this = this;
        var url = this._url + '/index/' + type;
        return this.userService.validateOptionByToken('Enterprise:getAll').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    EnterpriseService.prototype.getCypherKeyByEnterprise$ = function (id) {
        var _this = this;
        var url = this._url + '/get-cypher-key-by-enterprise/' + id.toString();
        return this.userService.validateOptionByToken('Enterprise:getCypherKeyByEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    EnterpriseService.prototype.getByFilter$ = function (filter, type) {
        var _this = this;
        var url = this._url + '/get-list-by-filter-and-type/' + type;
        return this.userService.validateOptionByToken('Enterprise:listByFilterAndType').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(url, filter);
            }
        }));
    };
    EnterpriseService.prototype.getByNameFilter$ = function (filter, type) {
        var _this = this;
        var url = this._url + '/get-list-by-name-filter-and-type/' + filter + '/' + type;
        return this.userService.validateOptionByToken('Enterprise:getByNameFilterAndType').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    EnterpriseService.prototype.getByCodeFilter$ = function (filter, type) {
        var _this = this;
        var url = this._url + '/get-list-by-code-filter-and-type/' + filter + '/' + type;
        return this.userService.validateOptionByToken('Enterprise:getByCodeFilterAndType').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    EnterpriseService.prototype.showByExternalReference$ = function (externalReference) {
        var _this = this;
        var url = this._url + '/show-external-reference/' + externalReference;
        return this.userService.validateOptionByToken('Enterprise:showByExternalReference').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    EnterpriseService.prototype.getByType$ = function (type) {
        var _this = this;
        var url = this._url + '/get-by-type/' + type;
        return this.userService.validateOptionByToken('Enterprise:getByType').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    EnterpriseService.prototype.getInfoEnterprise$ = function () {
        var _this = this;
        var url = this._url + '/get-info-enterprise';
        return this.userService.validateOptionByToken('Enterprise:getInfoEnteprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    EnterpriseService.prototype.show$ = function (id_enterprise) {
        var _this = this;
        var url = this._url + '/' + id_enterprise;
        return this.userService.validateOptionByToken('Enterprise:show').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    EnterpriseService.prototype.showLogin$ = function (id_enterprise) {
        var url = this._url + '/show-login/' + id_enterprise;
        return this.http.get(url);
    };
    EnterpriseService.prototype.update$ = function (enterprise) {
        var _this = this;
        return this.userService.validateOptionByToken('Enterprise:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, enterprise);
            }
        }));
    };
    EnterpriseService.prototype.store$ = function (enterprise) {
        var _this = this;
        return this.userService.validateOptionByToken('Enterprise:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, enterprise);
            }
        }));
    };
    EnterpriseService.prototype.delete$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id.toString();
        return this.userService.validateOptionByToken('Enterprise:delete').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    EnterpriseService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], EnterpriseService);
    return EnterpriseService;
}());
export { EnterpriseService };
//# sourceMappingURL=enterprise.service.js.map