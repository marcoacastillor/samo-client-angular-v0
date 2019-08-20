import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesListComponent } from './modules-list/modules-list.component';
import { ModulesShowComponent } from './modules-show/modules-show.component';
import { ModuleService } from 'src/app/shared/services/module.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModuleFormModalComponent } from './modules-list/module-form-modal/module-form-modal.component';
import { ComponentService } from 'src/app/shared/services/component.service';
import { ComponentFormModalComponent } from './modules-show/component-form-modal/component-form-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ModulesRoutingModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [
    ModuleService, ComponentService
  ],
  declarations: [ModulesListComponent, ModulesShowComponent, ModuleFormModalComponent, ComponentFormModalComponent]
})
export class ModulesModule { }
