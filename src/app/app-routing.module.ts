import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: "",
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: "about",
    loadChildren: './about/about.module#AboutModule'
  },
  {
    path: "sales-admin",
    loadChildren: './business/business.module#BusinessModule'
  },
  {
    path: 'not-found',
    component: NotFoundComponent
},
{
    path: '**',
    redirectTo: 'not-found'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
