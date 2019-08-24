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
import { Operation } from 'src/app/shared/models/operation';
var ModalShowOrderFileComponent = /** @class */ (function () {
    function ModalShowOrderFileComponent() {
        this.create = new EventEmitter();
    }
    ModalShowOrderFileComponent.prototype.ngOnInit = function () {
    };
    ModalShowOrderFileComponent.prototype.onCreate = function (operation) {
        this.create.emit(operation);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ModalShowOrderFileComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Operation)
    ], ModalShowOrderFileComponent.prototype, "operation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ModalShowOrderFileComponent.prototype, "lstParams", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalShowOrderFileComponent.prototype, "create", void 0);
    ModalShowOrderFileComponent = __decorate([
        Component({
            selector: 'app-modal-show-order-file',
            templateUrl: 'modal-show-order-file.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], ModalShowOrderFileComponent);
    return ModalShowOrderFileComponent;
}());
export { ModalShowOrderFileComponent };
//# sourceMappingURL=modal-show-order-file.component.js.map