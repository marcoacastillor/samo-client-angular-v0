var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CuttingPeriod } from 'src/app/shared/models/cutting-period';
import { faAlignJustify, faPlusCircle, faTrash, faArrowCircleRight, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { ProductionProcess } from 'src/app/shared/models/production-process';
import { DetailProductInput } from 'src/app/shared/models/detail-product-input';
import { DetailProductInputService } from 'src/app/shared/services/detail-product-input.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import * as moment from 'moment';
var PeriodsInfoComponent = /** @class */ (function () {
    function PeriodsInfoComponent(detailProductInputService, UtilService) {
        this.detailProductInputService = detailProductInputService;
        this.UtilService = UtilService;
        this.faAlignJustify = faAlignJustify;
        this.faArrowCircleRight = faArrowCircleRight;
        this.faPlusCircle = faPlusCircle;
        this.faTrash = faTrash;
        this.faFolderPlus = faFolderPlus;
        this.date_now = moment().format('YYYY-MM-DD');
        this.cuttingPeriod = new CuttingPeriod;
        this.detailProductInput = new DetailProductInput;
        this.getData = new EventEmitter();
        this.onCreatePeriod = new EventEmitter();
        this.onDeletePeriod = new EventEmitter();
    }
    PeriodsInfoComponent.prototype.ngOnInit = function () {
    };
    PeriodsInfoComponent.prototype.ngOnChanges = function (changes) {
        if (changes.cuttingPeriodList) {
            if (changes.cuttingPeriodList.currentValue != changes.cuttingPeriodList.previousValue) {
                this.cuttingPeriodList = changes.cuttingPeriodList.currentValue;
            }
        }
        if (changes.productionProcess) {
            if (changes.productionProcess.currentValue != changes.productionProcess.previousValue) {
                this.productionProcess = changes.productionProcess.currentValue;
            }
        }
        if (changes.activeCuttingPeriod) {
            if (changes.activeCuttingPeriod.currentValue != changes.activeCuttingPeriod.previousValue) {
                this.activeCuttingPeriod = changes.activeCuttingPeriod.currentValue;
            }
        }
    };
    PeriodsInfoComponent.prototype.getDataByCuttingPeriod = function (id_cutting_period) {
        this.getData.emit(id_cutting_period);
        if (this.cuttingPeriod.pk_id_cutting_period) {
            var nameInputSelected = document.getElementById(this.cuttingPeriod.pk_id_cutting_period.toString());
            if (nameInputSelected)
                nameInputSelected.className = 'node';
            var nameInputNew = document.getElementById(id_cutting_period.toString());
            nameInputNew.className = 'bg-light';
        }
        else {
            var nameInputNew = document.getElementById(id_cutting_period.toString());
            nameInputNew.className = 'bg-light';
        }
    };
    PeriodsInfoComponent.prototype.createPeriod = function () {
        var cuttingPeriod = new CuttingPeriod;
        cuttingPeriod.fk_id_production_process = this.productionProcess.pk_id_production_process;
        cuttingPeriod.defined_period = this.productionProcess.defined_period;
        this.onCreatePeriod.emit(cuttingPeriod);
    };
    PeriodsInfoComponent.prototype.selectPeriod = function (cuttingPeriod) {
        this.cuttingPeriod = cuttingPeriod;
    };
    PeriodsInfoComponent.prototype.deletePeriod = function () {
        this.onDeletePeriod.emit(this.cuttingPeriod.pk_id_cutting_period);
    };
    PeriodsInfoComponent.prototype.onCreateDetailProduct = function (detailProduct) {
        var _this = this;
        this.detailProductInputService.store$(detailProduct).subscribe(function (detailPrdInput) {
            _this.getDataByCuttingPeriod(detailPrdInput.fk_id_cutting_period);
        });
    };
    /*
    * ------------------------------------------
    * Funciones visualización
    * ------------------------------------------
    */
    PeriodsInfoComponent.prototype.getClassSelected = function (row, selected) {
        return this.UtilService.getClassBySelectedObject(row, selected);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PeriodsInfoComponent.prototype, "cuttingPeriodList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", CuttingPeriod)
    ], PeriodsInfoComponent.prototype, "activeCuttingPeriod", void 0);
    __decorate([
        Input(),
        __metadata("design:type", ProductionProcess)
    ], PeriodsInfoComponent.prototype, "productionProcess", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PeriodsInfoComponent.prototype, "getData", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PeriodsInfoComponent.prototype, "onCreatePeriod", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PeriodsInfoComponent.prototype, "onDeletePeriod", void 0);
    PeriodsInfoComponent = __decorate([
        Component({
            selector: 'app-periods-info',
            templateUrl: 'periods-info.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [DetailProductInputService,
            UtilsService])
    ], PeriodsInfoComponent);
    return PeriodsInfoComponent;
}());
export { PeriodsInfoComponent };
//# sourceMappingURL=periods-info.component.js.map