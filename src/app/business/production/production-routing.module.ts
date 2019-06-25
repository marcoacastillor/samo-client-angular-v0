import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainProductionProcessComponent } from './production-process/main-production-process/main-production-process.component';

const routes: Routes = [
  {
    path:'register-production',
    component: MainProductionProcessComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRoutingModule { }
