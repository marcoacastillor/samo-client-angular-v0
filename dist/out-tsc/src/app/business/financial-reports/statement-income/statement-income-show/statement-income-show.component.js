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
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FinancialReportService } from 'src/app/shared/services/financial-report.service';
import * as moment from 'moment';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
var StatementIncomeShowComponent = /** @class */ (function () {
    function StatementIncomeShowComponent(globalStoreService, financialReportService, formToolService, fb) {
        this.globalStoreService = globalStoreService;
        this.financialReportService = financialReportService;
        this.formToolService = formToolService;
        this.fb = fb;
        this.faSearch = faSearch;
        this.faCalendar = faCalendar;
        this.activeUser = new User;
        this.lstParameters = [];
        this.report = null;
        this.consolidate_day = environment.consolidate_day;
    }
    StatementIncomeShowComponent.prototype.ngOnInit = function () {
        this.activeUser = this.globalStoreService.getUser();
        this.dateEnd = moment().add().format('YYYY-MM-DD');
        this.dateInit = moment().add(-this.consolidate_day, 'days').format('YYYY-MM-DD');
        this.initUpdForm(this.dateInit, this.dateEnd);
        this.getDataByPeriod();
    };
    StatementIncomeShowComponent.prototype.getDataByPeriod = function () {
        var _this = this;
        this.financialReportService.getResultsByPeriodAndEnterprise$(moment(this.reportForm.value.from_date).format('YYYY-MM-DD'), moment(this.reportForm.value.to_date).format('YYYY-MM-DD'), this.activeUser.fk_id_enterprise).subscribe(function (report) { return _this.report = report; });
    };
    StatementIncomeShowComponent.prototype.initUpdForm = function (dateInit, dateEnd) {
        this.reportForm = this.fb.group({
            from_date: [dateInit],
            to_date: [dateEnd],
        });
    };
    StatementIncomeShowComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.reportForm, controlName);
    };
    StatementIncomeShowComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.reportForm, controlName);
    };
    StatementIncomeShowComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.reportForm, controlName, errorCode);
    };
    StatementIncomeShowComponent = __decorate([
        Component({
            selector: 'app-statement-income-show',
            templateUrl: 'statement-income-show.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [GlobalStoreService,
            FinancialReportService,
            FormToolsService,
            FormBuilder])
    ], StatementIncomeShowComponent);
    return StatementIncomeShowComponent;
}());
export { StatementIncomeShowComponent };
//# sourceMappingURL=statement-income-show.component.js.map