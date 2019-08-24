var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faSave, faCalendar, faClone, faDonate, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { Expense } from 'src/app/shared/models/expense';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { environment } from 'src/environments/environment';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
var ModalExpenseFormComponent = /** @class */ (function () {
    function ModalExpenseFormComponent(fb, formToolService, enterpriseService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.enterpriseService = enterpriseService;
        this.faSave = faSave;
        this.faCalendar = faCalendar;
        this.faClone = faClone;
        this.faDonate = faDonate;
        this.faSearch = faSearch;
        this.enterprise = new Enterprise;
        this.lstProviders = [];
        this.update = new EventEmitter();
        this.create = new EventEmitter();
        this.lastkeydown1 = 0;
        this.emptyProv = false;
    }
    ModalExpenseFormComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    ModalExpenseFormComponent.prototype.ngOnChanges = function (changes) {
        if (changes.expense) {
            if (changes.expense.currentValue != changes.expense.previousValue) {
                this.expense = changes.expense.currentValue;
                this.initForm();
            }
        }
    };
    ModalExpenseFormComponent.prototype.onFindProvider = function (filter) {
        var _this = this;
        var nameProvider = document.getElementById('filterProvider').value;
        this.lstProviders = [];
        if (nameProvider.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.enterpriseService.getByNameFilter$(nameProvider, environment.enterprise_provider).subscribe(function (lstProviders) {
                    _this.lstProviders = lstProviders;
                    _this.emptyProv = false;
                }, function () {
                    _this.emptyProv = true;
                });
            }
        }
    };
    ModalExpenseFormComponent.prototype.selectProvider = function (enterprise) {
        this.emptyProv = false;
        this.enterprise = enterprise;
        this.lstProviders = [];
        this.expenseForm.patchValue({
            fk_id_provider: enterprise.pk_id_enterprise,
            name_provider: '(' + enterprise.nit + ') ' + enterprise.name + ' ' + enterprise.last_names
        });
    };
    ModalExpenseFormComponent.prototype.selectNumberPurchase = function () {
        var number_purchase = '';
        var enterprise_purchase = this.getParameters(environment.enterprise_purchase_fact);
        var prefix_purchase = this.getParameters(environment.prefix_purchase);
        var current_purchase = this.getParameters(environment.current_purchase);
        if (enterprise_purchase) {
            if (prefix_purchase) {
                if (current_purchase) {
                    number_purchase = prefix_purchase + (Number(current_purchase) + 1);
                }
                else {
                    number_purchase = '1';
                }
            }
            else if (current_purchase) {
                number_purchase = (Number(current_purchase) + 1).toString();
            }
            else {
                number_purchase = '1';
            }
        }
        else {
            number_purchase = '';
        }
        this.expenseForm.patchValue({
            number_voucher: number_purchase,
            actual_value: Number(current_purchase) + 1,
            type_expense: 'Factura Equivalente'
        });
    };
    ModalExpenseFormComponent.prototype.selectNumberVoucher = function () {
        var number_voucher = '';
        var current_voucher = this.getParameters(environment.current_voucher);
        if (current_voucher) {
            number_voucher = (Number(current_voucher) + 1).toString();
        }
        else {
            number_voucher = '1';
        }
        this.expenseForm.patchValue({
            number_voucher: number_voucher,
            actual_value: Number(current_voucher) + 1,
            type_expense: 'Comprobante de egreso'
        });
    };
    ModalExpenseFormComponent.prototype.getParameters = function (code) {
        if (this.parameterEnterprise) {
            var resultado = this.parameterEnterprise.filter(function (parameter) { return parameter.code === code; });
            if (resultado[0].value != code)
                return resultado[0].value;
            else
                return null;
        }
        else {
            return null;
        }
    };
    ModalExpenseFormComponent.prototype.initForm = function () {
        this.expenseForm = this.fb.group({
            pk_id_expense: [this.expense.pk_id_expense],
            fk_id_enterprise: [this.fk_id_enterprise],
            name_provider: [this.expense.name_provider],
            fk_id_provider: [this.expense.fk_id_provider, Validators.required],
            number_voucher: [this.expense.number_voucher, Validators.required],
            actual_value: [],
            date_expense: [this.expense.date_expense],
            type_expense: [this.expense.type_expense, Validators.required],
            concept_expense: [this.expense.concept_expense, Validators.required],
            description: [this.expense.description, Validators.required],
            value: [this.expense.value, Validators.required]
        });
    };
    ModalExpenseFormComponent.prototype.updateExpense = function () {
        this.update.emit(this.expenseForm.value);
    };
    ModalExpenseFormComponent.prototype.createExpense = function () {
        this.create.emit(this.expenseForm.value);
    };
    /**
    * Funciones para verificar si los formularios son obligatorios o no.
    */
    ModalExpenseFormComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.expenseForm, controlName);
    };
    ModalExpenseFormComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.expenseForm, controlName);
    };
    ModalExpenseFormComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.expenseForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", Expense)
    ], ModalExpenseFormComponent.prototype, "expense", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ModalExpenseFormComponent.prototype, "parameterList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ModalExpenseFormComponent.prototype, "parameterEnterprise", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ModalExpenseFormComponent.prototype, "fk_id_enterprise", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalExpenseFormComponent.prototype, "update", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalExpenseFormComponent.prototype, "create", void 0);
    ModalExpenseFormComponent = __decorate([
        Component({
            selector: 'app-modal-expense-form',
            templateUrl: 'modal-expense-form.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService,
            EnterpriseService])
    ], ModalExpenseFormComponent);
    return ModalExpenseFormComponent;
}());
export { ModalExpenseFormComponent };
//# sourceMappingURL=modal-expense-form.component.js.map