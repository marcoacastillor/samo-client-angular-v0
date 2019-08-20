import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';




import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FontAwesomeModule,
    SharedModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
})
export class AdministrationModule { }
