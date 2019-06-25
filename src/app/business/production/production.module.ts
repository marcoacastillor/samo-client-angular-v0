import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionRoutingModule } from './production-routing.module';
import { ListProductionProcessComponent } from './production-process/list-production-process/list-production-process.component';
import { MainProductionProcessComponent } from './production-process/main-production-process/main-production-process.component';
import { ProductionProcessService } from 'src/app/shared/services/production-process.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ShowProductionProcessComponent } from './production-process/show-production-process/show-production-process.component';
import { MainInfoComponent } from './production-process/show-production-process/main-info/main-info.component';
import { PeriodsInfoComponent } from './production-process/show-production-process/periods-info/periods-info.component';
import { PeriodsProductInfoComponent } from './production-process/show-production-process/periods-product-info/periods-product-info.component';
import { PeriodsInputInfoComponent } from './production-process/show-production-process/periods-input-info/periods-input-info.component';
import { CuttingPeriodService } from 'src/app/shared/services/cutting-period.service';
import { DetailProductInputService } from 'src/app/shared/services/detail-product-input.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductionRoutingModule,
    FontAwesomeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  providers: [ProductionProcessService, UtilsService, CuttingPeriodService, DetailProductInputService],
  declarations: [ListProductionProcessComponent, MainProductionProcessComponent, ShowProductionProcessComponent, MainInfoComponent, PeriodsInfoComponent, PeriodsProductInfoComponent, PeriodsInputInfoComponent]
})
export class ProductionModule { }
