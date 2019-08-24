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
var ProductionProcessService = /** @class */ (function () {
    function ProductionProcessService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_production_process;
    }
    ProductionProcessService.prototype.getAllByEnterprise$ = function (id_enterprise) {
        var _this = this;
        var url = this._url + '/' + id_enterprise.toString();
        return this.userService.validateOptionByToken('ProductionProcess:getAllByEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ProductionProcessService.prototype.store$ = function (productionProcess) {
        var _this = this;
        return this.userService.validateOptionByToken('ProductionProcess:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, productionProcess);
            }
        }));
    };
    ProductionProcessService.prototype.update$ = function (productionProcess) {
        var _this = this;
        return this.userService.validateOptionByToken('ProductionProcess:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, productionProcess);
            }
        }));
    };
    ProductionProcessService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], ProductionProcessService);
    return ProductionProcessService;
}());
export { ProductionProcessService };
//# sourceMappingURL=production-process.service.js.map