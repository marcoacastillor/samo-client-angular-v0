var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { StatusMessage } from '../models/status-message';
var CardComponent = /** @class */ (function () {
    function CardComponent() {
    }
    CardComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CardComponent.prototype, "caption", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CardComponent.prototype, "value", void 0);
    __decorate([
        Input(),
        __metadata("design:type", StatusMessage)
    ], CardComponent.prototype, "status", void 0);
    CardComponent = __decorate([
        Component({
            selector: 'app-card',
            templateUrl: 'card.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], CardComponent);
    return CardComponent;
}());
export { CardComponent };
//# sourceMappingURL=card.component.js.map