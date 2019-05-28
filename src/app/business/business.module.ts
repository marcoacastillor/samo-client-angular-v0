import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { ModuleService } from '../shared/services/module.service';
import { ModulesMainComponent } from './modules-main/modules-main.component';

@NgModule({
  imports: [
    CommonModule,
    BusinessRoutingModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [MainMenuComponent, ModulesMainComponent],
  providers: [ ModuleService ]
})
export class BusinessModule { }
