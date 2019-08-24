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
import { faPlusCircle, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/models/user';
import { OperationService } from 'src/app/shared/services/operation.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { environment } from 'src/environments/environment';
var ListSaleDetailComponent = /** @class */ (function () {
    function ListSaleDetailComponent(operationService, globalStoreService) {
        this.operationService = operationService;
        this.globalStoreService = globalStoreService;
        this.faPlusCircle = faPlusCircle;
        this.faEye = faEye;
        this.faSearch = faSearch;
        this.lastkeydown1 = 0;
        this.lstOrders = [];
        this.activeUser = new User();
    }
    ListSaleDetailComponent.prototype.ngOnInit = function () {
        this.activeUser = this.globalStoreService.getUser();
        this.getOrdersByEnterprise(this.activeUser.fk_id_enterprise);
    };
    ListSaleDetailComponent.prototype.getOrdersByEnterprise = function (id_enterprise) {
        var _this = this;
        this.operationService.getAllByTypeAndEnterprise$(environment.sales, id_enterprise).subscribe(function (lstOrders) { return _this.lstOrders = lstOrders; });
    };
    ListSaleDetailComponent.prototype.onFindOderByProvider = function (filter) {
        var _this = this;
        var nameProvider = document.getElementById('nameProvider').value;
        this.lstOrders = [];
        if (nameProvider.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.operationService.getByNameProviderAndTypeAndEnterprise$(nameProvider, environment.sales, this.activeUser.fk_id_enterprise).subscribe(function (lst_orders) {
                    _this.lstOrders = lst_orders;
                });
            }
        }
        else {
            this.getOrdersByEnterprise(this.activeUser.fk_id_enterprise);
        }
    };
    ListSaleDetailComponent.prototype.onFindOrderByDate = function (filter) {
        var _this = this;
        var dateOperation = document.getElementById('dateOperation').value;
        this.lstOrders = [];
        if (dateOperation.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.operationService.getByDateOperationAndTypeAndEnterprise$(dateOperation, environment.sales, this.activeUser.fk_id_enterprise).subscribe(function (lst_orders) {
                    _this.lstOrders = lst_orders;
                });
            }
        }
        else {
            this.getOrdersByEnterprise(this.activeUser.fk_id_enterprise);
        }
    };
    ListSaleDetailComponent.prototype.onFindOrderByPaymentType = function (filter) {
        var _this = this;
        var paymentType = document.getElementById('paymentType').value;
        this.lstOrders = [];
        if (paymentType.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.operationService.getByPaymentTypeAndTypeAndEnterprise$(paymentType, environment.sales, this.activeUser.fk_id_enterprise).subscribe(function (lst_orders) {
                    _this.lstOrders = lst_orders;
                });
            }
        }
        else {
            this.getOrdersByEnterprise(this.activeUser.fk_id_enterprise);
        }
    };
    ListSaleDetailComponent.prototype.onFindOderByNumberInvoice = function (filter) {
        var _this = this;
        var numberInvoice = document.getElementById('numberInvoice').value;
        this.lstOrders = [];
        if (numberInvoice.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.operationService.getByNumberInvoiceTypeAndTypeAndEnterprise$(numberInvoice, environment.sales, this.activeUser.fk_id_enterprise).subscribe(function (lst_orders) {
                    _this.lstOrders = lst_orders;
                });
            }
        }
        else {
            this.getOrdersByEnterprise(this.activeUser.fk_id_enterprise);
        }
    };
    ListSaleDetailComponent = __decorate([
        Component({
            selector: 'app-list-sale-detail',
            templateUrl: 'list-sale-detail.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [OperationService,
            GlobalStoreService])
    ], ListSaleDetailComponent);
    return ListSaleDetailComponent;
}());
export { ListSaleDetailComponent };
//# sourceMappingURL=list-sale-detail.component.js.map