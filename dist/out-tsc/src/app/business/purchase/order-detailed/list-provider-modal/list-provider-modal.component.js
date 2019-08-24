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
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
var ListProviderModalComponent = /** @class */ (function () {
    function ListProviderModalComponent() {
        this.selectProvider = new EventEmitter();
        this.faCheckCircle = faCheckCircle;
    }
    ListProviderModalComponent.prototype.ngOnInit = function () {
    };
    ListProviderModalComponent.prototype.onSelectProvider = function (provider) {
        this.selectProvider.emit(provider);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ListProviderModalComponent.prototype, "lstProviders", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListProviderModalComponent.prototype, "selectProvider", void 0);
    ListProviderModalComponent = __decorate([
        Component({
            selector: 'app-list-provider-modal',
            templateUrl: 'list-provider-modal.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], ListProviderModalComponent);
    return ListProviderModalComponent;
}());
export { ListProviderModalComponent };
//# sourceMappingURL=list-provider-modal.component.js.map