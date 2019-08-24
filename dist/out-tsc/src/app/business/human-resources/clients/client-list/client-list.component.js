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
import { faPlusCircle, faEye, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/shared/services/person.service';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
var ClientListComponent = /** @class */ (function () {
    function ClientListComponent(globalStoreService, personService) {
        this.globalStoreService = globalStoreService;
        this.personService = personService;
        this.faPlusCircle = faPlusCircle;
        this.faEye = faEye;
        this.faTrash = faTrash;
        this.faEdit = faEdit;
        this.person = new Person;
        this.lstClients = [];
        this.activeUser = new User;
        this.success = false;
        this.message = '';
    }
    ClientListComponent.prototype.ngOnInit = function () {
        this.activeUser = this.globalStoreService.getUser();
        this.loadAllClients(this.activeUser.fk_id_enterprise);
    };
    ClientListComponent.prototype.loadAllClients = function (id_enterprise) {
        var _this = this;
        this.personService.getClientsByEnterprise$(id_enterprise).subscribe(function (lstClients) { return _this.lstClients = lstClients; });
    };
    ClientListComponent.prototype.selectPerson = function (person) {
        this.person = person;
    };
    ClientListComponent.prototype.deleteClient = function () {
        var _this = this;
        this.personService.deleteClient$(this.person.pk_id_person).subscribe(function () {
            _this.success = true;
            _this.message = 'Se eliminó correctamente el cliente';
            _this.loadAllClients(_this.activeUser.fk_id_enterprise);
        });
    };
    ClientListComponent = __decorate([
        Component({
            selector: 'app-client-list',
            templateUrl: 'client-list.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [GlobalStoreService,
            PersonService])
    ], ClientListComponent);
    return ClientListComponent;
}());
export { ClientListComponent };
//# sourceMappingURL=client-list.component.js.map