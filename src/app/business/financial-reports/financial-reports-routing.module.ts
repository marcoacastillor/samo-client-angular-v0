import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'statement-income',
        loadChildren: './statement-income/statement-income.module#StatementIncomeModule'
      },
      {
        path: 'balance',
        loadChildren: './balance/balance.module#BalanceModule'
      },
      {
        path: 'cash-register',
        loadChildren: './cash-register/cash-register.module#CashRegisterModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialReportsRoutingModule { }
