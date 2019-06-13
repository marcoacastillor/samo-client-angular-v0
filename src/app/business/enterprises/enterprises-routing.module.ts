import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminProviderComponent } from './providers/admin-provider/admin-provider.component';
import { AdminOwnerComponent } from './owners/admin-owner/admin-owner.component';
import { ShowInfoComponent } from './my-enterprise/show-info/show-info.component';

const routes: Routes = [
  {
    path: 'providers',
    component: AdminProviderComponent
  },
  {
    path: 'owners',
    component: AdminOwnerComponent
  },
  {
    path: 'show-info',
    component: ShowInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterprisesRoutingModule { }
