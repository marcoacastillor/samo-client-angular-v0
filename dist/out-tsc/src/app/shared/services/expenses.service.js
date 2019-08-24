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
var ExpensesService = /** @class */ (function () {
    function ExpensesService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_expenses;
    }
    ExpensesService.prototype.getAll$ = function () {
        var _this = this;
        return this.userService.validateOptionByToken('Expense:getAll').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(_this._url);
            }
        }));
    };
    ExpensesService.prototype.store$ = function (expense) {
        var _this = this;
        return this.userService.validateOptionByToken('Expense:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, expense);
            }
        }));
    };
    ExpensesService.prototype.show$ = function (id_expense) {
        var _this = this;
        var url = this._url + '/' + id_expense;
        return this.userService.validateOptionByToken('Expense:show').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ExpensesService.prototype.delete$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id.toString();
        return this.userService.validateOptionByToken('Expense:delete').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    ExpensesService.prototype.update$ = function (expense) {
        var _this = this;
        return this.userService.validateOptionByToken('Expense:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, expense);
            }
        }));
    };
    ExpensesService.prototype.getByFilter$ = function (filter) {
        var _this = this;
        var url = this._url + '/get-by-filter';
        return this.userService.validateOptionByToken('Expense:getByFilter').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(url, filter);
            }
        }));
    };
    ExpensesService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], ExpensesService);
    return ExpensesService;
}());
export { ExpensesService };
//# sourceMappingURL=expenses.service.js.map