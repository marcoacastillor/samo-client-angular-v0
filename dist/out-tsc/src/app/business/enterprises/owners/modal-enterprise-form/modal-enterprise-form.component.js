var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { environment } from 'src/environments/environment';
var ModalEnterpriseFormComponent = /** @class */ (function () {
    function ModalEnterpriseFormComponent(fb, formToolService, cd) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.cd = cd;
        this.faSave = faSave;
        this.create = new EventEmitter();
        this.update = new EventEmitter();
        this.regimen = environment.regimen;
        this.sizes = environment.size_enterprise;
    }
    ModalEnterpriseFormComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    ModalEnterpriseFormComponent.prototype.ngOnChanges = function (changes) {
        if (changes.enterprise) {
            if (changes.enterprise.currentValue != changes.enterprise.previousValue) {
                this.initForm();
            }
        }
    };
    ModalEnterpriseFormComponent.prototype.initForm = function () {
        this.enterpriseForm = this.fb.group({
            pk_id_enterprise: [this.enterprise.pk_id_enterprise],
            type: [environment.enterprise_owner],
            nit: [this.enterprise.nit, Validators.required],
            name: [this.enterprise.name, Validators.required],
            last_names: [this.enterprise.last_names],
            address: [this.enterprise.address],
            phone: [this.enterprise.phone],
            ubication_city: [this.enterprise.ubication_city, Validators.required],
            regimen: [this.enterprise.regimen],
            DIAN_billing_resolution: [this.enterprise.DIAN_billing_resolution],
            footer_billing: [this.enterprise.footer_billing],
            size: [this.enterprise.size],
            email: [this.enterprise.email, Validators.email],
            url_logo: [this.enterprise.url_logo],
            url_image: ['']
        });
    };
    ModalEnterpriseFormComponent.prototype.onFileSelected = function (event) {
        var _this = this;
        var reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            var image = event.target.files[0];
            reader.readAsDataURL(image);
            reader.onload = function () {
                _this.enterpriseForm.patchValue({
                    url_logo: reader.result
                });
                // need to run CD since file load runs outside of zone
                _this.cd.markForCheck();
            };
        }
    };
    ModalEnterpriseFormComponent.prototype.createEnterprise = function () {
        this.create.emit(this.enterpriseForm.value);
    };
    ModalEnterpriseFormComponent.prototype.updateEnterprise = function () {
        this.update.emit(this.enterpriseForm.value);
    };
    /**
    * Funciones para verificar si los formularios son obligatorios o no.
    */
    ModalEnterpriseFormComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.enterpriseForm, controlName);
    };
    ModalEnterpriseFormComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.enterpriseForm, controlName);
    };
    ModalEnterpriseFormComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.enterpriseForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", Enterprise)
    ], ModalEnterpriseFormComponent.prototype, "enterprise", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ModalEnterpriseFormComponent.prototype, "parameterList", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalEnterpriseFormComponent.prototype, "create", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalEnterpriseFormComponent.prototype, "update", void 0);
    ModalEnterpriseFormComponent = __decorate([
        Component({
            selector: 'app-modal-enterprise-form',
            templateUrl: 'modal-enterprise-form.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService,
            ChangeDetectorRef])
    ], ModalEnterpriseFormComponent);
    return ModalEnterpriseFormComponent;
}());
export { ModalEnterpriseFormComponent };
//# sourceMappingURL=modal-enterprise-form.component.js.map