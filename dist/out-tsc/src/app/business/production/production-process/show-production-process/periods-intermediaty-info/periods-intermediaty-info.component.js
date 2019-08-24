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
import { DetailProductInput } from 'src/app/shared/models/detail-product-input';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
var PeriodsIntermediatyInfoComponent = /** @class */ (function () {
    function PeriodsIntermediatyInfoComponent() {
        this.faTrash = faTrash;
        this.detailProductInput = new DetailProductInput();
        this.onDeleteDetail = new EventEmitter();
    }
    PeriodsIntermediatyInfoComponent.prototype.ngOnInit = function () {
    };
    PeriodsIntermediatyInfoComponent.prototype.ngOnChanges = function (changes) {
        if (changes.stateProduction) {
            if (changes.stateProduction.currentValue != changes.stateProduction.previousValue) {
                this.stateProduction = changes.stateProduction.currentValue;
            }
        }
        if (changes.stateProcess) {
            if (changes.stateProcess.currentValue != changes.stateProcess.previousValue) {
                this.stateProcess = changes.stateProcess.currentValue;
            }
        }
    };
    PeriodsIntermediatyInfoComponent.prototype.selectDetailProductInput = function (detailProductInput) {
        this.detailProductInput = detailProductInput;
    };
    PeriodsIntermediatyInfoComponent.prototype.deleteDetailProduct = function () {
        this.onDeleteDetail.emit(this.detailProductInput.pk_id_detail_product_input);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PeriodsIntermediatyInfoComponent.prototype, "productLst", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PeriodsIntermediatyInfoComponent.prototype, "stateProduction", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PeriodsIntermediatyInfoComponent.prototype, "stateProcess", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PeriodsIntermediatyInfoComponent.prototype, "onDeleteDetail", void 0);
    PeriodsIntermediatyInfoComponent = __decorate([
        Component({
            selector: 'app-periods-intermediaty-info',
            templateUrl: 'periods-intermediaty-info.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], PeriodsIntermediatyInfoComponent);
    return PeriodsIntermediatyInfoComponent;
}());
export { PeriodsIntermediatyInfoComponent };
//# sourceMappingURL=periods-intermediaty-info.component.js.map