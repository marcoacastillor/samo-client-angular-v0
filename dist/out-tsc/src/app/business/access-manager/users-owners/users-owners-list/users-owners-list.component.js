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
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { RolService } from 'src/app/shared/services/rol.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { environment } from 'src/environments/environment';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
var UsersOwnersListComponent = /** @class */ (function () {
    function UsersOwnersListComponent(userService, rolService, personService, parameterService, enterpriseService, globalStoreService) {
        this.userService = userService;
        this.rolService = rolService;
        this.personService = personService;
        this.parameterService = parameterService;
        this.enterpriseService = enterpriseService;
        this.globalStoreService = globalStoreService;
        this.faPlusCircle = faPlusCircle;
        this.faEye = faEye;
        this.faEdit = faEdit;
        this.faTrash = faTrash;
        this.lstUsers = [];
        this.selectedUser = new User;
        this.lstRoles = [];
        this.lstPersons = [];
        this.lstParameters = [];
        this.lstEnterprise = [];
        this.userActive = new User;
        this.success = false;
        this.message = '';
    }
    UsersOwnersListComponent.prototype.ngOnInit = function () {
        this.userActive = this.globalStoreService.getUser();
        this.loadUsersByEnterprise(this.userActive.fk_id_enterprise);
    };
    UsersOwnersListComponent.prototype.loadParameters = function () {
        var _this = this;
        this.rolService.getAllNotSuperadmin$().subscribe(function (lst_roles) { return _this.lstRoles = lst_roles; });
        this.parameterService.getByCodeCategory$(environment.state_user).subscribe(function (lst_parameter) { return _this.lstParameters = lst_parameter; });
        this.enterpriseService.getAllByType$(environment.enterprise_owner).subscribe(function (lst_enterprise) { return _this.lstEnterprise = lst_enterprise; });
    };
    UsersOwnersListComponent.prototype.getEmployees = function (id_enterprise) {
        var _this = this;
        this.personService.getEmployeesByEnterprise$(id_enterprise).subscribe(function (persons) { return _this.lstPersons = persons; });
    };
    UsersOwnersListComponent.prototype.loadUsersByEnterprise = function (id) {
        var _this = this;
        this.userService.getUserByEnteprise$(id).subscribe(function (users) { return _this.lstUsers = users; });
    };
    UsersOwnersListComponent.prototype.newUser = function () {
        this.selectedUser = new User;
        this.selectedUser.fk_id_enterprise = this.userActive.fk_id_enterprise;
    };
    UsersOwnersListComponent.prototype.selectUser = function (user) {
        this.selectedUser = user;
    };
    UsersOwnersListComponent.prototype.deleteUser = function () {
        var _this = this;
        this.userService.delete$(this.selectedUser.pk_id_user).subscribe(function () {
            _this.loadUsersByEnterprise(_this.userActive.fk_id_enterprise);
            _this.success = true;
            _this.message = 'Se elimina registro satisfactoriamente.';
        });
    };
    UsersOwnersListComponent.prototype.onCreate = function (user) {
        var _this = this;
        this.userService.store$(user).subscribe(function () {
            _this.loadUsersByEnterprise(_this.userActive.fk_id_enterprise);
            _this.success = true;
            _this.message = 'Se crea registro satisfactoriamente.';
        });
    };
    UsersOwnersListComponent.prototype.onUpdate = function (user) {
        var _this = this;
        this.userService.update$(user).subscribe(function () {
            _this.loadUsersByEnterprise(_this.userActive.fk_id_enterprise);
            _this.success = true;
            _this.message = 'Se actualiza registro satisfactoriamente.';
        });
    };
    UsersOwnersListComponent = __decorate([
        Component({
            selector: 'app-users-owners-list',
            templateUrl: 'users-owners-list.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [UserService,
            RolService,
            PersonService,
            ParameterService,
            EnterpriseService,
            GlobalStoreService])
    ], UsersOwnersListComponent);
    return UsersOwnersListComponent;
}());
export { UsersOwnersListComponent };
//# sourceMappingURL=users-owners-list.component.js.map