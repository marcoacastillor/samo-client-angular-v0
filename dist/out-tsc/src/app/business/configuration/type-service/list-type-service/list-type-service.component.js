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
import { faEye, faTrashAlt, faEdit, faBan, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { TypeService } from 'src/app/shared/models/type-service';
var ListTypeServiceComponent = /** @class */ (function () {
    function ListTypeServiceComponent() {
        this.faEye = faEye;
        this.faTrashAlt = faTrashAlt;
        this.faEdit = faEdit;
        this.fasFaBan = faBan;
        this.faPlusCircle = faPlusCircle;
        this.delete = new EventEmitter();
        this.load = new EventEmitter();
    }
    ListTypeServiceComponent.prototype.ngOnInit = function () {
    };
    ListTypeServiceComponent.prototype.deleteTypeService = function (id) {
        this.delete.emit(id);
    };
    ListTypeServiceComponent.prototype.loadTypeService = function (typeService) {
        this.load.emit(typeService);
    };
    ListTypeServiceComponent.prototype.newTypeService = function () {
        var typeService = new TypeService;
        this.load.emit(typeService);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ListTypeServiceComponent.prototype, "typeServiceList", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListTypeServiceComponent.prototype, "delete", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListTypeServiceComponent.prototype, "load", void 0);
    ListTypeServiceComponent = __decorate([
        Component({
            selector: 'app-list-type-service',
            templateUrl: 'list-type-service.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], ListTypeServiceComponent);
    return ListTypeServiceComponent;
}());
export { ListTypeServiceComponent };
//# sourceMappingURL=list-type-service.component.js.map