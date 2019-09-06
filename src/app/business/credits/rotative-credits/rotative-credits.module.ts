import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RotativeCreditsRoutingModule } from './rotative-credits-routing.module';
import { RotativeCreditsMainComponent } from './rotative-credits-main/rotative-credits-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssociatedInfoService } from 'src/app/shared/services/associated-info.service';
import { CreditAssociatedService } from 'src/app/shared/services/credit-associated.service';

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
    AssociatedInfoService, CreditAssociatedService
  ],
  declarations: [RotativeCreditsMainComponent]
})
export class RotativeCreditsModule { }
