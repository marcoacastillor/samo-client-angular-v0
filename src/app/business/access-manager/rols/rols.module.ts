import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolsRoutingModule } from './rols-routing.module';
import { RolsShowComponent } from './rols-show/rols-show.component';
import { RolsListComponent } from './rols-list/rols-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { RolService } from 'src/app/shared/services/rol.service';
import { RolFormModalComponent } from './rols-list/rol-form-modal/rol-form-modal.component';
import { OptionService } from 'src/app/shared/services/option.service';
import { ComponentFormModalComponent } from './rols-show/component-form-modal/component-form-modal.component';
import { OptionFormModalComponent } from './rols-show/option-form-modal/option-form-modal.component';
import { ComponentService } from 'src/app/shared/services/component.service';
import { ModuleService } from 'src/app/shared/services/module.service';
import { VisualizationRolService } from 'src/app/shared/services/visualization-rol.service';
import { OptionRolService } from 'src/app/shared/services/option-rol.service';

@NgModule({
  imports: [
    CommonModule,
    RolsRoutingModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [
    RolService, OptionService, ComponentService, ModuleService, VisualizationRolService, OptionRolService
  ],
  declarations: [RolsShowComponent, RolsListComponent, RolFormModalComponent, ComponentFormModalComponent, OptionFormModalComponent]
})
export class RolsModule { }
