import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditLineRoutingModule } from './credit-line-routing.module';
import { CreditLineListComponent } from './credit-line-list/credit-line-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreditLineService } from 'src/app/shared/services/credit-line.service';
import { CreditLineFormModalComponent } from './credit-line-list/credit-line-form-modal/credit-line-form-modal.component';
import { ParameterService } from 'src/app/shared/services/parameter.service';

@NgModule({
  imports: [
    CommonModule,
    CreditLineRoutingModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [
    CreditLineService, ParameterService
  ],
  declarations: [CreditLineListComponent, CreditLineFormModalComponent]
})
export class CreditLineModule { }
