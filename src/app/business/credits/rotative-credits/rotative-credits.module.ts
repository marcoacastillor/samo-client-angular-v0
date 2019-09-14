import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RotativeCreditsRoutingModule } from './rotative-credits-routing.module';
import { RotativeCreditsMainComponent } from './rotative-credits-main/rotative-credits-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssociatedInfoService } from 'src/app/shared/services/associated-info.service';
import { CreditAssociatedService } from 'src/app/shared/services/credit-associated.service';
import { RotativeCreditsFormComponent } from './rotative-credits-form/rotative-credits-form.component';
import { RotativeCreditsShowComponent } from './rotative-credits-show/rotative-credits-show.component';
import { PersonService } from 'src/app/shared/services/person.service';
import { RotativeCreditsListComponent } from './rotative-credits-list/rotative-credits-list.component';
import { CreditLineService } from 'src/app/shared/services/credit-line.service';
import { CreditPaymentService } from 'src/app/shared/services/credit-payment.service';
import { ApprovedFormModalComponent } from './rotative-credits-show/approved-form-modal/approved-form-modal.component';
import { SimulationCreditModalComponent } from './rotative-credits-form/simulation-credit-modal/simulation-credit-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RotativeCreditsRoutingModule,
    SharedModule,
    FontAwesomeModule,
    //OwlDateTimeModule, 
    //OwlNativeDateTimeModule,
  ],
  providers: [
    AssociatedInfoService, CreditAssociatedService, CreditLineService, PersonService, CreditPaymentService 
  ],
  declarations: [RotativeCreditsMainComponent, RotativeCreditsFormComponent, RotativeCreditsShowComponent, RotativeCreditsListComponent, ApprovedFormModalComponent, SimulationCreditModalComponent]
})
export class RotativeCreditsModule { }