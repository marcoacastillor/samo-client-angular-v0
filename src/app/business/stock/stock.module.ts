import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { AdminProductComponent } from './product/admin-product/admin-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { NewProductComponent } from './product/new-product/new-product.component';
import { ShowProductComponent } from './product/show-product/show-product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductService } from 'src/app/shared/services/product.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ReportsProductComponent } from './product/reports-product/reports-product.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { ClothesFormComponent } from './product/new-product/clothes-form/clothes-form.component';
import { FoodFormComponent } from './product/new-product/food-form/food-form.component';
import { ChemicalInputFormComponent } from './product/new-product/chemical-input-form/chemical-input-form.component';

@NgModule({
  imports: [
    CommonModule,
    StockRoutingModule,
    SharedModule,
    FontAwesomeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  providers: [GlobalStoreService, ProductService, UtilsService, EnterpriseService, OperationService, ParameterService],
  declarations: [AdminProductComponent, ListProductComponent, NewProductComponent, ShowProductComponent, ReportsProductComponent, ClothesFormComponent, FoodFormComponent, ChemicalInputFormComponent]
})
export class StockModule { }
