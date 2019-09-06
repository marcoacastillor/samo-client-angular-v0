import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RotativeCreditsMainComponent } from './rotative-credits-main/rotative-credits-main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: RotativeCreditsMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RotativeCreditsRoutingModule { }
