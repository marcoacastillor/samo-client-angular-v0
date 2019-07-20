import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientAdminComponent } from './client-admin/client-admin.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientShowComponent } from './client-show/client-show.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PersonService } from 'src/app/shared/services/person.service';

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
    PersonService,
  ],
  declarations: [ClientListComponent, ClientAdminComponent, ClientFormComponent, ClientShowComponent]
})
export class ClientsModule { }
