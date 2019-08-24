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
var FinancialReportService = /** @class */ (function () {
    function FinancialReportService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_financial_report;
    }
    FinancialReportService.prototype.getResultsByPeriodAndEnterprise$ = function (from_date, to_date, id_enterprise) {
        var _this = this;
        var url = this._url + '/statement-income-by-period-and-enterprise/' + from_date + '/' + to_date + '/' + id_enterprise.toString();
        return this.userService.validateOptionByToken('Reports:getStatementIncomeReport').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    FinancialReportService.prototype.getBalanceByPeriodAndEnterprise$ = function (from_date, to_date, id_enterprise) {
        var _this = this;
        var url = this._url + '/balance-by-period-and-enterprise/' + from_date + '/' + to_date + '/' + id_enterprise.toString();
        return this.userService.validateOptionByToken('Reports:getBalanceByPeriodAndEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    FinancialReportService.prototype.getCashFlowByDateAndEnterprise$ = function (actual_date, id_enterprise) {
        var _this = this;
        var url = this._url + '/cashflow-by-date-and-enterprise/' + actual_date + '/' + id_enterprise.toString();
        return this.userService.validateOptionByToken('Reports:getCashFlowByDatesAndEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    FinancialReportService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], FinancialReportService);
    return FinancialReportService;
}());
export { FinancialReportService };
//# sourceMappingURL=financial-report.service.js.map