import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { AdminExpenseComponent } from './expense/admin-expense/admin-expense.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListExpenseComponent } from './expense/list-expense/list-expense.component';
import { NewExpenseComponent } from './expense/new-expense/new-expense.component';
import { ShowExpenseComponent } from './expense/show-expense/show-expense.component';
import { ExpensesService } from 'src/app/shared/services/expenses.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    //OwlDateTimeModule, 
    //OwlNativeDateTimeModule,
    ExpensesRoutingModule
  ],
  providers: [GlobalStoreService, ExpensesService, ParameterService, FormToolsService, UtilsService],
  declarations: [AdminExpenseComponent, ListExpenseComponent, NewExpenseComponent, ShowExpenseComponent]
})
export class ExpensesModule { }
