import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersOwnersListComponent } from './users-owners-list/users-owners-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: UsersOwnersListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersOwnersRoutingModule { }
