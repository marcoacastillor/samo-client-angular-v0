import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnersRoutingModule } from './owners-routing.module';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { ModalEnterpriseFormComponent } from './modal-enterprise-form/modal-enterprise-form.component';
import { ParameterService } from 'src/app/shared/services/parameter.service';

@NgModule({
  imports: [
    CommonModule,
    OwnersRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ],
  providers: [
    EnterpriseService, ParameterService
  ],
  declarations: [OwnerListComponent, ModalEnterpriseFormComponent]
})
export class OwnersModule { }
