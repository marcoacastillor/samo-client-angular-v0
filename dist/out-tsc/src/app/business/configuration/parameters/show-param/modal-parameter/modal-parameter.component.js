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
import { Parameter } from 'src/app/shared/models/parameter';
var ModalParameterComponent = /** @class */ (function () {
    function ModalParameterComponent() {
        this.create = new EventEmitter();
        this.update = new EventEmitter();
        this.cancel = new EventEmitter();
    }
    ModalParameterComponent.prototype.ngOnInit = function () {
    };
    ModalParameterComponent.prototype.onCreate = function (parameter) {
        this.create.emit(parameter);
    };
    ModalParameterComponent.prototype.onUpdate = function (parameter) {
        this.update.emit(parameter);
    };
    ModalParameterComponent.prototype.onCancel = function (param) {
        this.cancel.emit(param);
    };
    __decorate([
        Input(),
        __metadata("design:type", Parameter)
    ], ModalParameterComponent.prototype, "parameter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalParameterComponent.prototype, "create", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalParameterComponent.prototype, "update", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalParameterComponent.prototype, "cancel", void 0);
    ModalParameterComponent = __decorate([
        Component({
            selector: 'app-modal-parameter',
            templateUrl: 'modal-parameter.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], ModalParameterComponent);
    return ModalParameterComponent;
}());
export { ModalParameterComponent };
//# sourceMappingURL=modal-parameter.component.js.map