import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModulesListComponent } from './modules-list/modules-list.component';
import { ModulesShowComponent } from './modules-show/modules-show.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: ModulesListComponent
  },
  {
    path: 'show/:id',
    component: ModulesShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
