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
var PositionService = /** @class */ (function () {
    function PositionService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_position;
    }
    PositionService.prototype.getByEnterpsie$ = function (id_enterprise) {
        var _this = this;
        var url = this._url + '/list/' + id_enterprise;
        return this.userService.validateOptionByToken('Position:getByEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PositionService.prototype.store$ = function (position) {
        var _this = this;
        return this.userService.validateOptionByToken('Position:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, position);
            }
        }));
    };
    PositionService.prototype.update$ = function (position) {
        var _this = this;
        return this.userService.validateOptionByToken('Position:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, position);
            }
        }));
    };
    PositionService.prototype.show$ = function (id_position) {
        var _this = this;
        var url = this._url + '/' + id_position;
        return this.userService.validateOptionByToken('Position:show').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PositionService.prototype.delete$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id.toString();
        return this.userService.validateOptionByToken('Position:delete').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    PositionService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], PositionService);
    return PositionService;
}());
export { PositionService };
//# sourceMappingURL=position.service.js.map