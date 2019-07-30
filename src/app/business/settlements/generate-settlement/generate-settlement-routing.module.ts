import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettlementListComponent } from './settlement-list/settlement-list.component';
import { SettlementFormComponent } from './settlement-form/settlement-form.component';
import { SettlementShowComponent } from './settlement-show/settlement-show.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: SettlementListComponent
  },
  {
    path: 'create',
    component: SettlementFormComponent
  },
  {
    path: 'show/:id',
    component: SettlementShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateSettlementRoutingModule { }
