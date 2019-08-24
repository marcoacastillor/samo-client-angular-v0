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
import { LaboralCondition } from 'src/app/shared/models/laboral-condition';
import { PayingEmployee } from 'src/app/shared/models/paying-employee';
import { faPlus, faBan } from '@fortawesome/free-solid-svg-icons';
var ModalWorkerNewShowComponent = /** @class */ (function () {
    function ModalWorkerNewShowComponent() {
        this.faPlus = faPlus;
        this.faBan = faBan;
        this.updateByWorker = new EventEmitter();
    }
    ModalWorkerNewShowComponent.prototype.ngOnInit = function () {
    };
    ModalWorkerNewShowComponent.prototype.ngOnChanges = function (changes) {
        if (changes.selectedPayingInfo) {
            if (changes.selectedPayingInfo.currentValue != changes.selectedPayingInfo.previousValue) {
                this.selectedPayingInfo = changes.selectedPayingInfo.currentValue;
            }
        }
    };
    ModalWorkerNewShowComponent.prototype.updatePayingEmployee = function (id_worker) {
        this.updateByWorker.emit(id_worker);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ModalWorkerNewShowComponent.prototype, "workerNewsLst", void 0);
    __decorate([
        Input(),
        __metadata("design:type", LaboralCondition)
    ], ModalWorkerNewShowComponent.prototype, "laboral_condition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ModalWorkerNewShowComponent.prototype, "production_period", void 0);
    __decorate([
        Input(),
        __metadata("design:type", PayingEmployee)
    ], ModalWorkerNewShowComponent.prototype, "selectedPayingInfo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ModalWorkerNewShowComponent.prototype, "period_state", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalWorkerNewShowComponent.prototype, "updateByWorker", void 0);
    ModalWorkerNewShowComponent = __decorate([
        Component({
            selector: 'app-modal-worker-new-show',
            templateUrl: 'moda-worker-new-show.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], ModalWorkerNewShowComponent);
    return ModalWorkerNewShowComponent;
}());
export { ModalWorkerNewShowComponent };
//# sourceMappingURL=modal-worker-new-show.component.js.map