import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceShowComponent } from './balance-show/balance-show.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'show'
  },
  {
    path: 'show',
    component: BalanceShowComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalanceRoutingModule { }
