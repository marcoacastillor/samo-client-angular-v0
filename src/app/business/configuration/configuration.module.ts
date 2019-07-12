import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { AdminParamComponent } from './parameters/admin-param/admin-param.component';
import { ListParamComponent } from './parameters/list-param/list-param.component';
import { ShowParamComponent } from './parameters/show-param/show-param.component';
import { CategoryService } from 'src/app/shared/services/category.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalParameterComponent } from './parameters/show-param/modal-parameter/modal-parameter.component';
import { NewParameterComponent } from './parameters/show-param/new-parameter/new-parameter.component';
import { NewParamComponent } from './parameters/new-param/new-param.component';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { AdminTypeServiceComponent } from './type-service/admin-type-service/admin-type-service.component';
import { ListTypeServiceComponent } from './type-service/list-type-service/list-type-service.component';
import { NewTypeServiceComponent } from './type-service/new-type-service/new-type-service.component';
import { TypeServiceService } from 'src/app/shared/services/type-service.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@NgModule({
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [ CategoryService, ParameterService, TypeServiceService, UtilsService],
  declarations: [AdminParamComponent, ListParamComponent, ShowParamComponent, NewParamComponent, ModalParameterComponent, NewParameterComponent, AdminTypeServiceComponent, ListTypeServiceComponent, NewTypeServiceComponent]
})
export class ConfigurationModule { }
