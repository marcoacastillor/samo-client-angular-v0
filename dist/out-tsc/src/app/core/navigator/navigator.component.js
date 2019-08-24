var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { GlobalStoreService } from '../../core/services/global-store.service';
import { faHome } from '@fortawesome/free-solid-svg-icons';
var NavigatorComponent = /** @class */ (function () {
    function NavigatorComponent(globalStorageService) {
        this.globalStorageService = globalStorageService;
        this.faHome = faHome;
    }
    NavigatorComponent.prototype.ngOnInit = function () {
        this.getMessage();
        this.getUser();
    };
    NavigatorComponent.prototype.getMessage = function () {
        this.userMessage$ = this.globalStorageService.selectUserMessage$();
    };
    NavigatorComponent.prototype.getUser = function () {
        this.user$ = this.globalStorageService.getUser$();
    };
    NavigatorComponent = __decorate([
        Component({
            selector: 'app-navigator',
            templateUrl: 'navigator.component.html',
        }),
        __metadata("design:paramtypes", [GlobalStoreService])
    ], NavigatorComponent);
    return NavigatorComponent;
}());
export { NavigatorComponent };
//# sourceMappingURL=navigator.component.js.map