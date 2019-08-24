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
var PeriodsProductInfoComponent = /** @class */ (function () {
    function PeriodsProductInfoComponent() {
        this.faTrash = faTrash;
        this.detailProductInput = new DetailProductInput();
        this.onDeleteDetail = new EventEmitter();
    }
    PeriodsProductInfoComponent.prototype.ngOnInit = function () {
    };
    PeriodsProductInfoComponent.prototype.ngOnChanges = function (changes) {
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
    PeriodsProductInfoComponent.prototype.selectDetailProductInput = function (detailProductInput) {
        this.detailProductInput = detailProductInput;
    };
    PeriodsProductInfoComponent.prototype.deleteDetailProduct = function () {
        this.onDeleteDetail.emit(this.detailProductInput.pk_id_detail_product_input);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PeriodsProductInfoComponent.prototype, "productLst", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PeriodsProductInfoComponent.prototype, "stateProduction", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PeriodsProductInfoComponent.prototype, "stateProcess", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PeriodsProductInfoComponent.prototype, "onDeleteDetail", void 0);
    PeriodsProductInfoComponent = __decorate([
        Component({
            selector: 'app-periods-product-info',
            templateUrl: 'periods-product-info.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], PeriodsProductInfoComponent);
    return PeriodsProductInfoComponent;
}());
export { PeriodsProductInfoComponent };
//# sourceMappingURL=periods-product-info.component.js.map