import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CredentialsRoutingModule } from './credentials-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../shared/services/user.service';
import { AuthenticationService } from '../shared/services/authentication.service';

import { HttpClientModule } from '@angular/common/http';
import { PersonService } from '../shared/services/person.service';
import { EnterpriseService } from '../shared/services/enterprise.service';

@NgModule({
  imports: [
    CommonModule,
    CredentialsRoutingModule,
    MaterialModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [LoginComponent],
  exports: [ LoginComponent ],
  providers: [ UserService, AuthenticationService, PersonService, EnterpriseService ]
})
export class CredentialsModule { }
