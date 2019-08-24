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
import { FormBuilder, Validators } from '@angular/forms';
import { faThList, faSave, faCalendar, faEye } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/shared/models/person';
import { PreferenceClientService } from 'src/app/shared/services/preference-client.service';
import { PreferenceClient } from 'src/app/shared/models/preference-client';
var ClientFormComponent = /** @class */ (function () {
    function ClientFormComponent(activateRoute, fb, globalStoreService, parameterService, formToolService, personService, preferenceClientService) {
        this.activateRoute = activateRoute;
        this.fb = fb;
        this.globalStoreService = globalStoreService;
        this.parameterService = parameterService;
        this.formToolService = formToolService;
        this.personService = personService;
        this.preferenceClientService = preferenceClientService;
        this.person = new Person;
        this.preferenceClient = new PreferenceClient;
        this.faThList = faThList;
        this.faSave = faSave;
        this.faCalendar = faCalendar;
        this.faEye = faEye;
        //cargar parámetros para la creación del empleado
        //tipos de id; tipos de salario; tipo de contrato; porcentajes parafiscales
        this.type_id = environment.type_ids;
        this.type_salary = environment.salary_type;
        this.type_contract = environment.contract_type;
        this.categories = { 'categories': [this.type_id, this.type_salary, this.type_contract] };
        this.activeUser = new User;
        this.parametersList = [];
        this.success = false;
        this.message = '';
        this.id_person = '';
        this.initForm();
    }
    ClientFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeUser = this.globalStoreService.getUser();
        this.id_person = this.activateRoute.snapshot.params['id'];
        if (this.id_person == 'new') {
            this.person = new Person;
        }
        else {
            this.personService.show$(parseInt(this.id_person)).pipe(tap(function (person) {
                _this.person = person;
            }), tap(function (person) {
                _this.preferenceClientService.getByPerson$(person.pk_id_person).subscribe(function (preferece_client) {
                    _this.preferenceClient = preferece_client;
                    _this.initForm();
                });
            })).subscribe();
        }
        this.loadParameters();
    };
    ClientFormComponent.prototype.loadParameters = function () {
        var _this = this;
        this.parameterService.getByMultipleCodeCategory$(this.categories).pipe(tap(function (parametersLst) {
            _this.parametersList = parametersLst;
        })).subscribe();
    };
    ClientFormComponent.prototype.initForm = function () {
        this.clientForm = this.fb.group({
            pk_id_person: [this.person.pk_id_person],
            type_id: [this.person.type_id, Validators.required],
            number_id: [this.person.number_id, Validators.required],
            names: [this.person.names, Validators.required],
            last_names: [this.person.last_names, Validators.required],
            address: [this.person.address, Validators.required],
            phone: [this.person.phone, Validators.required],
            preference_client: this.fb.group({
                pk_id_preference: [this.preferenceClient.pk_id_preference],
                fk_id_person: [this.preferenceClient.fk_id_person],
                score: [this.preferenceClient.score],
                max_discount: [this.preferenceClient.max_discount]
            }),
        });
    };
    ClientFormComponent.prototype.saveClient = function () {
        var _this = this;
        this.personService.createPerson$(this.clientForm.value).pipe(tap(function (person) {
            _this.clientForm.get('preference_client').patchValue({
                fk_id_person: person.pk_id_person
            });
            _this.preferenceClientService.create$(_this.clientForm.get('preference_client').value).subscribe(function (preference_client) { return _this.preferenceClient = preference_client; });
        }), tap(function () {
            _this.success = true;
            _this.message = 'Se crea correctamente el empleado';
            _this.clientForm.reset();
        })).subscribe();
    };
    ClientFormComponent.prototype.updateClient = function () {
        var _this = this;
        this.personService.updateClient$(this.clientForm.value).pipe(tap(function () {
            _this.preferenceClientService.update$(_this.clientForm.get('preference_client').value).subscribe(function (preference_client) { return _this.preferenceClient = preference_client; });
        }), tap(function () {
            _this.success = true;
            _this.message = 'Se actualiza correctamente el empleado';
        })).subscribe();
    };
    /**
    * Funciones para verificar si los formularios son obligatorios o no.
    */
    ClientFormComponent.prototype.getErrorsChild = function (controlName, child) {
        return this.formToolService.getErrorsChild(this.clientForm, controlName, child);
    };
    ClientFormComponent.prototype.mustShowErrorChild = function (controlName, child) {
        return this.formToolService.mustShowErrorChild(this.clientForm, controlName, child);
    };
    ClientFormComponent.prototype.getErrors = function (controlName) {
        return this.formToolService.getErrors(this.clientForm, controlName);
    };
    ClientFormComponent.prototype.mustShowError = function (controlName) {
        return this.formToolService.mustShowError(this.clientForm, controlName);
    };
    ClientFormComponent.prototype.hasError = function (controlName, errorCode) {
        return this.formToolService.hasError(this.clientForm, controlName, errorCode);
    };
    ClientFormComponent = __decorate([
        Component({
            selector: 'app-client-form',
            templateUrl: 'client-form.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            FormBuilder,
            GlobalStoreService,
            ParameterService,
            FormToolsService,
            PersonService,
            PreferenceClientService])
    ], ClientFormComponent);
    return ClientFormComponent;
}());
export { ClientFormComponent };
//# sourceMappingURL=client-form.component.js.map