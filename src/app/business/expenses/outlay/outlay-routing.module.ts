import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutlayListComponent } from './outlay-list/outlay-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: OutlayListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutlayRoutingModule { }
