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

@NgModule({
  imports: [
    CommonModule,
    UsersOwnersRoutingModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [
    UserService,RolService,PersonService,EnterpriseService,ParameterService,AccessEnterpriseService
  ],
  declarations: [UsersOwnersListComponent, UserFormModalComponent, UsersOwnersShowComponent]
})
export class UsersOwnersModule { }
