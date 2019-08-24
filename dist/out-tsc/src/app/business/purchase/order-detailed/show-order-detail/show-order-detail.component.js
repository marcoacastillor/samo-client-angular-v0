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
import { faThList, faEdit, faLock, faPrint, faPlus, faDollarSign, faUndo, faFileInvoiceDollar, faCartArrowDown, faDonate, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Operation } from 'src/app/shared/models/operation';
import { ActivatedRoute } from '@angular/router';
import { OperationService } from 'src/app/shared/services/operation.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { OperationProductService } from 'src/app/shared/services/operation-product.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { NotesService } from 'src/app/shared/services/notes.service';
import { tap } from 'rxjs/operators';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { environment } from 'src/environments/environment';
var ShowOrderDetailComponent = /** @class */ (function () {
    function ShowOrderDetailComponent(activateRoute, operationService, enterpriseService, operationProductService, paymentService, noteService, parameterService) {
        this.activateRoute = activateRoute;
        this.operationService = operationService;
        this.enterpriseService = enterpriseService;
        this.operationProductService = operationProductService;
        this.paymentService = paymentService;
        this.noteService = noteService;
        this.parameterService = parameterService;
        this.id_operation = '';
        this.faThList = faThList;
        this.faFileInvoiceDollar = faFileInvoiceDollar;
        this.faCartArrowDown = faCartArrowDown;
        this.faDonate = faDonate;
        this.faEdit = faEdit;
        this.faLock = faLock;
        this.faPrint = faPrint;
        this.faPlus = faPlus;
        this.faDollarSign = faDollarSign;
        this.faUndo = faUndo;
        this.faTrashAlt = faTrashAlt;
        this.lstProducts = [];
        this.lstNotes = [];
        this.lstPayments = [];
        this.operation = new Operation();
        this.enterprise = new Enterprise();
        this.lstParams = [];
        this.individual = environment.individual;
        this.type_payment = environment.type_payment;
        this.taxes = environment.tax_purchase;
        this.block = environment.state_block;
        this.categories = { 'categories': [this.type_payment, this.taxes] };
        this.success = false;
        this.message = '';
    }
    ShowOrderDetailComponent.prototype.ngOnInit = function () {
        this.id_operation = this.activateRoute.snapshot.params['id'];
        this.getOperationDetail(this.id_operation);
    };
    ShowOrderDetailComponent.prototype.getOperationDetail = function (id) {
        var _this = this;
        this.operationService.getDetailOperation$(Number(id)).pipe(tap(function (operation) {
            _this.operation = operation;
        }), tap(function (operation) {
            _this.enterpriseService.showByExternalReference$(operation.external_reference).subscribe(function (enterprise) { return _this.enterprise = enterprise; });
        }), tap(function (operation) {
            _this.operationProductService.getProductsByOperation$(operation.pk_id_operation).subscribe(function (lstProducts) { return _this.lstProducts = lstProducts; });
        }), tap(function (operation) {
            _this.paymentService.getPaymentsByOperation$(operation.pk_id_operation).subscribe(function (lstPayments) { return _this.lstPayments = lstPayments; });
        }), tap(function (operation) {
            _this.noteService.getNotesByOperation$(operation.pk_id_operation).subscribe(function (lstNotes) { return _this.lstNotes = lstNotes; });
        })).subscribe();
    };
    ShowOrderDetailComponent.prototype.getMultipleParams = function () {
        var _this = this;
        this.parameterService.getByMultipleCodeCategory$(this.categories).subscribe(function (lstParams) { return _this.lstParams = lstParams; });
    };
    ShowOrderDetailComponent.prototype.onUpdateOperation = function (operation) {
        var _this = this;
        this.operationService.updateOperation$(operation).subscribe(function (operation) {
            _this.getOperationDetail(operation.pk_id_operation.toString());
            _this.success = true;
            _this.message = 'Se actualizó la operación correctamente.';
        });
    };
    ShowOrderDetailComponent.prototype.onAddProduct = function (product) {
        var _this = this;
        this.operationProductService.store$(product).subscribe(function (operationProduct) {
            _this.getOperationDetail(operationProduct.fk_id_operation.toString());
            _this.success = true;
            _this.message = 'Se agregó producto correctamente.';
        });
    };
    ShowOrderDetailComponent.prototype.delProduct = function (id) {
        var _this = this;
        this.operationProductService.delete$(id).subscribe(function (operationProduct) {
            _this.getOperationDetail(operationProduct.fk_id_operation.toString());
            _this.success = true;
            _this.message = 'Se eliminó producto correctamente.';
        });
    };
    ShowOrderDetailComponent.prototype.onAddPayment = function (payment) {
        var _this = this;
        this.paymentService.store$(payment).subscribe(function (payment) {
            _this.getOperationDetail(payment.fk_id_operation.toString());
            _this.success = true;
            _this.message = 'Se agregó un pago correctamente.';
        });
    };
    ShowOrderDetailComponent.prototype.delPayment = function (id) {
        var _this = this;
        this.paymentService.delete$(id).subscribe(function (payment) {
            _this.getOperationDetail(payment.fk_id_operation.toString());
            _this.success = true;
            _this.message = 'Se eliminó un pago correctamente.';
        });
    };
    ShowOrderDetailComponent.prototype.blockInvoice = function () {
        var _this = this;
        this.operationService.changeState$(this.operation.pk_id_operation, environment.state_block).subscribe(function (operation) {
            _this.getOperationDetail(operation.pk_id_operation.toString());
            _this.success = true;
            _this.message = 'Se bloquea la factura.';
        });
    };
    ShowOrderDetailComponent = __decorate([
        Component({
            selector: 'app-show-order-detail',
            templateUrl: 'show-order-detail.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            OperationService,
            EnterpriseService,
            OperationProductService,
            PaymentService,
            NotesService,
            ParameterService])
    ], ShowOrderDetailComponent);
    return ShowOrderDetailComponent;
}());
export { ShowOrderDetailComponent };
//# sourceMappingURL=show-order-detail.component.js.map