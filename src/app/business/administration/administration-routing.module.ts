import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainUserComponent } from './users/main-user/main-user.component';
import { MainRolComponent } from './rols/main-rol/main-rol.component';
import { MainModuleComponent } from './modules/main-module/main-module.component';
import { MainOptionComponent } from './options/main-option/main-option.component';
import { MainServiceManageComponent } from './service-manage/main-service-manage/main-service-manage.component';

const routes: Routes = [
    {
      path: 'users',
      component: MainUserComponent
    },
    {
      path: 'rols',
      component: MainRolComponent
    },
    {
      path: 'modules',
      component: MainModuleComponent
    },
    {
      path: 'options',
      component: MainOptionComponent
    },
    {
      path: 'service_manage',
      component: MainServiceManageComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
