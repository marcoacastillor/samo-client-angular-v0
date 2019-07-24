import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterpriseShowComponent } from './enterprise-show/enterprise-show.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'show/owner'
  },
  {
    path: 'show/:id',
    component: EnterpriseShowComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageEnterpriseRoutingModule { }
