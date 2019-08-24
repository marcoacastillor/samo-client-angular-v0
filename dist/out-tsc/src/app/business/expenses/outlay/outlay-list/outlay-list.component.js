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
import { faPlusCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Expense } from 'src/app/shared/models/expense';
import { ExpensesService } from 'src/app/shared/services/expenses.service';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { environment } from 'src/environments/environment';
import { ParameterConfigService } from 'src/app/shared/services/parameter-config.service';
import { tap } from 'rxjs/operators';
var OutlayListComponent = /** @class */ (function () {
    function OutlayListComponent(expenseService, globalStoreService, parameterService, parameterConfigService) {
        this.expenseService = expenseService;
        this.globalStoreService = globalStoreService;
        this.parameterService = parameterService;
        this.parameterConfigService = parameterConfigService;
        this.faPlusCircle = faPlusCircle;
        this.faEdit = faEdit;
        this.faTrash = faTrash;
        this.expense = new Expense;
        this.parameterEnterprise = [];
        this.parameterList = [];
        this.lstExpenses = [];
        this.user = new User;
        this.success = false;
        this.message = '';
        this.expense.type_expense = '';
    }
    OutlayListComponent.prototype.ngOnInit = function () {
        this.user = this.globalStoreService.getUser();
        this.loadExpenses();
        this.loadParameterEnterprise();
    };
    OutlayListComponent.prototype.loadParameterEnterprise = function () {
        var _this = this;
        this.parameterConfigService.getByEnterprise$(this.user.fk_id_enterprise).subscribe(function (parameters) { return _this.parameterEnterprise = parameters; });
    };
    OutlayListComponent.prototype.newExpense = function () {
        this.expense = new Expense;
    };
    OutlayListComponent.prototype.loadExpenses = function () {
        var _this = this;
        this.expenseService.getAll$().subscribe(function (lst_expenses) { return _this.lstExpenses = lst_expenses; });
    };
    OutlayListComponent.prototype.selectExpense = function (expense) {
        var _this = this;
        this.expenseService.show$(expense.pk_id_expense).subscribe(function (expense) { return _this.expense = expense; });
    };
    OutlayListComponent.prototype.loadParametersExpense = function () {
        var _this = this;
        this.parameterService.getByCodeCategory$(environment.type_expense).subscribe(function (lst_types) { return _this.parameterList = lst_types; });
    };
    OutlayListComponent.prototype.createExpense = function (expense) {
        var _this = this;
        var value = expense.actual_value;
        var code = '';
        this.expenseService.store$(expense)
            .pipe(tap(function () {
            _this.expenseService.getAll$().subscribe(function (lst_expenses) {
                _this.lstExpenses = lst_expenses;
                _this.success = true;
                _this.message = 'Se crea un registro, satisfactoriamente.';
            });
        }), tap(function (expense) {
            if (expense.type_expense == 'Comprobante de egreso') {
                code = environment.current_voucher;
            }
            else {
                code = environment.current_purchase;
            }
            _this.parameterConfigService.updateByEnterpriseAndCodeAndValue$(expense.fk_id_enterprise, code, value.toString()).subscribe();
        })).subscribe();
    };
    OutlayListComponent.prototype.updateExpense = function (expense) {
        var _this = this;
        this.expenseService.update$(expense).subscribe(function () {
            _this.expenseService.getAll$().subscribe(function (lst_expenses) {
                _this.lstExpenses = lst_expenses;
                _this.success = true;
                _this.message = 'Se actualiza registro, satisfactoriamente.';
            });
        });
    };
    OutlayListComponent.prototype.deleteExpense = function () {
        var _this = this;
        this.expenseService.delete$(this.expense.pk_id_expense).subscribe(function () {
            _this.expenseService.getAll$().subscribe(function (lst_expenses) {
                _this.lstExpenses = lst_expenses;
                _this.success = true;
                _this.message = 'Se elimina registro, satisfactoriamente.';
            });
        });
    };
    OutlayListComponent = __decorate([
        Component({
            selector: 'app-outlay-list',
            templateUrl: 'outlay-list.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ExpensesService,
            GlobalStoreService,
            ParameterService,
            ParameterConfigService])
    ], OutlayListComponent);
    return OutlayListComponent;
}());
export { OutlayListComponent };
//# sourceMappingURL=outlay-list.component.js.map