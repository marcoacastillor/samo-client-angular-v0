import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminProviderComponent } from './providers/admin-provider/admin-provider.component';
import { AdminOwnerComponent } from './owners/admin-owner/admin-owner.component';

const routes: Routes = [
  {
    path: 'providers',
    component: AdminProviderComponent
  },
  {
    path: 'owners',
    component: AdminOwnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterprisesRoutingModule { }
