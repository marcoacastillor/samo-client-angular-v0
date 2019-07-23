import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { ProviderShowComponent } from './provider-show/provider-show.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { ModalEnterpriseFormComponent } from './modal-enterprise-form/modal-enterprise-form.component';
import { OperationService } from 'src/app/shared/services/operation.service';

@NgModule({
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ],
  providers: [
    EnterpriseService, OperationService
  ],
  declarations: [ProviderListComponent, ProviderShowComponent, ModalEnterpriseFormComponent]
})
export class ProvidersModule { }
