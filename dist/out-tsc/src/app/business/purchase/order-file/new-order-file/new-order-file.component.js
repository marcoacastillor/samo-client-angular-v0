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
import { FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import * as XLSX from 'xlsx';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Operation } from 'src/app/shared/models/operation';
import { environment } from 'src/environments/environment';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { faEyeDropper, faEye } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
var NewOrderFileComponent = /** @class */ (function () {
    function NewOrderFileComponent(fb, formToolService, utilService, globalStoreService, parameterService, operationService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.utilService = utilService;
        this.globalStoreService = globalStoreService;
        this.parameterService = parameterService;
        this.operationService = operationService;
        this.faEyeDropper = faEyeDropper;
        this.faEye = faEye;
        this.lstParams = [];
        this.success = false;
        this.message = '';
        this.operation = new Operation;
    }
    NewOrderFileComponent.prototype.ngOnInit = function () {
        this.operation.products_list = [];
        this.loadDataPurchase();
        this.initUpdForm();
        this.loadParamsOrders();
    };
    NewOrderFileComponent.prototype.loadParamsOrders = function () {
        var _this = this;
        this.parameterService.getByCodeCategory$(environment.type_payment).subscribe(function (params) { return _this.lstParams = params; });
    };
    NewOrderFileComponent.prototype.onCreate = function (operation) {
        var _this = this;
        this.operationService.storeOperation$(this.operation).subscribe(function (operation) {
            _this.pk_id_operation = operation.pk_id_operation;
            _this.success = true;
            _this.message = 'Se realizó la creación de la factura con éxito.';
        });
    };
    NewOrderFileComponent.prototype.loadDataPurchase = function () {
        var user = this.globalStoreService.getUser();
        this.operation.fk_id_person = user.fk_id_person;
        this.operation.operation_type = environment.type_operation_purchase;
        this.operation.state_operation = environment.state_payment_purchase;
        this.operation.total_operation = 0;
        this.operation.total_tax = 0;
        this.operation.total_discounts = 0;
        this.operation.total_discounts = 0;
        this.operation.date_operation = moment().format('YYYY-MM-DD');
        this.operation.total_pays = 0;
    };
    NewOrderFileComponent.prototype.initUpdForm = function () {
        this.purchaseFileForm = this.fb.group({
            file_ref_purchase: ['', Validators.required],
            file_purchase: [null],
        });
    };
    NewOrderFileComponent.prototype.onFileSelected = function (event) {
        var _this = this;
        if (event.target.files && event.target.files.length) {
            /* wire up file reader */
            var target = (event.target);
            if (target.files.length !== 1)
                throw new Error('No puede usar multiples archivos');
            var reader = new FileReader();
            reader.onload = function (e) {
                /* read workbook */
                var bstr = e.target.result;
                var wb = XLSX.read(bstr, { type: 'binary' });
                /* grab first sheet */
                var wsname = wb.SheetNames[0];
                var ws = wb.Sheets[wsname];
                /* save data */
                _this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
            };
            reader.readAsBinaryString(target.files[0]);
        }
    };
    NewOrderFileComponent.prototype.getClassHeaderTable = function (selected) {
        return this.utilService.getClassHeaderTable(selected);
    };
    NewOrderFileComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.purchaseFileForm, controlName);
    };
    NewOrderFileComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.purchaseFileForm, controlName);
    };
    NewOrderFileComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.purchaseFileForm, controlName, errorCode);
    };
    NewOrderFileComponent = __decorate([
        Component({
            selector: 'app-new-order-file',
            templateUrl: 'new-order-file.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService,
            UtilsService,
            GlobalStoreService,
            ParameterService,
            OperationService])
    ], NewOrderFileComponent);
    return NewOrderFileComponent;
}());
export { NewOrderFileComponent };
//# sourceMappingURL=new-order-file.component.js.map