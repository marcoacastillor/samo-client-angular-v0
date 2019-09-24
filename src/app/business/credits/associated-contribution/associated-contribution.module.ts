import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssociatedContributionRoutingModule } from './associated-contribution-routing.module';
import { AssociatedInfoService } from 'src/app/shared/services/associated-info.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreditAssociatedService } from 'src/app/shared/services/credit-associated.service';
import { CreditPaymentModalComponent } from './associated-contribution-main/credit-payment-modal/credit-payment-modal.component';
import { AssociatedContributionModalComponent } from './associated-contribution-main/associated-contribution-modal/associated-contribution-modal.component';
import { AssociatedContributionMainComponent } from './associated-contribution-main/associated-contribution-main.component';
import { AssociatedContributionService } from 'src/app/shared/services/associated-contribution.service';
import { CreditPaymentService } from 'src/app/shared/services/credit-payment.service';

@NgModule({
  imports: [
    CommonModule,
    AssociatedContributionRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ],
  providers: [
    PersonService, AssociatedInfoService, CreditAssociatedService, AssociatedContributionService, CreditPaymentService
  ],
  exports: [
    CreditPaymentModalComponent, AssociatedContributionModalComponent
  ],
  declarations: [AssociatedContributionMainComponent, CreditPaymentModalComponent, AssociatedContributionModalComponent]
})
export class AssociatedContributionModule { }
