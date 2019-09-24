import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    children: [
      {
        path: "rotative-credit",
        loadChildren: './rotative-credits/rotative-credits.module#RotativeCreditsModule',
      },
      {
        path: "associated-contribution",
        loadChildren: './associated-contribution/associated-contribution.module#AssociatedContributionModule',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditsRoutingModule { }
