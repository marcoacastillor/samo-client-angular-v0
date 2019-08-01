import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExpensesService } from 'src/app/shared/services/expenses.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ParameterConfigService } from 'src/app/shared/services/parameter-config.service';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    SharedModule,
    ExpensesRoutingModule
  ],
  providers: [
    GlobalStoreService, ExpensesService, ParameterService, FormToolsService, UtilsService, ParameterConfigService
  ],
  declarations: []
})
export class ExpensesModule { }
