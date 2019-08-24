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
import { ProductionProcess } from 'src/app/shared/models/production-process';
import { ProductionProcessService } from 'src/app/shared/services/production-process.service';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { CuttingPeriodService } from 'src/app/shared/services/cutting-period.service';
import { CuttingPeriod } from 'src/app/shared/models/cutting-period';
import { DetailProductInputService } from 'src/app/shared/services/detail-product-input.service';
import { tap } from 'rxjs/operators';
var MainProductionProcessComponent = /** @class */ (function () {
    function MainProductionProcessComponent(productionProcessService, cuttingPeriodService, globalStoreService, utilService, detailProductInputService) {
        var _this = this;
        this.productionProcessService = productionProcessService;
        this.cuttingPeriodService = cuttingPeriodService;
        this.globalStoreService = globalStoreService;
        this.utilService = utilService;
        this.detailProductInputService = detailProductInputService;
        this.activeUser = new User;
        this.showPrdProcess = false;
        this.fk_id_enterprise = 0;
        this.productionProcess = new ProductionProcess;
        this.activeCuttingPeriod = new CuttingPeriod;
        this.dataProductProducts = [];
        this.dataProductInputs = [];
        this.dataProductIntermediaty = [];
        this.state = '';
        this.onError = function (error) {
            _this.globalStoreService.dispatchUserMessage(error.status, error.statusText + ' : ' + error.error.error);
        };
    }
    MainProductionProcessComponent.prototype.ngOnInit = function () {
        this.activeUser = this.globalStoreService.getUser();
        this.fk_id_enterprise = this.activeUser.fk_id_enterprise;
        this.getProductionProcessByEnterprise();
    };
    MainProductionProcessComponent.prototype.getProductionProcessByEnterprise = function () {
        var _this = this;
        this.productionProcessService.getAllByEnterprise$(this.activeUser.fk_id_enterprise).subscribe(function (lstProductionProcess) { return _this.productionProcessList = lstProductionProcess; });
    };
    MainProductionProcessComponent.prototype.onSelect = function (prdProcess) {
        this.showPrdProcess = true;
        this.productionProcess = prdProcess;
        this.loadCuttingPeriod(prdProcess.pk_id_production_process);
        this.dataProductInputs = [];
        this.dataProductProducts = [];
        this.dataProductIntermediaty = [];
    };
    MainProductionProcessComponent.prototype.loadCuttingPeriod = function (id_production_process) {
        var _this = this;
        this.cuttingPeriodService.getAllByProductionProcess$(id_production_process).pipe(tap(function (lstCuttingPeriod) { return _this.cuttingPeriodList = lstCuttingPeriod; }), tap(function () {
            _this.cuttingPeriodService.getActivePeriodByProductionProcess$(id_production_process).subscribe(function (active_cutting) { return _this.activeCuttingPeriod = active_cutting; });
        })).subscribe();
    };
    MainProductionProcessComponent.prototype.onGetData = function (id_cutting_period) {
        var _this = this;
        this.detailProductInputService.getAllByCuttingPeriodAndTypeProduct$(id_cutting_period).subscribe(function (dataProduct) {
            _this.dataProductInputs = dataProduct.inputs;
            _this.dataProductProducts = dataProduct.products;
            _this.dataProductIntermediaty = dataProduct.intermediaty;
            _this.state = dataProduct.state;
        });
    };
    MainProductionProcessComponent.prototype.update = function (productionProcess) {
        var _this = this;
        this.productionProcessService.update$(productionProcess).subscribe(function (productionProcess) {
            _this.productionProcess = productionProcess;
            _this.loadCuttingPeriod(productionProcess.pk_id_production_process);
            _this.setMessage('Operación exitosa');
        }, this.onError);
    };
    MainProductionProcessComponent.prototype.onCreate = function (prodProcess) {
        var _this = this;
        this.productionProcessService.store$(prodProcess).subscribe(function (prodProcess) {
            _this.productionProcess = prodProcess;
            _this.getProductionProcessByEnterprise();
            _this.setMessage('Se creó registro exitosamente');
        });
    };
    MainProductionProcessComponent.prototype.onCreatePeriod = function (cuttingPeriod) {
        var _this = this;
        this.cuttingPeriodService.store$(cuttingPeriod).subscribe(function () { return _this.loadCuttingPeriod(cuttingPeriod.fk_id_production_process); });
    };
    MainProductionProcessComponent.prototype.onDeletePeriod = function (id) {
        var _this = this;
        this.cuttingPeriodService.delete$(id).subscribe(function (cuttingPeriod) {
            _this.loadCuttingPeriod(cuttingPeriod.fk_id_production_process);
            _this.setMessage('Se eliminó registro exitosamente');
        });
    };
    MainProductionProcessComponent.prototype.onDeletailDetPrd = function (id) {
        var _this = this;
        this.detailProductInputService.delete$(id).subscribe(function (detailPrdInput) {
            _this.onGetData(detailPrdInput.fk_id_cutting_period);
            _this.setMessage('Se eliminó registro exitosamente');
        });
    };
    MainProductionProcessComponent.prototype.onView = function (showView) {
        this.showPrdProcess = showView;
    };
    /*
    * ------------------------------------------
    * Funciones validación de resultado
    * ------------------------------------------
    */
    MainProductionProcessComponent.prototype.setMessage = function (message) {
        this.globalStoreService.dispatchUserMessage('200', message);
    };
    /*
    * ------------------------------------------
    * Funciones visualización
    * ------------------------------------------
    */
    MainProductionProcessComponent.prototype.getClassList = function () {
        return this.utilService.getClassList(!this.showPrdProcess);
    };
    MainProductionProcessComponent.prototype.getClassShow = function () {
        return this.utilService.getClassShow(this.showPrdProcess);
    };
    MainProductionProcessComponent = __decorate([
        Component({
            selector: 'app-main-production-process',
            templateUrl: 'main-production-process.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ProductionProcessService,
            CuttingPeriodService,
            GlobalStoreService,
            UtilsService,
            DetailProductInputService])
    ], MainProductionProcessComponent);
    return MainProductionProcessComponent;
}());
export { MainProductionProcessComponent };
//# sourceMappingURL=main-production-process.component.js.map