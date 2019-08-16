import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceManagerListComponent } from './service-manager-list/service-manager-list.component';
import { ServiceManagerShowComponent } from './service-manager-show/service-manager-show.component';
import { ServiceManagerCreateComponent } from './service-manager-create/service-manager-create.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: ServiceManagerListComponent,
  },
  {
    path: 'show/:id',
    component: ServiceManagerShowComponent,
  },
  {
    path: 'create/:id',
    component: ServiceManagerCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceManagerRoutingModule { }
