import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientShowComponent } from './client-show/client-show.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PersonService } from 'src/app/shared/services/person.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { ClientFormComponent } from './client-form/client-form.component';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { PreferenceClientService } from 'src/app/shared/services/preference-client.service';

@NgModule({
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,
    FontAwesomeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  providers: [
    PersonService, OperationService, ParameterService, PreferenceClientService
  ],
  declarations: [ClientListComponent, ClientShowComponent, ClientFormComponent]
})
export class ClientsModule { }