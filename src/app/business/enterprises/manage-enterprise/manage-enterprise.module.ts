import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageEnterpriseRoutingModule } from './manage-enterprise-routing.module';
import { EnterpriseShowComponent } from './enterprise-show/enterprise-show.component';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PersonService } from 'src/app/shared/services/person.service';
import { ParameterConfigService } from 'src/app/shared/services/parameter-config.service';
import { PositionService } from 'src/app/shared/services/position.service';
import { ModalPositionFormComponent } from './modal-position-form/modal-position-form.component';
import { ModalParameterFormComponent } from './modal-parameter-form/modal-parameter-form.component';
import { ModalEnterpriseFormComponent } from './modal-enterprise-form/modal-enterprise-form.component';
import { ParameterService } from 'src/app/shared/services/parameter.service';

@NgModule({
  imports: [
    CommonModule,
    ManageEnterpriseRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ],
  providers: [
    EnterpriseService, PersonService, ParameterConfigService, PositionService, ParameterService
  ],
  declarations: [EnterpriseShowComponent, ModalPositionFormComponent, ModalParameterFormComponent, ModalEnterpriseFormComponent]
})
export class ManageEnterpriseModule { }
