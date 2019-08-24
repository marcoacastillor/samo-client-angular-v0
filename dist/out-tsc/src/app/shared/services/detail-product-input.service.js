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
var DetailProductInputService = /** @class */ (function () {
    function DetailProductInputService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_detail_product_input;
    }
    DetailProductInputService.prototype.getAllByCuttingPeriodAndTypeProduct$ = function (id_cutting_period) {
        var _this = this;
        var url = this._url + '/' + id_cutting_period.toString();
        return this.userService.validateOptionByToken('DetailProductInput:getAllByPeriodAndTypeProduct').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    DetailProductInputService.prototype.getByCuttingPeriodAndProduct$ = function (id_period, pk_product_unit) {
        var _this = this;
        var url = this._url + '/get-by-period-and-product/' + id_period.toString() + '/' + pk_product_unit.toString();
        return this.userService.validateOptionByToken('DetailProductInput:getByPeriodAndProduct').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    DetailProductInputService.prototype.store$ = function (detailProductInput) {
        var _this = this;
        return this.userService.validateOptionByToken('DetailProductInput:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, detailProductInput);
            }
        }));
    };
    DetailProductInputService.prototype.delete$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id.toString();
        return this.userService.validateOptionByToken('DetailProductInput:delete').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    DetailProductInputService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], DetailProductInputService);
    return DetailProductInputService;
}());
export { DetailProductInputService };
//# sourceMappingURL=detail-product-input.service.js.map