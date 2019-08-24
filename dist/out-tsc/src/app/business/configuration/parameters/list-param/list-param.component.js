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
import { faEye, faTrashAlt, faEdit, faBan, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
var ListParamComponent = /** @class */ (function () {
    function ListParamComponent() {
        this.faEye = faEye;
        this.faTrashAlt = faTrashAlt;
        this.faEdit = faEdit;
        this.fasFaBan = faBan;
        this.faPlusCircle = faPlusCircle;
        this.updateCategory = new EventEmitter();
        this.deleteCategory = new EventEmitter();
        this.viewCategory = new EventEmitter();
    }
    ListParamComponent.prototype.ngOnInit = function () {
    };
    ListParamComponent.prototype.crtCategory = function () {
        this.updateCategory.emit(new Category);
    };
    ListParamComponent.prototype.updCategory = function (category) {
        this.updateCategory.emit(category);
    };
    ListParamComponent.prototype.delCategory = function (id) {
        this.deleteCategory.emit(id);
    };
    ListParamComponent.prototype.showCategory = function (pk_id_category) {
        this.viewCategory.emit(pk_id_category);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ListParamComponent.prototype, "categoryList", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListParamComponent.prototype, "updateCategory", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListParamComponent.prototype, "deleteCategory", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListParamComponent.prototype, "viewCategory", void 0);
    ListParamComponent = __decorate([
        Component({
            selector: 'app-list-param',
            templateUrl: 'list-param.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], ListParamComponent);
    return ListParamComponent;
}());
export { ListParamComponent };
//# sourceMappingURL=list-param.component.js.map