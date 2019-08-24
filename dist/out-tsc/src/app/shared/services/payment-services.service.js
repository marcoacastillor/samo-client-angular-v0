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
var PaymentServicesService = /** @class */ (function () {
    function PaymentServicesService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_payment_service;
    }
    PaymentServicesService.prototype.store$ = function (payment) {
        var _this = this;
        return this.userService.validateOptionByToken('PaymentService:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, payment);
            }
        }));
    };
    PaymentServicesService.prototype.getByEnterpriseService$ = function (id_contract_service) {
        var _this = this;
        var url = this._url + '/get-by-enterprise-service/' + id_contract_service.toString();
        return this.userService.validateOptionByToken('PaymentService:getByEnterpriseService').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PaymentServicesService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], PaymentServicesService);
    return PaymentServicesService;
}());
export { PaymentServicesService };
//# sourceMappingURL=payment-services.service.js.map