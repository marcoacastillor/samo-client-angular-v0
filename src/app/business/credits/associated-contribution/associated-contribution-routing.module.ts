import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociatedContributionMainComponent } from './associated-contribution-main/associated-contribution-main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: AssociatedContributionMainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociatedContributionRoutingModule { }
