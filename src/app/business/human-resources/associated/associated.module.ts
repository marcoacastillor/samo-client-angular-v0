import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssociatedRoutingModule } from './associated-routing.module';
import { AssociatedListComponent } from './associated-list/associated-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PersonService } from 'src/app/shared/services/person.service';
import { AssociatedFormComponent } from './associated-form/associated-form.component';
import { AssociatedShowComponent } from './associated-show/associated-show.component';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AssociatedInfoService } from 'src/app/shared/services/associated-info.service';
import { CreditAssociatedService } from 'src/app/shared/services/credit-associated.service';
import { AssociatedContributionService } from 'src/app/shared/services/associated-contribution.service';

@NgModule({
  imports: [
    CommonModule,
    AssociatedRoutingModule,
    SharedModule,
    FontAwesomeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  providers: [
    PersonService, ParameterService, AssociatedInfoService, CreditAssociatedService, AssociatedContributionService
  ],
  declarations: [AssociatedListComponent, AssociatedFormComponent, AssociatedShowComponent]
})
export class AssociatedModule { }
