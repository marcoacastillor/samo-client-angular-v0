import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'modules',
        loadChildren: './modules/modules.module#ModulesModule'
      },
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule'
      },
      {
        path: 'users-owners',
        loadChildren: './users-owners/users-owners.module#UsersOwnersModule'
      },
      {
        path: 'rols',
        loadChildren: './rols/rols.module#RolsModule'
      },
      {
        path: 'options',
        loadChildren: './options/options.module#OptionsModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessManagerRoutingModule { }
