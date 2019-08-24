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
import { faPlusCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { environment } from 'src/environments/environment';
var ListProductionProcessComponent = /** @class */ (function () {
    function ListProductionProcessComponent(parametersService) {
        this.parametersService = parametersService;
        this.faPlusCircle = faPlusCircle;
        this.faEye = faEye;
        this.definedPeriodList = [];
        this.select = new EventEmitter();
        this.create = new EventEmitter();
    }
    ListProductionProcessComponent.prototype.ngOnInit = function () {
    };
    ListProductionProcessComponent.prototype.ngOnChanges = function (changes) {
        if (changes.cuttingPeriodList) {
            if (changes.productionProcessList.currentValue != changes.productionProcessList.previousValue) {
                this.productionProcessList = changes.productionProcessList.currentValue;
            }
        }
    };
    ListProductionProcessComponent.prototype.selectElement = function (prdProd) {
        this.select.emit(prdProd);
    };
    ListProductionProcessComponent.prototype.onCreate = function (prdProd) {
        this.create.emit(prdProd);
    };
    ListProductionProcessComponent.prototype.getParametersData = function () {
        var _this = this;
        this.parametersService.getByCodeCategory$(environment.cutting_period_production).subscribe(function (lstPeriods) { return _this.definedPeriodList = lstPeriods; });
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ListProductionProcessComponent.prototype, "productionProcessList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ListProductionProcessComponent.prototype, "fk_id_enterprise", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListProductionProcessComponent.prototype, "select", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListProductionProcessComponent.prototype, "create", void 0);
    ListProductionProcessComponent = __decorate([
        Component({
            selector: 'app-list-production-process',
            templateUrl: 'list-production-process.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ParameterService])
    ], ListProductionProcessComponent);
    return ListProductionProcessComponent;
}());
export { ListProductionProcessComponent };
//# sourceMappingURL=list-production-process.component.js.map