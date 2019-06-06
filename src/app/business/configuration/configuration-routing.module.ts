import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminParamComponent } from './parameters/admin-param/admin-param.component';
import { AdminTypeServiceComponent } from './type-service/admin-type-service/admin-type-service.component';

const routes: Routes = [
  {
    path: 'parameters',
    component: AdminParamComponent,
  },
  {
    path: 'type-service',
    component: AdminTypeServiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
