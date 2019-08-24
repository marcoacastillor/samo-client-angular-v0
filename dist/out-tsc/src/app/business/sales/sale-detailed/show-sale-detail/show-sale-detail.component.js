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
import { faThList, faFileInvoiceDollar, faCartArrowDown, faDonate, faEdit, faLock, faPrint, faPlus, faDollarSign, faUndo, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Operation } from 'src/app/shared/models/operation';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { OperationService } from 'src/app/shared/services/operation.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { OperationProductService } from 'src/app/shared/services/operation-product.service';
import { NotesService } from 'src/app/shared/services/notes.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { tap } from 'rxjs/operators';
import { PersonService } from 'src/app/shared/services/person.service';
import { Person } from 'src/app/shared/models/person';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { Enterprise } from 'src/app/shared/models/enterprise';
var ShowSaleDetailComponent = /** @class */ (function () {
    function ShowSaleDetailComponent(activateRoute, operationService, personService, operationProductService, paymentService, noteService, parameterService, enterpriseService) {
        this.activateRoute = activateRoute;
        this.operationService = operationService;
        this.personService = personService;
        this.operationProductService = operationProductService;
        this.paymentService = paymentService;
        this.noteService = noteService;
        this.parameterService = parameterService;
        this.enterpriseService = enterpriseService;
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
        this.person = new Person();
        this.enterprise = new Enterprise();
        this.lstParams = [];
        this.individual = environment.individual;
        this.type_payment = environment.type_payment;
        this.taxes = environment.tax_purchase;
        this.block = environment.state_block;
        this.categories = { 'categories': [this.type_payment, this.taxes] };
        this.success = false;
        this.message = '';
        this.url_storage = environment.url_sales_storage;
        this.path = '';
    }
    ShowSaleDetailComponent.prototype.ngOnInit = function () {
        this.id_operation = this.activateRoute.snapshot.params['id'];
        this.getOperationDetail(this.id_operation);
    };
    ShowSaleDetailComponent.prototype.getOperationDetail = function (id) {
        var _this = this;
        this.operationService.getDetailOperation$(Number(id)).pipe(tap(function (operation) {
            _this.operation = operation;
        }), tap(function (operation) {
            _this.personService.showByExternalReference$(operation.external_reference).subscribe(function (person) { return _this.person = person; });
        }), tap(function (operation) {
            _this.enterpriseService.show$(operation.fk_id_enterprise).subscribe(function (enterprise) { return _this.enterprise = enterprise; });
        }), tap(function (operation) {
            _this.operationProductService.getProductsByOperation$(operation.pk_id_operation).subscribe(function (lstProducts) { return _this.lstProducts = lstProducts; });
        }), tap(function (operation) {
            _this.paymentService.getPaymentsByOperation$(operation.pk_id_operation).subscribe(function (lstPayments) { return _this.lstPayments = lstPayments; });
        }), tap(function (operation) {
            _this.noteService.getNotesByOperation$(operation.pk_id_operation).subscribe(function (lstNotes) { return _this.lstNotes = lstNotes; });
        })).subscribe();
    };
    ShowSaleDetailComponent.prototype.getMultipleParams = function () {
        var _this = this;
        this.parameterService.getByMultipleCodeCategory$(this.categories).subscribe(function (lstParams) { return _this.lstParams = lstParams; });
    };
    ShowSaleDetailComponent.prototype.onUpdateOperation = function (operation) {
        var _this = this;
        this.operationService.updateOperation$(operation).subscribe(function (operation) {
            _this.getOperationDetail(operation.pk_id_operation.toString());
            _this.success = true;
            _this.message = 'Se actualizó la operación correctamente.';
        });
    };
    ShowSaleDetailComponent.prototype.onAddProduct = function (product) {
        var _this = this;
        this.operationProductService.store$(product).subscribe(function (operationProduct) {
            _this.getOperationDetail(operationProduct.fk_id_operation.toString());
            _this.success = true;
            _this.message = 'Se agregó producto correctamente.';
        });
    };
    ShowSaleDetailComponent.prototype.delProduct = function (id) {
        var _this = this;
        this.operationProductService.delete$(id).subscribe(function (operationProduct) {
            _this.getOperationDetail(operationProduct.fk_id_operation.toString());
            _this.success = true;
            _this.message = 'Se eliminó producto correctamente.';
        });
    };
    ShowSaleDetailComponent.prototype.onAddPayment = function (payment) {
        var _this = this;
        this.paymentService.store$(payment).subscribe(function (payment) {
            _this.getOperationDetail(payment.fk_id_operation.toString());
            _this.success = true;
            _this.message = 'Se agregó un pago correctamente.';
        });
    };
    ShowSaleDetailComponent.prototype.delPayment = function (id) {
        var _this = this;
        this.paymentService.delete$(id).subscribe(function (payment) {
            _this.getOperationDetail(payment.fk_id_operation.toString());
            _this.success = true;
            _this.message = 'Se eliminó un pago correctamente.';
        });
    };
    ShowSaleDetailComponent.prototype.blockInvoice = function () {
        var _this = this;
        this.operationService.changeState$(this.operation.pk_id_operation, environment.state_block).subscribe(function (operation) {
            _this.getOperationDetail(operation.pk_id_operation.toString());
            _this.success = true;
            _this.message = 'Se bloquea la factura.';
        });
    };
    ShowSaleDetailComponent.prototype.printOperation = function () {
        var _this = this;
        this.operationService.getOperationPDF$(this.operation.pk_id_operation).pipe(tap(function (path) {
            var configuracion_ventana = "menubar=no,width=800,height=1200,location=yes,resizable=yes,scrollbars=yes,status=yes";
            var w = window.open(_this.url_storage + path, "_blank", configuracion_ventana);
            //w.focus();
            //w.print();
            //w.close();     
        })).subscribe();
    };
    ShowSaleDetailComponent = __decorate([
        Component({
            selector: 'app-show-sale-detail',
            templateUrl: 'show-sale-detail.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            OperationService,
            PersonService,
            OperationProductService,
            PaymentService,
            NotesService,
            ParameterService,
            EnterpriseService])
    ], ShowSaleDetailComponent);
    return ShowSaleDetailComponent;
}());
export { ShowSaleDetailComponent };
//# sourceMappingURL=show-sale-detail.component.js.map