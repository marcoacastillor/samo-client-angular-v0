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
import { faPlusCircle, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CuttingPeriodService } from 'src/app/shared/services/cutting-period.service';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
var SettlementListComponent = /** @class */ (function () {
    function SettlementListComponent(globalStoreService, cuttingPeriodService) {
        this.globalStoreService = globalStoreService;
        this.cuttingPeriodService = cuttingPeriodService;
        this.faPlusCircle = faPlusCircle;
        this.faEye = faEye;
        this.faTrash = faTrash;
        this.user = new User;
        this.lstPeriods = [];
        this.success = false;
        this.message = '';
    }
    SettlementListComponent.prototype.ngOnInit = function () {
        this.user = this.globalStoreService.getUser();
        this.loadCuttingPeriodByEnterprise(this.user.fk_id_enterprise);
    };
    SettlementListComponent.prototype.loadCuttingPeriodByEnterprise = function (id) {
        var _this = this;
        this.cuttingPeriodService.getAllByEnterprise$(id).subscribe(function (list_periods) { return _this.lstPeriods = list_periods; });
    };
    SettlementListComponent = __decorate([
        Component({
            selector: 'app-settlement-list',
            templateUrl: 'settlement-list.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [GlobalStoreService,
            CuttingPeriodService])
    ], SettlementListComponent);
    return SettlementListComponent;
}());
export { SettlementListComponent };
//# sourceMappingURL=settlement-list.component.js.map