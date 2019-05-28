import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminExpenseComponent } from './expense/admin-expense/admin-expense.component';

const routes: Routes = [
  {
    path: 'expense',
    component: AdminExpenseComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
