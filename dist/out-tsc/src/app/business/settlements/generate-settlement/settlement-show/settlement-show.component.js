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
import { ActivatedRoute } from '@angular/router';
import { faThList, faFileInvoiceDollar, faCalculator, faMoneyBillAlt, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { PayingEmployeeService } from 'src/app/shared/services/paying-employee.service';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { CuttingPeriod } from 'src/app/shared/models/cutting-period';
import { CuttingPeriodService } from 'src/app/shared/services/cutting-period.service';
import { tap, switchMap } from 'rxjs/operators';
import { WorkerNewService } from 'src/app/shared/services/worker-new.service';
import { LaboralConditionService } from 'src/app/shared/services/laboral-condition.service';
import { DetailProductInputService } from 'src/app/shared/services/detail-product-input.service';
import { LaboralCondition } from 'src/app/shared/models/laboral-condition';
import { PayingEmployee } from 'src/app/shared/models/paying-employee';
var SettlementShowComponent = /** @class */ (function () {
    function SettlementShowComponent(activateRoute, payingEmployeeService, globalStoreService, cuttingPeriodService, workerNewSerice, laboralConditionService, detailProductInputService) {
        this.activateRoute = activateRoute;
        this.payingEmployeeService = payingEmployeeService;
        this.globalStoreService = globalStoreService;
        this.cuttingPeriodService = cuttingPeriodService;
        this.workerNewSerice = workerNewSerice;
        this.laboralConditionService = laboralConditionService;
        this.detailProductInputService = detailProductInputService;
        this.id_period = '';
        this.faThList = faThList;
        this.faFileInvoiceDollar = faFileInvoiceDollar;
        this.faCalculator = faCalculator;
        this.faMoneyBillAlt = faMoneyBillAlt;
        this.faFileInvoice = faFileInvoice;
        this.activeUser = new User;
        this.employeeLst = [];
        this.totals = [];
        this.workerNewsLst = [];
        this.selectedPeriod = new CuttingPeriod;
        this.laboral_condition = new LaboralCondition;
        this.production_period = 0;
        this.selectedPayingInfo = new PayingEmployee;
        this.success = false;
        this.message = '';
    }
    SettlementShowComponent.prototype.ngOnInit = function () {
        this.activeUser = this.globalStoreService.getUser();
        this.id_period = this.activateRoute.snapshot.params['id'];
        this.getSettlementInfoById(Number(this.id_period));
    };
    SettlementShowComponent.prototype.getSettlementInfoById = function (id) {
        var _this = this;
        this.cuttingPeriodService.show$(id).pipe(tap(function (cuttingPeriod) {
            _this.selectedPeriod = cuttingPeriod;
        }), switchMap(function (cuttingPeriod) { return _this.payingEmployeeService.getSettlementInfoByCuttingPeriodAndEnterprise$(cuttingPeriod.pk_id_cutting_period, _this.activeUser.fk_id_enterprise); }), tap(function (settlment) {
            _this.employeeLst = settlment.employee;
            _this.totals = settlment.totals;
        })).subscribe();
    };
    SettlementShowComponent.prototype.generateAllSettlement = function () {
        var _this = this;
        this.payingEmployeeService.generateAllSettlementAndEnterprise$(this.selectedPeriod.pk_id_cutting_period, this.activeUser.fk_id_enterprise).subscribe(function (cutting_period) {
            _this.success = true;
            _this.message = 'Se generó liquidación del período seleccionado, correctamente.';
            _this.getSettlementInfoById(cutting_period.pk_id_cutting_period);
        });
    };
    SettlementShowComponent.prototype.deleteSettlementByPeriod = function () {
        var _this = this;
        this.payingEmployeeService.deletePayingByContract$(Number(this.id_period)).subscribe(function (cutting_period) {
            _this.success = true;
            _this.message = 'Se eliminó liquidación del período seleccionado, correctamente.';
            _this.getSettlementInfoById(cutting_period.pk_id_cutting_period);
        });
    };
    SettlementShowComponent.prototype.paymentSettlementByPeriod = function () {
        var _this = this;
        this.payingEmployeeService.paymentPayingByContract$(Number(this.id_period)).subscribe(function (cutting_period) {
            _this.success = true;
            _this.message = 'Se generó pago de liquidación del período seleccionado, correctamente.';
            _this.getSettlementInfoById(cutting_period.pk_id_cutting_period);
        });
    };
    SettlementShowComponent.prototype.getWorkerNewByPeriodAndContract = function (idPeriod, idContract) {
        var _this = this;
        this.workerNewSerice.getByPeriodAndContract$(idPeriod, idContract).pipe(tap(function (lst_worker_news) { return _this.workerNewsLst = lst_worker_news; }), switchMap(function () { return _this.laboralConditionService.getInfoByEnterprisePerson$(idContract); }), tap(function (laboral_condition) { return _this.laboral_condition = laboral_condition; }), tap(function (laboral_condition) {
            if (laboral_condition.pk_product_unit) {
                _this.detailProductInputService.getByCuttingPeriodAndProduct$(idPeriod, laboral_condition.pk_product_unit).subscribe(function (detail_cutting_input) { return _this.production_period = detail_cutting_input; });
            }
        })).subscribe();
    };
    SettlementShowComponent.prototype.selectPayingInfo = function (payingInfo) {
        this.selectedPayingInfo = payingInfo;
    };
    SettlementShowComponent.prototype.onUpdateByWorker = function (id_worker) {
        var _this = this;
        this.payingEmployeeService.updatePayingEmpworkerNewloyeeByIdAnd$(this.selectedPayingInfo.pk_id_paying_info, id_worker).subscribe(function (selectedPaying) {
            _this.success = true;
            _this.message = 'Se agregó novedad a liquidación del trabajador, correctamente.';
            _this.getSettlementInfoById(selectedPaying.fk_id_cutting_period);
        });
    };
    SettlementShowComponent = __decorate([
        Component({
            selector: 'app-settlement-show',
            templateUrl: 'settlement-show.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            PayingEmployeeService,
            GlobalStoreService,
            CuttingPeriodService,
            WorkerNewService,
            LaboralConditionService,
            DetailProductInputService])
    ], SettlementShowComponent);
    return SettlementShowComponent;
}());
export { SettlementShowComponent };
//# sourceMappingURL=settlement-show.component.js.map