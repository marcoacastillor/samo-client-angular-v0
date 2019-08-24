var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { FinancialReportService } from 'src/app/shared/services/financial-report.service';
import { User } from 'src/app/shared/models/user';
import * as moment from 'moment';
var CashRegisterShowComponent = /** @class */ (function () {
    function CashRegisterShowComponent(globalStoreService, financialReportService) {
        this.globalStoreService = globalStoreService;
        this.financialReportService = financialReportService;
        this.report = null;
        this.activeUser = new User;
        this.actual_date = moment().format('YYYY-MM-DD');
        this.lstDates = [];
    }
    CashRegisterShowComponent.prototype.ngOnInit = function () {
        this.activeUser = this.globalStoreService.getUser();
        this.getDataByDateAndEnterprise(this.actual_date, this.activeUser.fk_id_enterprise);
        this.loadDates();
    };
    CashRegisterShowComponent.prototype.loadDates = function () {
        var j = 0;
        for (var i = 5; i >= 0; i--) {
            this.lstDates[j] = moment().add(-i, 'days').format('YYYY-MM-DD');
            j++;
        }
    };
    CashRegisterShowComponent.prototype.getDataByDateAndEnterprise = function (actual_date, id_enterprise) {
        var _this = this;
        this.actual_date = actual_date;
        this.financialReportService.getCashFlowByDateAndEnterprise$(actual_date, id_enterprise).subscribe(function (report) { return _this.report = report; });
    };
    CashRegisterShowComponent.prototype.getClassSelected = function (date_report) {
        if (date_report == this.actual_date) {
            return 'card bg-info text-white';
        }
        else {
            return 'card';
        }
    };
    CashRegisterShowComponent = __decorate([
        Component({
            selector: 'app-cash-register-show',
            templateUrl: 'cash-register-show.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [GlobalStoreService,
            FinancialReportService])
    ], CashRegisterShowComponent);
    return CashRegisterShowComponent;
}());
export { CashRegisterShowComponent };
//# sourceMappingURL=cash-register-show.component.js.map