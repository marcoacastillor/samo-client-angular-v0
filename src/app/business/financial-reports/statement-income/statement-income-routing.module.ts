import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatementIncomeShowComponent } from './statement-income-show/statement-income-show.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'show'
  },
  {
    path: 'show',
    component: StatementIncomeShowComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatementIncomeRoutingModule { }
