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
import { faSave, faThList, faCalculator, faFileInvoiceDollar, faMoneyBillAlt, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { CuttingPeriodService } from 'src/app/shared/services/cutting-period.service';
import { CuttingPeriod } from 'src/app/shared/models/cutting-period';
import { PayingEmployeeService } from 'src/app/shared/services/paying-employee.service';
import { tap, switchMap } from 'rxjs/operators';
import { WorkerNewService } from 'src/app/shared/services/worker-new.service';
import { LaboralCondition } from 'src/app/shared/models/laboral-condition';
import { LaboralConditionService } from 'src/app/shared/services/laboral-condition.service';
import { DetailProductInputService } from 'src/app/shared/services/detail-product-input.service';
var SettlementFormComponent = /** @class */ (function () {
    function SettlementFormComponent(globalStoreService, cuttingPeriodService, payingEmployeeService, workerNewSerice, laboralConditionService, detailProductInputService) {
        this.globalStoreService = globalStoreService;
        this.cuttingPeriodService = cuttingPeriodService;
        this.payingEmployeeService = payingEmployeeService;
        this.workerNewSerice = workerNewSerice;
        this.laboralConditionService = laboralConditionService;
        this.detailProductInputService = detailProductInputService;
        this.faSave = faSave;
        this.faThList = faThList;
        this.faCalculator = faCalculator;
        this.faFileInvoiceDollar = faFileInvoiceDollar;
        this.faMoneyBillAlt = faMoneyBillAlt;
        this.faFileInvoice = faFileInvoice;
        this.cuttingPeriodList = [];
        this.workerNewsLst = [];
        this.laboral_condition = new LaboralCondition;
        this.production_period = 0;
        this.selectedPeriod = new CuttingPeriod;
        this.employeeLst = [];
        this.totals = [];
        this.activeUser = new User;
        this.success = false;
        this.message = '';
    }
    SettlementFormComponent.prototype.ngOnInit = function () {
        this.activeUser = this.globalStoreService.getUser();
        this.loadPeriosByEnterprise(this.activeUser.fk_id_enterprise);
    };
    SettlementFormComponent.prototype.loadPeriosByEnterprise = function (id_enterprise) {
        var _this = this;
        this.cuttingPeriodService.getAllActiveSettlementByEnterprise$(id_enterprise).subscribe(function (lst_cutting_periods) { return _this.cuttingPeriodList = lst_cutting_periods; });
    };
    SettlementFormComponent.prototype.onFindValuesByPeriod = function () {
        var _this = this;
        var period = document.getElementById('selectedPeriod').value;
        if (period.length > 0) {
            //Seleccionar período.
            this.selectedPeriod = this.cuttingPeriodList[period];
            this.payingEmployeeService.getSettlementInfoByCuttingPeriodAndEnterprise$(this.selectedPeriod.pk_id_cutting_period, this.activeUser.fk_id_enterprise).subscribe(function (settlment) {
                _this.employeeLst = settlment.employee;
                _this.totals = settlment.totals;
            });
        }
    };
    SettlementFormComponent.prototype.generateAllSettlement = function () {
        var _this = this;
        this.payingEmployeeService.generateAllSettlementAndEnterprise$(this.selectedPeriod.pk_id_cutting_period, this.activeUser.fk_id_enterprise).pipe(tap(function (cuttingPeriod) {
            _this.selectedPeriod = cuttingPeriod;
            _this.payingEmployeeService.getSettlementInfoByCuttingPeriodAndEnterprise$(cuttingPeriod.pk_id_cutting_period, _this.activeUser.fk_id_enterprise).subscribe(function (settlment) {
                _this.employeeLst = settlment.employee;
                _this.totals = settlment.totals;
                _this.success = true;
                _this.message = 'Se generó liquidación del período seleccionado, correctamente.';
            });
        })).subscribe();
    };
    SettlementFormComponent.prototype.generateSettlementByEmployee = function (id_cutting_period, id_contract) {
        var _this = this;
        this.payingEmployeeService.generateSettlementByPeriodAndContract$(id_cutting_period, id_contract).subscribe(function () {
            _this.payingEmployeeService.getSettlementInfoByCuttingPeriodAndEnterprise$(id_cutting_period, _this.activeUser.fk_id_enterprise).subscribe(function (settlment) {
                _this.employeeLst = settlment.employee;
                _this.totals = settlment.totals;
            });
        });
    };
    SettlementFormComponent.prototype.deleteSettlementByPeriod = function () {
        var _this = this;
        this.payingEmployeeService.deletePayingByContract$(Number(this.selectedPeriod.pk_id_cutting_period)).subscribe(function (cutting_period) {
            _this.selectedPeriod = cutting_period;
            _this.payingEmployeeService.getSettlementInfoByCuttingPeriodAndEnterprise$(Number(_this.selectedPeriod.pk_id_cutting_period), _this.activeUser.fk_id_enterprise).subscribe(function (settlment) {
                _this.employeeLst = settlment.employee;
                _this.totals = settlment.totals;
                _this.success = true;
                _this.message = 'Se eliminó liquidación del período seleccionado, correctamente.';
            });
        });
    };
    SettlementFormComponent.prototype.paymentSettlementByPeriod = function () {
        var _this = this;
        this.payingEmployeeService.paymentPayingByContract$(Number(this.selectedPeriod.pk_id_cutting_period)).subscribe(function (cutting_period) {
            _this.selectedPeriod = cutting_period;
            _this.payingEmployeeService.getSettlementInfoByCuttingPeriodAndEnterprise$(Number(_this.selectedPeriod.pk_id_cutting_period), _this.activeUser.fk_id_enterprise).subscribe(function (settlment) {
                _this.employeeLst = settlment.employee;
                _this.totals = settlment.totals;
                _this.success = true;
                _this.message = 'Se realizó el pago de la liquidación del período seleccionado, correctamente.';
            });
        });
    };
    SettlementFormComponent.prototype.getWorkerNewByPeriodAndContract = function (idPeriod, idContract) {
        var _this = this;
        this.workerNewSerice.getByPeriodAndContract$(idPeriod, idContract).pipe(tap(function (lst_worker_news) { return _this.workerNewsLst = lst_worker_news; }), switchMap(function () { return _this.laboralConditionService.getInfoByEnterprisePerson$(idContract); }), tap(function (laboral_condition) { return _this.laboral_condition = laboral_condition; }), tap(function (laboral_condition) {
            _this.detailProductInputService.getByCuttingPeriodAndProduct$(idPeriod, laboral_condition.pk_product_unit).subscribe(function (detail_cutting_input) { return _this.production_period = detail_cutting_input; });
        })).subscribe();
    };
    SettlementFormComponent = __decorate([
        Component({
            selector: 'app-settlement-form',
            templateUrl: 'settlement-form.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [GlobalStoreService,
            CuttingPeriodService,
            PayingEmployeeService,
            WorkerNewService,
            LaboralConditionService,
            DetailProductInputService])
    ], SettlementFormComponent);
    return SettlementFormComponent;
}());
export { SettlementFormComponent };
//# sourceMappingURL=settlement-form.component.js.map