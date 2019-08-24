var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
var OperationService = /** @class */ (function () {
    function OperationService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_operation;
    }
    OperationService.prototype.getByType$ = function (type) {
        var _this = this;
        var url = this._url + '/get-by-type/' + type;
        return this.userService.validateOptionByToken('Operation:getByType').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OperationService.prototype.getAllByTypeAndEnterprise$ = function (type, id_enterprise) {
        var _this = this;
        var url = this._url + '/get-by-type-and-enterprise/' + type + '/' + id_enterprise;
        return this.userService.validateOptionByToken('Operation:getByTypeAndEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OperationService.prototype.getConsolidateByDates$ = function (fromDate, toDate, type_operation) {
        var _this = this;
        var url = this._url + '/get-consolidate-operations-by-dates/' + fromDate + '/' + toDate + '/' + type_operation;
        return this.userService.validateOptionByToken('Operation:getConsolidateByDates').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OperationService.prototype.getListByProduct$ = function (id, fromDate, toDate) {
        var _this = this;
        var url = this._url + '/get-list-by-products/' + id.toString() + '/' + fromDate + '/' + toDate;
        return this.userService.validateOptionByToken('Operation:getListByProduct').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OperationService.prototype.searchByFilter$ = function (filter, type) {
        var _this = this;
        var url = this._url + '/get-by-filter/' + filter + '/' + type;
        return this.userService.validateOptionByToken('Operation:getByFilter').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OperationService.prototype.getByNameProviderAndTypeAndEnterprise$ = function (nameProvider, type, id_enterprise) {
        var _this = this;
        var url = this._url + '/get-by-providername-and-type-and-enterprise/' + nameProvider + '/' + type + '/' + id_enterprise.toString();
        return this.userService.validateOptionByToken('Operation:getByProviderNameAndTypeAndEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OperationService.prototype.getByDateOperationAndTypeAndEnterprise$ = function (date_operation, type, id_enterprise) {
        var _this = this;
        var url = this._url + '/get-by-date-and-type-and-enterprise/' + date_operation + '/' + type + '/' + id_enterprise.toString();
        return this.userService.validateOptionByToken('Operation:getByDateAndTypeAndEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OperationService.prototype.getByPaymentTypeAndTypeAndEnterprise$ = function (payment_type, type, id_enterprise) {
        var _this = this;
        var url = this._url + '/get-by-paymenttype-and-type-and-enterprise/' + payment_type + '/' + type + '/' + id_enterprise.toString();
        return this.userService.validateOptionByToken('Operation:getByPaymentTypeAndTypeAndEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OperationService.prototype.getByNumberInvoiceTypeAndTypeAndEnterprise$ = function (number_invoice, type, id_enterprise) {
        var _this = this;
        var url = this._url + '/get-by-numberinvoice-and-type-and-enterprise/' + number_invoice + '/' + type + '/' + id_enterprise.toString();
        return this.userService.validateOptionByToken('Operation:getByNumberInvoiceAndTypeAndEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OperationService.prototype.storeOperation$ = function (operation) {
        var _this = this;
        var url = this._url + '/create-operation';
        return this.userService.validateOptionByToken('Operation:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(url, operation);
            }
        }));
    };
    OperationService.prototype.updateOperation$ = function (operation) {
        var _this = this;
        return this.userService.validateOptionByToken('Operation:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, operation);
            }
        }));
    };
    OperationService.prototype.changeState$ = function (id, state) {
        var _this = this;
        var url = this._url + '/change-state/' + id.toString() + '/' + state;
        return this.userService.validateOptionByToken('Operation:changeState').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OperationService.prototype.getOperationPDF$ = function (id_operation) {
        var _this = this;
        var url = this._url + '/get-pdf-small-operation/' + id_operation.toString();
        return this.userService.validateOptionByToken('Operation:getPDFSmall').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OperationService.prototype.store_purchase$ = function (purchase) {
        var _this = this;
        var url = this._url + '/create-purchase';
        return this.userService.validateOptionByToken('Operation:createPurchase').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(url, purchase);
            }
        }));
    };
    OperationService.prototype.store_purchase_file$ = function (operation) {
        var _this = this;
        var url = this._url + '/create-purchase-file';
        return this.userService.validateOptionByToken('Operation:createPurchaseFile').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(url, operation);
            }
        }));
    };
    OperationService.prototype.store_sale$ = function (operation) {
        var _this = this;
        var url = this._url + '/create-sale';
        return this.userService.validateOptionByToken('Operation:createSale').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(url, operation);
            }
        }));
    };
    OperationService.prototype.show_purchase$ = function (id_purchase) {
        var _this = this;
        var url = this._url + '/' + id_purchase;
        return this.userService.validateOptionByToken('Operation:show').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OperationService.prototype.getDetailOperation$ = function (id_operation) {
        var _this = this;
        var url = this._url + '/get-detail/' + id_operation;
        return this.userService.validateOptionByToken('Operation:getDetail').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OperationService.prototype.getOperationByProvider$ = function (id_enterprise) {
        var _this = this;
        var url = this._url + '/get-operation-by-provider/' + id_enterprise;
        return this.userService.validateOptionByToken('Operation:getOperationsByProvider').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OperationService.prototype.getOperationByClient$ = function (id_person) {
        var _this = this;
        var url = this._url + '/get-operation-by-client/' + id_person;
        return this.userService.validateOptionByToken('Operation:getOperationsByClient').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    OperationService.prototype.getByPaymentTypeAndDatesAndType$ = function (paymentType, fromDate, toDate, type_operation) {
        var _this = this;
        var params = {
            'payment_type': paymentType,
            'from_date': fromDate,
            'to_date': toDate,
            'type_operation': type_operation
        };
        var url = this._url + '/get-by-payment-type-and-dates-and-type';
        return this.userService.validateOptionByToken('Operation:getByPaymentTypeAndDatesAndType').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(url, params);
            }
        }));
    };
    OperationService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], OperationService);
    return OperationService;
}());
export { OperationService };
//# sourceMappingURL=operation.service.js.map