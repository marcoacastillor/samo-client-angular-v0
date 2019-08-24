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
var LaboralConditionService = /** @class */ (function () {
    function LaboralConditionService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_laboral_condition;
    }
    LaboralConditionService.prototype.getInfoByEnterprisePerson$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id;
        return this.userService.validateOptionByToken('LaboralCondition:getInfoByContract').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    LaboralConditionService.prototype.create$ = function (laboralCondition) {
        var _this = this;
        return this.userService.validateOptionByToken('LaboralCondition:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, laboralCondition);
            }
        }));
    };
    LaboralConditionService.prototype.update$ = function (laboralCondition) {
        var _this = this;
        return this.userService.validateOptionByToken('LaboralCondition:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, laboralCondition);
            }
        }));
    };
    LaboralConditionService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], LaboralConditionService);
    return LaboralConditionService;
}());
export { LaboralConditionService };
//# sourceMappingURL=laboral-condition.service.js.map