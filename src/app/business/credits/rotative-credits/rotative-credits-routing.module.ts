import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RotativeCreditsMainComponent } from './rotative-credits-main/rotative-credits-main.component';
import { RotativeCreditsFormComponent } from './rotative-credits-form/rotative-credits-form.component';
import { RotativeCreditsShowComponent } from './rotative-credits-show/rotative-credits-show.component';
import { RotativeCreditsListComponent } from './rotative-credits-list/rotative-credits-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main'
  },
  {
    path: 'list',
    component: RotativeCreditsListComponent
  },
  {
    path: 'main',
    component: RotativeCreditsMainComponent
  },
  {
    path: 'create/:id',
    component: RotativeCreditsFormComponent
  },
  {
    path: 'show/:id',
    component: RotativeCreditsShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RotativeCreditsRoutingModule { }
