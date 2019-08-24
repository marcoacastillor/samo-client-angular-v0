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
var CuttingPeriodService = /** @class */ (function () {
    function CuttingPeriodService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_cutting_period;
    }
    CuttingPeriodService.prototype.show$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id.toString();
        return this.userService.validateOptionByToken('CuttingPeriod:show').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    CuttingPeriodService.prototype.getAllByProductionProcess$ = function (id_production_process) {
        var _this = this;
        var url = this._url + '/get-by-period/' + id_production_process.toString();
        return this.userService.validateOptionByToken('CuttingPeriod:getByPeriod').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    CuttingPeriodService.prototype.getAllByEnterprise$ = function (id_enterprise) {
        var _this = this;
        var url = this._url + '/get-all-by-enterprise/' + id_enterprise.toString();
        return this.userService.validateOptionByToken('CuttingPeriod:getAllByEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    CuttingPeriodService.prototype.getAllActiveSettlementByEnterprise$ = function (id_enterprise) {
        var _this = this;
        var url = this._url + '/get-all-active-settlement-by-enterprise/' + id_enterprise.toString();
        return this.userService.validateOptionByToken('CuttingPeriod:getActiveSettlementByEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    CuttingPeriodService.prototype.getActivePeriodByProductionProcess$ = function (id_production_process) {
        var _this = this;
        var url = this._url + '/get-active-by-production-process/' + id_production_process.toString();
        return this.userService.validateOptionByToken('CuttingPeriod:getActiveByProductionProcess').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    CuttingPeriodService.prototype.store$ = function (cuttingPeriod) {
        var _this = this;
        return this.userService.validateOptionByToken('CuttingPeriod:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, cuttingPeriod);
            }
        }));
    };
    CuttingPeriodService.prototype.delete$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id.toString();
        return this.userService.validateOptionByToken('CuttingPeriod:delete').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    CuttingPeriodService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], CuttingPeriodService);
    return CuttingPeriodService;
}());
export { CuttingPeriodService };
//# sourceMappingURL=cutting-period.service.js.map