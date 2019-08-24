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
import { faThList, faEye } from '@fortawesome/free-solid-svg-icons';
import { Person } from 'src/app/shared/models/person';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/shared/services/person.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { tap } from 'rxjs/operators';
import { PreferenceClient } from 'src/app/shared/models/preference-client';
import { PreferenceClientService } from 'src/app/shared/services/preference-client.service';
var ClientShowComponent = /** @class */ (function () {
    function ClientShowComponent(activateRoute, personService, operationService, preferenceClientService) {
        this.activateRoute = activateRoute;
        this.personService = personService;
        this.operationService = operationService;
        this.preferenceClientService = preferenceClientService;
        this.faThList = faThList;
        this.faEye = faEye;
        this.person = new Person;
        this.preferenceClient = new PreferenceClient;
        this.lstOperations = [];
    }
    ClientShowComponent.prototype.ngOnInit = function () {
        this.id_person = this.activateRoute.snapshot.params['id'];
        this.getDetailClient(this.id_person);
    };
    ClientShowComponent.prototype.getDetailClient = function (id) {
        var _this = this;
        this.personService.show$(id).pipe(tap(function (person) { return _this.person = person; }), tap(function (person) {
            _this.preferenceClientService.getByPerson$(person.pk_id_person).subscribe(function (preference_client) { return _this.preferenceClient = preference_client; });
        }), tap(function (person) {
            _this.operationService.getOperationByClient$(person.pk_id_person).subscribe(function (operations) { return _this.lstOperations = operations; });
        })).subscribe();
    };
    ClientShowComponent = __decorate([
        Component({
            selector: 'app-client-show',
            templateUrl: 'client-show.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            PersonService,
            OperationService,
            PreferenceClientService])
    ], ClientShowComponent);
    return ClientShowComponent;
}());
export { ClientShowComponent };
//# sourceMappingURL=client-show.component.js.map