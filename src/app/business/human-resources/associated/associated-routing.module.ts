import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociatedListComponent } from './associated-list/associated-list.component';
import { AssociatedFormComponent } from './associated-form/associated-form.component';
import { AssociatedShowComponent } from './associated-show/associated-show.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: AssociatedListComponent,
  },
  {
    path: 'create/:id',
    component: AssociatedFormComponent,
  },
  {
    path: 'show/:id',
    component: AssociatedShowComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociatedRoutingModule { }
