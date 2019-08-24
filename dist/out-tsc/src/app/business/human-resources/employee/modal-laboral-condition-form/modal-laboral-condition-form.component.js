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
import { LaboralCondition } from 'src/app/shared/models/laboral-condition';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/shared/services/product.service';
var ModalLaboralConditionFormComponent = /** @class */ (function () {
    function ModalLaboralConditionFormComponent(fb, formToolService, productService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.productService = productService;
        this.faSave = faSave;
        this.update = new EventEmitter();
        this.create = new EventEmitter();
        this.type_salary = environment.salary_type;
        this.type_contract = environment.contract_type;
        this.laboral_period = environment.laboral_period;
        this.lstProducts = [];
        this.lastkeydown1 = 0;
    }
    ModalLaboralConditionFormComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    ModalLaboralConditionFormComponent.prototype.ngOnChanges = function (changes) {
        if (changes.fk_id_enterprise_person) {
            if (changes.fk_id_enterprise_person.currentValue != changes.fk_id_enterprise_person.previousValue) {
                this.fk_id_enterprise_person = changes.fk_id_enterprise_person.currentValue;
                this.initForm();
            }
        }
        if (changes.laboralCondition) {
            if (changes.laboralCondition.currentValue != changes.laboralCondition.previousValue) {
                this.initForm();
            }
        }
    };
    ModalLaboralConditionFormComponent.prototype.initForm = function () {
        this.laboralConditionForm = this.fb.group({
            pk_id_laboral_condition: [this.laboralCondition.pk_id_laboral_condition],
            fk_id_enterprise_person: [this.fk_id_enterprise_person],
            contract_type: [this.laboralCondition.contract_type, Validators.required],
            salary_type: [this.laboralCondition.salary_type, Validators.required],
            salary: [this.laboralCondition.salary],
            period: [this.laboralCondition.period],
            production_unit: [this.laboralCondition.production_unit],
            pk_product_unit: [this.laboralCondition.pk_product_unit],
            value_product_unit: [this.laboralCondition.value_product_unit],
            benefit_health: [this.laboralCondition.benefit_health],
            benefit_pension: [this.laboralCondition.benefit_pension],
            benefit_arl: [this.laboralCondition.benefit_arl],
            benefit_compensation_box: [this.laboralCondition.benefit_compensation_box]
        });
    };
    ModalLaboralConditionFormComponent.prototype.onFindProduct = function (filter) {
        var _this = this;
        var nameProduct = document.getElementById('filterProduct').value;
        this.lstProducts = [];
        if (nameProduct.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.productService.getNotSalesProductsByNameFilter$(nameProduct).subscribe(function (lstProducts) {
                    _this.lstProducts = lstProducts;
                });
            }
        }
    };
    ModalLaboralConditionFormComponent.prototype.selectProduct = function (product) {
        this.lstProducts = [];
        this.laboralConditionForm.patchValue({
            production_unit: product.name,
            pk_product_unit: product.pk_id_product,
        });
    };
    ModalLaboralConditionFormComponent.prototype.updateLaboralCondition = function () {
        this.update.emit(this.laboralConditionForm.value);
    };
    ModalLaboralConditionFormComponent.prototype.createLaboralCondition = function () {
        this.create.emit(this.laboralConditionForm.value);
    };
    /**
    * Funciones para verificar si los formularios son obligatorios o no.
    */
    ModalLaboralConditionFormComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.laboralConditionForm, controlName);
    };
    ModalLaboralConditionFormComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.laboralConditionForm, controlName);
    };
    ModalLaboralConditionFormComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.laboralConditionForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ModalLaboralConditionFormComponent.prototype, "fk_id_enterprise_person", void 0);
    __decorate([
        Input(),
        __metadata("design:type", LaboralCondition)
    ], ModalLaboralConditionFormComponent.prototype, "laboralCondition", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ModalLaboralConditionFormComponent.prototype, "laboralConditionParametersList", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalLaboralConditionFormComponent.prototype, "update", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalLaboralConditionFormComponent.prototype, "create", void 0);
    ModalLaboralConditionFormComponent = __decorate([
        Component({
            selector: 'app-modal-laboral-condition-form',
            templateUrl: 'modal-laboral-condition-form.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService,
            ProductService])
    ], ModalLaboralConditionFormComponent);
    return ModalLaboralConditionFormComponent;
}());
export { ModalLaboralConditionFormComponent };
//# sourceMappingURL=modal-laboral-condition-form.component.js.map