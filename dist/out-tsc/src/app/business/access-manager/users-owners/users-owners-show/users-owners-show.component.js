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
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/models/user';
import { Person } from 'src/app/shared/models/person';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Rol } from 'src/app/shared/models/rol';
import { AccessEnterprise } from 'src/app/shared/models/access-enterprise';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { RolService } from 'src/app/shared/services/rol.service';
import { AccessEnterpriseService } from 'src/app/shared/services/access-enterprise.service';
import { tap } from 'rxjs/operators';
var UsersOwnersShowComponent = /** @class */ (function () {
    function UsersOwnersShowComponent(activateRoute, userService, personService, enterpriseService, rolService, accessEnterpriseService) {
        this.activateRoute = activateRoute;
        this.userService = userService;
        this.personService = personService;
        this.enterpriseService = enterpriseService;
        this.rolService = rolService;
        this.accessEnterpriseService = accessEnterpriseService;
        this.faThList = faThList;
        this.id_user = 0;
        this.user = new User;
        this.person = new Person;
        this.enterprise = new Enterprise;
        this.rol = new Rol;
        this.accessEnterprise = new AccessEnterprise;
    }
    UsersOwnersShowComponent.prototype.ngOnInit = function () {
        var id = this.activateRoute.snapshot.params['id'];
        this.id_user = id;
        this.getInfoById(id);
    };
    UsersOwnersShowComponent.prototype.getInfoById = function (id) {
        var _this = this;
        this.userService.show$(id).pipe(tap(function (user) { return _this.user = user; }), tap(function (user) { return _this.personService.show$(user.fk_id_person).subscribe(function (person) { return _this.person = person; }); }), tap(function (user) { return _this.enterpriseService.show$(user.fk_id_enterprise).subscribe(function (enterprise) { return _this.enterprise = enterprise; }); }), tap(function (user) { return _this.rolService.show$(user.fk_id_rol).subscribe(function (rol) { return _this.rol = rol; }); }), tap(function (user) { return _this.accessEnterpriseService.getAccessByEnterprise$(user.fk_id_enterprise).subscribe(function (access_enterprise) { return _this.accessEnterprise = access_enterprise; }); })).subscribe();
    };
    UsersOwnersShowComponent = __decorate([
        Component({
            selector: 'app-users-owners-show',
            templateUrl: 'users-owners-show.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            UserService,
            PersonService,
            EnterpriseService,
            RolService,
            AccessEnterpriseService])
    ], UsersOwnersShowComponent);
    return UsersOwnersShowComponent;
}());
export { UsersOwnersShowComponent };
//# sourceMappingURL=users-owners-show.component.js.map