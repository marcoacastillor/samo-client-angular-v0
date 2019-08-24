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
import { FormBuilder } from '@angular/forms';
import { faCalendar, faUpload } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { ConsolidateOperation } from 'src/app/shared/models/consolidate-operation';
import { OperationService } from 'src/app/shared/services/operation.service';
import { ConsolidateTotals } from 'src/app/shared/models/consolidate-totals';
import * as moment from 'moment';
var ReportMainComponent = /** @class */ (function () {
    function ReportMainComponent(fb, operationService) {
        this.fb = fb;
        this.operationService = operationService;
        this.faUpload = faUpload;
        this.faCalendar = faCalendar;
        this.lstOperations = [];
        this.consolidate_day = environment.consolidate_day;
        this.efecty = environment.efecty_payment;
        this.credit = environment.credit_payment;
        this.discount = environment.discounts_purchase;
        this.consolidates = new ConsolidateOperation;
        this.consolidates.operations_totals = new ConsolidateTotals;
        this.consolidates.operations_values = new ConsolidateTotals;
    }
    ReportMainComponent.prototype.ngOnInit = function () {
        this.dateEnd = moment().format('YYYY-MM-DD');
        this.dateInit = moment().add(-this.consolidate_day, 'days').format('YYYY-MM-DD');
        this.initUpdForm(this.dateInit, this.dateEnd);
        this.loadData();
    };
    /*
    * ------------------------------------------
    * Funciones propias del controlador
    * ------------------------------------------
    */
    ReportMainComponent.prototype.initUpdForm = function (dateInit, dateEnd) {
        this.reportForm = this.fb.group({
            from_date: [dateInit],
            to_date: [dateEnd],
        });
    };
    ReportMainComponent.prototype.loadData = function () {
        var _this = this;
        this.operationService.getConsolidateByDates$(moment(this.reportForm.value.from_date).format('YYYY-MM-DD'), moment(this.reportForm.value.to_date).format('YYYY-MM-DD'), environment.sales).subscribe(function (data) { return _this.consolidates = data; });
    };
    ReportMainComponent.prototype.findOperationByTypePayment = function (paymentType) {
        var _this = this;
        this.operationService.getByPaymentTypeAndDatesAndType$(paymentType, moment(this.reportForm.value.from_date).format('YYYY-MM-DD'), moment(this.reportForm.value.to_date).format('YYYY-MM-DD'), environment.sales).subscribe(function (operations) { return _this.lstOperations = operations; });
    };
    ReportMainComponent = __decorate([
        Component({
            selector: 'app-report-main',
            templateUrl: 'report-main.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            OperationService])
    ], ReportMainComponent);
    return ReportMainComponent;
}());
export { ReportMainComponent };
//# sourceMappingURL=report-main.component.js.map