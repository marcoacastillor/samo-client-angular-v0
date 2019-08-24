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
var PayingEmployeeService = /** @class */ (function () {
    function PayingEmployeeService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_payment_employee;
    }
    PayingEmployeeService.prototype.getInfoByEnterprisePerson$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id;
        return this.userService.validateOptionByToken('PayingEmployee:getByenterprisePerson').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PayingEmployeeService.prototype.getSettlementInfoByCuttingPeriodAndEnterprise$ = function (id_period, id_enterprise) {
        var _this = this;
        var url = this._url + '/get-by-cutting-period-and-enterprise/' + id_period.toString() + '/' + id_enterprise.toString();
        return this.userService.validateOptionByToken('PayingEmployee:getByCuttingPeriodAndEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PayingEmployeeService.prototype.generateSettlementByPeriodAndContract$ = function (id_cutting_period, id_contract) {
        var _this = this;
        var url = this._url + '/generate-settlement-by-period-and-contract/' + id_cutting_period.toString() + '/' + id_contract.toString();
        return this.userService.validateOptionByToken('PayingEmployee:generateSettlementByPeriodAndContract').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PayingEmployeeService.prototype.generateAllSettlementAndEnterprise$ = function (id_cutting_period, id_enterprise) {
        var _this = this;
        var url = this._url + '/generate-all-settlement-by-period-and-enterprise/' + id_cutting_period.toString() + '/' + id_enterprise.toString();
        return this.userService.validateOptionByToken('PayingEmployee:generateAllSettlementByPeriodAndEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PayingEmployeeService.prototype.updatePayingEmpworkerNewloyeeByIdAnd$ = function (id, id_worker) {
        var _this = this;
        var url = this._url + '/update-paying-employee-by-worker_news/' + id.toString() + '/' + id_worker.toString();
        return this.userService.validateOptionByToken('PayingEmployee:UpdatePayingEmployeeByWorkerWews').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PayingEmployeeService.prototype.deletePayingByContract$ = function (id_cutting_period) {
        var _this = this;
        var url = this._url + '/delete-by-contract/' + id_cutting_period.toString();
        return this.userService.validateOptionByToken('PayingEmployee:delete').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    PayingEmployeeService.prototype.paymentPayingByContract$ = function (id_cutting_period) {
        var _this = this;
        var url = this._url + '/payment-by-contract/' + id_cutting_period.toString();
        return this.userService.validateOptionByToken('PayingEmployee:getByPaymentByContract').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PayingEmployeeService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], PayingEmployeeService);
    return PayingEmployeeService;
}());
export { PayingEmployeeService };
//# sourceMappingURL=paying-employee.service.js.map