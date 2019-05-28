import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminClientsComponent } from './clients/admin-clients/admin-clients.component';
import { AdminEmployeeComponent } from './employee/admin-employee/admin-employee.component';

const routes: Routes = [
  {
    path: 'clients',
    component: AdminClientsComponent
  },
  {
    path: 'employee',
    component: AdminEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HumanResourceRoutingModule { }
