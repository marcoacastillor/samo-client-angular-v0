import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsRoutingModule } from './options-routing.module';
import { OptionsListComponent } from './options-list/options-list.component';
import { OptionFormModalComponent } from './options-list/option-form-modal/option-form-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { OptionService } from 'src/app/shared/services/option.service';

@NgModule({
  imports: [
    CommonModule,
    OptionsRoutingModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [
    OptionService
  ],
  declarations: [OptionsListComponent, OptionFormModalComponent]
})
export class OptionsModule { }
