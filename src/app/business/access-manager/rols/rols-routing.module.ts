import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolsListComponent } from './rols-list/rols-list.component';
import { RolsShowComponent } from './rols-show/rols-show.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: RolsListComponent
  },
  {
    path: 'show/:id',
    component: RolsShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolsRoutingModule { }
