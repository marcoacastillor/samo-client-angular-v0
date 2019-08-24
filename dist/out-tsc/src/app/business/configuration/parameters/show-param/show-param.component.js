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
import { Category } from 'src/app/shared/models/category';
import { faTrashAlt, faEdit, faPlusCircle, faEye, faThList } from '@fortawesome/free-solid-svg-icons';
import { Parameter } from 'src/app/shared/models/parameter';
import { environment } from 'src/environments/environment';
var ShowParamComponent = /** @class */ (function () {
    function ShowParamComponent() {
        this.url_storage = environment.url_storage;
        this.faEye = faEye;
        this.faTrashAlt = faTrashAlt;
        this.faEdit = faEdit;
        this.faPlusCircle = faPlusCircle;
        this.faThList = faThList;
        this.create = new EventEmitter();
        this.update = new EventEmitter();
        this.cancel = new EventEmitter();
        this.delete = new EventEmitter();
        this.select = new EventEmitter();
    }
    ShowParamComponent.prototype.ngOnInit = function () {
    };
    ShowParamComponent.prototype.onCreate = function (parameter) {
        parameter.fk_id_category = this.category.pk_id_category;
        this.create.emit(parameter);
    };
    ShowParamComponent.prototype.onUpdate = function (parameter) {
        this.update.emit(parameter);
    };
    ShowParamComponent.prototype.onCancel = function (param) {
        this.cancel.emit(param);
    };
    ShowParamComponent.prototype.newParameter = function () {
        var param = new Parameter;
        this.select.emit(param);
    };
    ShowParamComponent.prototype.updParameter = function (param) {
        this.select.emit(param);
    };
    ShowParamComponent.prototype.delParameter = function (id_param) {
        this.delete.emit(id_param);
    };
    __decorate([
        Input(),
        __metadata("design:type", Category)
    ], ShowParamComponent.prototype, "category", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Parameter)
    ], ShowParamComponent.prototype, "parameter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ShowParamComponent.prototype, "create", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ShowParamComponent.prototype, "update", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ShowParamComponent.prototype, "cancel", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ShowParamComponent.prototype, "delete", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ShowParamComponent.prototype, "select", void 0);
    ShowParamComponent = __decorate([
        Component({
            selector: 'app-show-param',
            templateUrl: 'show-param.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], ShowParamComponent);
    return ShowParamComponent;
}());
export { ShowParamComponent };
//# sourceMappingURL=show-param.component.js.map