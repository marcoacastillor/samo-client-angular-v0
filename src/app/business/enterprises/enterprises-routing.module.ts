import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: 
    [
      {
        path: 'providers',
        loadChildren: './providers/providers.module#ProvidersModule'
      },
      {
        path: 'owners',
        loadChildren: './owners/owners.module#OwnersModule'
      },
      {
        path: 'manage-enterprise',
        loadChildren: './manage-enterprise/manage-enterprise.module#ManageEnterpriseModule'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterprisesRoutingModule { }
