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
import { User } from 'src/app/shared/models/user';
import { StatusMessage } from 'src/app/shared/models/status-message';
import { faSignOutAlt, faTasks, faFileInvoiceDollar, faSync } from '@fortawesome/free-solid-svg-icons';
import { GlobalStoreService } from '../../services/global-store.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { environment } from 'src/environments/environment';
var MenuLeftComponent = /** @class */ (function () {
    function MenuLeftComponent(globalStore, router, authService) {
        this.globalStore = globalStore;
        this.router = router;
        this.authService = authService;
        this.faSignOutAlt = faSignOutAlt;
        this.faTasks = faTasks;
        this.faFileInvoiceDollar = faFileInvoiceDollar;
        this.faSync = faSync;
        this.statusSales = '';
        this.statusUsers = '';
        this.url_storage = environment.url_sales_storage;
    }
    MenuLeftComponent.prototype.ngOnInit = function () {
    };
    MenuLeftComponent.prototype.troggleSideBar = function () {
        var nameInput = document.getElementById('sidebar');
        if (nameInput.className == 'active') {
            nameInput.className = 'none';
        }
        else {
            nameInput.className = 'active';
        }
    };
    MenuLeftComponent.prototype.logout = function () {
        this.globalStore.clearSession();
        this.router.navigateByUrl('/');
    };
    //Ruta que actualiza sistema de usuarios
    MenuLeftComponent.prototype.updateAppsUser = function () {
        var _this = this;
        this.authService.refreshUsers().subscribe(function () { return _this.statusUsers = 'actualizado'; });
    };
    //Ruta que actualiza sistema de ventas
    MenuLeftComponent.prototype.updateAppsSales = function () {
        var _this = this;
        this.authService.refreshSales().subscribe(function () { return _this.statusSales = 'actualizado'; });
    };
    __decorate([
        Input(),
        __metadata("design:type", User)
    ], MenuLeftComponent.prototype, "user", void 0);
    __decorate([
        Input(),
        __metadata("design:type", StatusMessage)
    ], MenuLeftComponent.prototype, "message", void 0);
    MenuLeftComponent = __decorate([
        Component({
            selector: 'app-menu-lef',
            templateUrl: 'menu-left.component.html',
            styleUrls: ['menu-left.component.css']
        }),
        __metadata("design:paramtypes", [GlobalStoreService,
            Router,
            AuthenticationService])
    ], MenuLeftComponent);
    return MenuLeftComponent;
}());
export { MenuLeftComponent };
//# sourceMappingURL=menu-left.component.js.map