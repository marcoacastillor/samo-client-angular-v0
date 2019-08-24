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
var CategoryService = /** @class */ (function () {
    function CategoryService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_category;
    }
    CategoryService.prototype.getAll$ = function () {
        var _this = this;
        return this.userService.validateOptionByToken('Category:getAll').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(_this._url);
            }
        }));
    };
    CategoryService.prototype.store$ = function (cmp) {
        var _this = this;
        return this.userService.validateOptionByToken('Category:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, cmp);
            }
        }));
    };
    CategoryService.prototype.show$ = function (id_cmp) {
        var _this = this;
        var url = this._url + '/' + id_cmp;
        return this.userService.validateOptionByToken('Category:show').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    CategoryService.prototype.update$ = function (cmp) {
        var _this = this;
        return this.userService.validateOptionByToken('Category:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, cmp);
            }
        }));
    };
    CategoryService.prototype.delete$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id.toString();
        return this.userService.validateOptionByToken('Category:delete').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    CategoryService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], CategoryService);
    return CategoryService;
}());
export { CategoryService };
//# sourceMappingURL=category.service.js.map