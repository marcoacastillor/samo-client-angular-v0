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
import { faPlusCircle, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Rol } from 'src/app/shared/models/rol';
import { RolService } from 'src/app/shared/services/rol.service';
var RolsListComponent = /** @class */ (function () {
    function RolsListComponent(rolService) {
        this.rolService = rolService;
        this.faPlusCircle = faPlusCircle;
        this.faEye = faEye;
        this.faEdit = faEdit;
        this.faTrash = faTrash;
        this.lstRols = [];
        this.selectedRol = new Rol;
        this.success = false;
        this.message = '';
    }
    RolsListComponent.prototype.ngOnInit = function () {
        this.loadAllRols();
    };
    RolsListComponent.prototype.loadAllRols = function () {
        var _this = this;
        this.rolService.getAll$().subscribe(function (rols) { return _this.lstRols = rols; });
    };
    RolsListComponent.prototype.newRol = function () {
        this.selectedRol = new Rol;
    };
    RolsListComponent.prototype.selectRol = function (rol) {
        this.selectedRol = rol;
    };
    RolsListComponent.prototype.deleteRol = function () {
        var _this = this;
        this.rolService.delete$(this.selectedRol.pk_id_rol).subscribe(function () {
            _this.loadAllRols();
            _this.success = true;
            _this.message = 'Se elimina registro satisfactoriamente.';
        });
    };
    RolsListComponent.prototype.onCreate = function (rol) {
        var _this = this;
        this.rolService.store$(rol).subscribe(function () {
            _this.loadAllRols();
            _this.success = true;
            _this.message = 'Se crea registro satisfactoriamente.';
        });
    };
    RolsListComponent.prototype.onUpdate = function (rol) {
        var _this = this;
        this.rolService.update$(rol).subscribe(function () {
            _this.loadAllRols();
            _this.success = true;
            _this.message = 'Se actualiza registro satisfactoriamente.';
        });
    };
    RolsListComponent = __decorate([
        Component({
            selector: 'app-rols-list',
            templateUrl: 'rols-list.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [RolService])
    ], RolsListComponent);
    return RolsListComponent;
}());
export { RolsListComponent };
//# sourceMappingURL=rols-list.component.js.map