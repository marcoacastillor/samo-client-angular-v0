import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientAdminComponent } from './client-admin/client-admin.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientShowComponent } from './client-show/client-show.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: ClientListComponent,
  },
  {
    path: 'client/:id',
    component: ClientFormComponent,
  },
  {
    path: 'show/:id',
    component: ClientShowComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
