import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OptionsListComponent } from './options-list/options-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: OptionsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionsRoutingModule { }
