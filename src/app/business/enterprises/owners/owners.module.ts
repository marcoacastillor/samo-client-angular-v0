import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnersRoutingModule } from './owners-routing.module';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';

@NgModule({
  imports: [
    CommonModule,
    OwnersRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ],
  providers: [
    EnterpriseService
  ],
  declarations: [OwnerListComponent]
})
export class OwnersModule { }
