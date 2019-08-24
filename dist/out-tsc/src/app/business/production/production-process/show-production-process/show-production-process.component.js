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
import { ProductionProcess } from 'src/app/shared/models/production-process';
import { CuttingPeriod } from 'src/app/shared/models/cutting-period';
import { faThList } from '@fortawesome/free-solid-svg-icons';
var ShowProductionProcessComponent = /** @class */ (function () {
    function ShowProductionProcessComponent() {
        this.faThList = faThList;
        this.dataProductInputs = [];
        this.dataProductProducts = [];
        this.dataProductIntermediaty = [];
        this.getData = new EventEmitter();
        this.onUpdate = new EventEmitter();
        this.createPeriod = new EventEmitter();
        this.deletePeriod = new EventEmitter();
        this.deletailDetPrd = new EventEmitter();
        this.onView = new EventEmitter();
    }
    ShowProductionProcessComponent.prototype.ngOnInit = function () {
    };
    ShowProductionProcessComponent.prototype.ngOnChanges = function (changes) {
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
        if (changes.state) {
            if (changes.state.currentValue != changes.state.previousValue) {
                this.state = changes.state.currentValue;
            }
        }
        if (changes.activeCuttingPeriod) {
            if (changes.activeCuttingPeriod.currentValue != changes.activeCuttingPeriod.previousValue) {
                this.activeCuttingPeriod = changes.activeCuttingPeriod.currentValue;
            }
        }
    };
    ShowProductionProcessComponent.prototype.onGetData = function (id_cutting_period) {
        this.getData.emit(id_cutting_period);
    };
    ShowProductionProcessComponent.prototype.update = function (productionProcess) {
        this.onUpdate.emit(productionProcess);
    };
    ShowProductionProcessComponent.prototype.onCreatePeriod = function (cuttingPeriod) {
        this.createPeriod.emit(cuttingPeriod);
    };
    ShowProductionProcessComponent.prototype.onDeletePeriod = function (id) {
        this.deletePeriod.emit(id);
    };
    ShowProductionProcessComponent.prototype.viewList = function () {
        this.onView.emit(false);
    };
    ShowProductionProcessComponent.prototype.onDeleteDetail = function (id) {
        this.deletailDetPrd.emit(id);
    };
    __decorate([
        Input(),
        __metadata("design:type", ProductionProcess)
    ], ShowProductionProcessComponent.prototype, "productionProcess", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ShowProductionProcessComponent.prototype, "cuttingPeriodList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", CuttingPeriod)
    ], ShowProductionProcessComponent.prototype, "activeCuttingPeriod", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ShowProductionProcessComponent.prototype, "state", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ShowProductionProcessComponent.prototype, "dataProductInputs", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ShowProductionProcessComponent.prototype, "dataProductProducts", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ShowProductionProcessComponent.prototype, "dataProductIntermediaty", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ShowProductionProcessComponent.prototype, "getData", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ShowProductionProcessComponent.prototype, "onUpdate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ShowProductionProcessComponent.prototype, "createPeriod", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ShowProductionProcessComponent.prototype, "deletePeriod", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ShowProductionProcessComponent.prototype, "deletailDetPrd", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ShowProductionProcessComponent.prototype, "onView", void 0);
    ShowProductionProcessComponent = __decorate([
        Component({
            selector: 'app-show-production-process',
            templateUrl: 'show-production-process.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], ShowProductionProcessComponent);
    return ShowProductionProcessComponent;
}());
export { ShowProductionProcessComponent };
//# sourceMappingURL=show-production-process.component.js.map