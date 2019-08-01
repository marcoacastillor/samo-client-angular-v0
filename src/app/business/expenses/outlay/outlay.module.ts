import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutlayRoutingModule } from './outlay-routing.module';
import { OutlayListComponent } from './outlay-list/outlay-list.component';
import { ExpensesService } from 'src/app/shared/services/expenses.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalExpenseFormComponent } from './modal-expense-form/modal-expense-form.component';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';

@NgModule({
  imports: [
    CommonModule,
    OutlayRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ],
  providers: [
    ExpensesService, EnterpriseService
  ],
  declarations: [OutlayListComponent, ModalExpenseFormComponent]
})
export class OutlayModule { }
