import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersShowComponent } from './users-show/users-show.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserService } from 'src/app/shared/services/user.service';
import { UserFormModalComponent } from './users-list/user-form-modal/user-form-modal.component';
import { RolService } from 'src/app/shared/services/rol.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { AccessEnterpriseService } from 'src/app/shared/services/access-enterprise.service';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [
    UserService,RolService,PersonService,EnterpriseService,ParameterService,AccessEnterpriseService
  ],
  declarations: [UsersListComponent, UsersShowComponent, UserFormModalComponent]
})
export class UsersModule { }
