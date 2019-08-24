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
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { WorkerNews } from 'src/app/shared/models/worker-news';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { environment } from 'src/environments/environment';
var ModalWorkerNewFormComponent = /** @class */ (function () {
    function ModalWorkerNewFormComponent(fb, formToolService) {
        this.fb = fb;
        this.formToolService = formToolService;
        this.faSave = faSave;
        this.type_worker_new = environment.type_worker_new;
        this.create = new EventEmitter();
        this.update = new EventEmitter();
    }
    ModalWorkerNewFormComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    ModalWorkerNewFormComponent.prototype.ngOnChanges = function (changes) {
        if (changes.fk_id_enterprise_person) {
            if (changes.fk_id_enterprise_person.currentValue != changes.fk_id_enterprise_person.previousValue) {
                this.initForm();
            }
        }
        if (changes.selectedWorkerNew) {
            if (changes.selectedWorkerNew.currentValue != changes.selectedWorkerNew.previousValue) {
                this.selectedWorkerNew = changes.selectedWorkerNew.currentValue;
                this.initForm();
            }
        }
    };
    ModalWorkerNewFormComponent.prototype.initForm = function () {
        this.workerNewForm = this.fb.group({
            pk_id_worker_news: [this.selectedWorkerNew.pk_id_worker_news],
            fk_id_enterprise_person: [this.fk_id_enterprise_person, Validators.required],
            type_new: [this.selectedWorkerNew.type_new, Validators.required],
            description_new: [this.selectedWorkerNew.description_new, Validators.required],
            date_new: [],
            value_new: [this.selectedWorkerNew.value_new, Validators.required]
        });
    };
    ModalWorkerNewFormComponent.prototype.createNorkerNew = function () {
        this.create.emit(this.workerNewForm.value);
    };
    ModalWorkerNewFormComponent.prototype.updateNorkerNew = function () {
        this.update.emit(this.workerNewForm.value);
    };
    /**
    * Funciones para verificar si los formularios son obligatorios o no.
    */
    ModalWorkerNewFormComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.workerNewForm, controlName);
    };
    ModalWorkerNewFormComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.workerNewForm, controlName);
    };
    ModalWorkerNewFormComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.workerNewForm, controlName, errorCode);
    };
    __decorate([
        Input(),
        __metadata("design:type", WorkerNews)
    ], ModalWorkerNewFormComponent.prototype, "fk_id_enterprise_person", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ModalWorkerNewFormComponent.prototype, "workerNewsParameterList", void 0);
    __decorate([
        Input(),
        __metadata("design:type", WorkerNews)
    ], ModalWorkerNewFormComponent.prototype, "selectedWorkerNew", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalWorkerNewFormComponent.prototype, "create", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModalWorkerNewFormComponent.prototype, "update", void 0);
    ModalWorkerNewFormComponent = __decorate([
        Component({
            selector: 'app-modal-worker-new-form',
            templateUrl: 'modal-worker-new-form.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [FormBuilder,
            FormToolsService])
    ], ModalWorkerNewFormComponent);
    return ModalWorkerNewFormComponent;
}());
export { ModalWorkerNewFormComponent };
//# sourceMappingURL=modal-worker-new-form.component.js.map