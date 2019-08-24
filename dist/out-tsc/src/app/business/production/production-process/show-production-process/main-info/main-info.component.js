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
import { faEdit, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
var MainInfoComponent = /** @class */ (function () {
    function MainInfoComponent(parametersService) {
        this.parametersService = parametersService;
        this.faEdit = faEdit;
        this.faStopwatch = faStopwatch;
        this.definedPeriodList = [];
        this.onUpdate = new EventEmitter();
    }
    MainInfoComponent.prototype.ngOnInit = function () {
    };
    MainInfoComponent.prototype.getParametersData = function () {
        var _this = this;
        this.parametersService.getByCodeCategory$(environment.cutting_period_production).subscribe(function (lstPeriods) { return _this.definedPeriodList = lstPeriods; });
    };
    MainInfoComponent.prototype.update = function (productionProcess) {
        this.onUpdate.emit(productionProcess);
    };
    MainInfoComponent.prototype.closePeriod = function () {
        this.productionProcess.state = 'Cerrado';
        this.productionProcess.date_end = moment().format('YYYY-MM-DD');
        this.onUpdate.emit(this.productionProcess);
    };
    __decorate([
        Input(),
        __metadata("design:type", ProductionProcess)
    ], MainInfoComponent.prototype, "productionProcess", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], MainInfoComponent.prototype, "onUpdate", void 0);
    MainInfoComponent = __decorate([
        Component({
            selector: 'app-main-info',
            templateUrl: 'main-info.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ParameterService])
    ], MainInfoComponent);
    return MainInfoComponent;
}());
export { MainInfoComponent };
//# sourceMappingURL=main-info.component.js.map