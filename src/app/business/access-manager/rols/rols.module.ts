import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolsRoutingModule } from './rols-routing.module';
import { RolsShowComponent } from './rols-show/rols-show.component';
import { RolsListComponent } from './rols-list/rols-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { RolService } from 'src/app/shared/services/rol.service';
import { RolFormModalComponent } from './rols-list/rol-form-modal/rol-form-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RolsRoutingModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [
    RolService
  ],
  declarations: [RolsShowComponent, RolsListComponent, RolFormModalComponent]
})
export class RolsModule { }
