import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientShowComponent } from './client-show/client-show.component';
import { ClientFormComponent } from './client-form/client-form.component';

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
    path: 'show/:id',
    component: ClientShowComponent,
  },
  {
    path: 'create/:id',
    component: ClientFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
