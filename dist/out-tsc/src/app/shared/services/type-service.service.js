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
var TypeServiceService = /** @class */ (function () {
    function TypeServiceService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_type_service;
    }
    TypeServiceService.prototype.getAll$ = function () {
        var _this = this;
        return this.userService.validateOptionByToken('TypeService:getAll').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(_this._url);
            }
        }));
    };
    TypeServiceService.prototype.getBySizes$ = function (size) {
        var _this = this;
        var url = this._url + '/get-by-sizes-enterprise/' + size.trim();
        return this.userService.validateOptionByToken('TypeService:getBySize').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    TypeServiceService.prototype.store$ = function (typService) {
        var _this = this;
        return this.userService.validateOptionByToken('TypeService:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, typService);
            }
        }));
    };
    TypeServiceService.prototype.update$ = function (typseService) {
        var _this = this;
        return this.userService.validateOptionByToken('TypeService:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, typseService);
            }
        }));
    };
    TypeServiceService.prototype.show$ = function (id_type_service) {
        var _this = this;
        var url = this._url + '/' + id_type_service;
        return this.userService.validateOptionByToken('TypeService:show').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    TypeServiceService.prototype.delete$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id.toString();
        return this.userService.validateOptionByToken('TypeService:delete').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    TypeServiceService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], TypeServiceService);
    return TypeServiceService;
}());
export { TypeServiceService };
//# sourceMappingURL=type-service.service.js.map