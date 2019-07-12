import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainUserComponent } from './users/main-user/main-user.component';
import { MainRolComponent } from './rols/main-rol/main-rol.component';
import { MainModuleComponent } from './modules/main-module/main-module.component';
import { MainOptionComponent } from './options/main-option/main-option.component';
import { NewServiceManageComponent } from './service-manage/new-service-manage/new-service-manage.component';
import { ShowServiceManageComponent } from './service-manage/show-service-manage/show-service-manage.component';
import { ListServiceManageComponent } from './service-manage/list-service-manage/list-service-manage.component';

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
      path: 'service_manage_list',
      component: ListServiceManageComponent
    },
    {
      path: 'service_manage_new/:id',
      component: NewServiceManageComponent
    },
    {
      path: 'service_manage_show/:id',
      component: ShowServiceManageComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
