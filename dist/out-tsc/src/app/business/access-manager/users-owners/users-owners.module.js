var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersOwnersRoutingModule } from './users-owners-routing.module';
import { UsersOwnersListComponent } from './users-owners-list/users-owners-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserService } from 'src/app/shared/services/user.service';
import { RolService } from 'src/app/shared/services/rol.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { AccessEnterpriseService } from 'src/app/shared/services/access-enterprise.service';
import { UserFormModalComponent } from './users-owners-list/user-form-modal/user-form-modal.component';
import { UsersOwnersShowComponent } from './users-owners-show/users-owners-show.component';
var UsersOwnersModule = /** @class */ (function () {
    function UsersOwnersModule() {
    }
    UsersOwnersModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                UsersOwnersRoutingModule,
                FontAwesomeModule,
                SharedModule
            ],
            providers: [
                UserService, RolService, PersonService, EnterpriseService, ParameterService, AccessEnterpriseService
            ],
            declarations: [UsersOwnersListComponent, UserFormModalComponent, UsersOwnersShowComponent]
        })
    ], UsersOwnersModule);
    return UsersOwnersModule;
}());
export { UsersOwnersModule };
//# sourceMappingURL=users-owners.module.js.map