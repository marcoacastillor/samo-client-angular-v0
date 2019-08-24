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
var PaymentService = /** @class */ (function () {
    function PaymentService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_payment;
    }
    PaymentService.prototype.store$ = function (payment) {
        var _this = this;
        return this.userService.validateOptionByToken('Payment:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, payment);
            }
        }));
    };
    PaymentService.prototype.delete$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id.toString();
        return this.userService.validateOptionByToken('Payment:delete').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    PaymentService.prototype.getPaymentsByOperation$ = function (id_operation) {
        var _this = this;
        var url = this._url + '/get-by-operation/' + id_operation.toString();
        return this.userService.validateOptionByToken('Payment:getByOperation').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PaymentService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], PaymentService);
    return PaymentService;
}());
export { PaymentService };
//# sourceMappingURL=payment.service.js.map