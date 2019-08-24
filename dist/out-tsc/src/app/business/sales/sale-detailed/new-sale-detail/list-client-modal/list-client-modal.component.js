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
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { PersonService } from 'src/app/shared/services/person.service';
var ListClientModalComponent = /** @class */ (function () {
    function ListClientModalComponent(personService) {
        this.personService = personService;
        this.selectClient = new EventEmitter();
        this.faCheckCircle = faCheckCircle;
        this.lastkeydown1 = 0;
        this.empty = false;
    }
    ListClientModalComponent.prototype.ngOnInit = function () {
    };
    ListClientModalComponent.prototype.onFindClient = function (filter) {
        var _this = this;
        var nameClient = document.getElementById('name_client').value;
        this.lstClients = [];
        if (nameClient.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.personService.getPersonsByNamesFilter$(nameClient).subscribe(function (lstClients) {
                    _this.lstClients = lstClients;
                    _this.empty = false;
                }, function () { return _this.empty = true; });
            }
        }
    };
    ListClientModalComponent.prototype.onSelectClient = function (person) {
        this.selectClient.emit(person);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ListClientModalComponent.prototype, "lstClients", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListClientModalComponent.prototype, "selectClient", void 0);
    ListClientModalComponent = __decorate([
        Component({
            selector: 'app-list-client-modal',
            templateUrl: 'list-client-modal.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [PersonService])
    ], ListClientModalComponent);
    return ListClientModalComponent;
}());
export { ListClientModalComponent };
//# sourceMappingURL=list-client-modal.component.js.map