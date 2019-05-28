import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminParamComponent } from './parameters/admin-param/admin-param.component';

const routes: Routes = [
  {
    path: 'parameters',
    component: AdminParamComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
