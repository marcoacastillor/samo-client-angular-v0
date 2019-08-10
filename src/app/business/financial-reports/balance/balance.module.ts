import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalanceRoutingModule } from './balance-routing.module';
import { BalanceShowComponent } from './balance-show/balance-show.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    BalanceRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ],
  declarations: [BalanceShowComponent]
})
export class BalanceModule { }
