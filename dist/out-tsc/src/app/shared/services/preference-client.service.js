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
var PreferenceClientService = /** @class */ (function () {
    function PreferenceClientService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_preference_client;
    }
    PreferenceClientService.prototype.getByPerson$ = function (id_person) {
        var _this = this;
        var url = this._url + '/get-by-person/' + id_person.toString();
        return this.userService.validateOptionByToken('PreferenceClient:getByPerson').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PreferenceClientService.prototype.create$ = function (preferceClient) {
        var _this = this;
        return this.userService.validateOptionByToken('PreferenceClient:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, preferceClient);
            }
        }));
    };
    PreferenceClientService.prototype.update$ = function (preferceClient) {
        var _this = this;
        return this.userService.validateOptionByToken('PreferenceClient:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, preferceClient);
            }
        }));
    };
    PreferenceClientService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], PreferenceClientService);
    return PreferenceClientService;
}());
export { PreferenceClientService };
//# sourceMappingURL=preference-client.service.js.map