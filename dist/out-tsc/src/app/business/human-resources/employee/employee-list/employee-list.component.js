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
import { faPlusCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { PersonService } from 'src/app/shared/services/person.service';
var EmployeeListComponent = /** @class */ (function () {
    function EmployeeListComponent(globalStoreService, personService) {
        this.globalStoreService = globalStoreService;
        this.personService = personService;
        this.faPlusCircle = faPlusCircle;
        this.faEye = faEye;
        this.lstClients = [];
        this.activeUser = new User;
    }
    EmployeeListComponent.prototype.ngOnInit = function () {
        this.activeUser = this.globalStoreService.getUser();
        this.loadAllClients(this.activeUser.fk_id_enterprise);
    };
    EmployeeListComponent.prototype.loadAllClients = function (id_enterprise) {
        var _this = this;
        this.personService.getEmployeesByEnterprise$(id_enterprise).subscribe(function (lstClients) { return _this.lstClients = lstClients; });
    };
    EmployeeListComponent = __decorate([
        Component({
            selector: 'app-employee-list',
            templateUrl: 'employee-list.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [GlobalStoreService,
            PersonService])
    ], EmployeeListComponent);
    return EmployeeListComponent;
}());
export { EmployeeListComponent };
//# sourceMappingURL=employee-list.component.js.map