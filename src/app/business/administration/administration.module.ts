import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { MainUserComponent } from './users/main-user/main-user.component';
import { MainRolComponent } from './rols/main-rol/main-rol.component';
import { ListUserComponent } from './users/list-user/list-user.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersonService } from 'src/app/shared/services/person.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { RolService } from 'src/app/shared/services/rol.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ShowUserComponent } from './users/show-user/show-user.component';
import { ShowRolComponent } from './rols/show-rol/show-rol.component';
import { NewRolComponent } from './rols/new-rol/new-rol.component';
import { ListRolComponent } from './rols/list-rol/list-rol.component';
import { MaterialModule } from 'src/app/material.module';
import { MainModuleComponent } from './modules/main-module/main-module.component';
import { ListModuleComponent } from './modules/list-module/list-module.component';
import { NewModuleComponent } from './modules/new-module/new-module.component';
import { ShowModuleComponent } from './modules/show-module/show-module.component';
import { ModuleService } from 'src/app/shared/services/module.service';
import { NewComponentComponent } from './modules/show-module/new-component/new-component.component';
import { ModalComponentComponent } from './modules/show-module/modal-component/modal-component.component';
import { ComponentService } from 'src/app/shared/services/component.service';
import { OptionService } from 'src/app/shared/services/option.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { ModalPersonComponent } from './users/new-user/modal-person/modal-person.component';
import { NewPersonComponent } from './users/new-user/new-person/new-person.component';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ModalEnterpriseComponent } from './users/new-user/modal-enterprise/modal-enterprise.component';
import { NewEnterpriseComponent } from './users/new-user/new-enterprise/new-enterprise.component';
import { MainOptionComponent } from './options/main-option/main-option.component';
import { ListOptionComponent } from './options/list-option/list-option.component';
import { NewOptionComponent } from './options/new-option/new-option.component';
import { ModalAsignOptionComponent } from './modules/show-module/modal-asign-option/modal-asign-option.component';
import { AsignOptionComponent } from './modules/show-module/asign-option/asign-option.component';
import { MainServiceManageComponent } from './service-manage/main-service-manage/main-service-manage.component';
import { ListServiceManageComponent } from './service-manage/list-service-manage/list-service-manage.component';
import { ShowServiceManageComponent } from './service-manage/show-service-manage/show-service-manage.component';
import { NewServiceManageComponent } from './service-manage/new-service-manage/new-service-manage.component';
import { ServiceEnterpriseService } from 'src/app/shared/services/service-enterprise.service';

@NgModule({
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FontAwesomeModule,
    MaterialModule,
    SharedModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  declarations: [
    MainUserComponent, ShowUserComponent, ListUserComponent, NewUserComponent, 
    MainRolComponent, ShowRolComponent, ListRolComponent, NewRolComponent, 
    MainModuleComponent, ListModuleComponent, NewModuleComponent, ShowModuleComponent, NewComponentComponent, NewOptionComponent, ModalComponentComponent, ModalPersonComponent, NewPersonComponent, ModalEnterpriseComponent, NewEnterpriseComponent, MainOptionComponent, ListOptionComponent, ModalAsignOptionComponent, AsignOptionComponent, MainServiceManageComponent, ListServiceManageComponent, ShowServiceManageComponent, NewServiceManageComponent
  ],
  providers: [ EnterpriseService, UserService, RolService, UtilsService, PersonService, ModuleService, ParameterService, ComponentService, OptionService, ServiceEnterpriseService ]
})
export class AdministrationModule { }
