import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CashRegisterShowComponent } from './cash-register-show/cash-register-show.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'show'
  },
  {
    path: 'show',
    component: CashRegisterShowComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashRegisterRoutingModule { }
