var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { PeriodsIntermediatyInfoComponent } from './production-process/show-production-process/periods-intermediaty-info/periods-intermediaty-info.component';
import { MainInfoModalComponent } from './production-process/show-production-process/main-info/main-info-modal/main-info-modal.component';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { ProductFormModalComponent } from './production-process/show-production-process/periods-info/product-form-modal/product-form-modal.component';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProcessFormModalComponent } from './production-process/list-production-process/process-form-modal/process-form-modal.component';
var ProductionModule = /** @class */ (function () {
    function ProductionModule() {
    }
    ProductionModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                SharedModule,
                ProductionRoutingModule,
                FontAwesomeModule,
                OwlDateTimeModule,
                OwlNativeDateTimeModule,
            ],
            providers: [ProductionProcessService, UtilsService, CuttingPeriodService, DetailProductInputService, FormToolsService, ParameterService, ProductService],
            declarations: [ListProductionProcessComponent, MainProductionProcessComponent, ShowProductionProcessComponent, MainInfoComponent, PeriodsInfoComponent, PeriodsProductInfoComponent, PeriodsInputInfoComponent, PeriodsIntermediatyInfoComponent, MainInfoModalComponent, ProductFormModalComponent, ProcessFormModalComponent]
        })
    ], ProductionModule);
    return ProductionModule;
}());
export { ProductionModule };
//# sourceMappingURL=production.module.js.map