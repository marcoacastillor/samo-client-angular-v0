import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StocksRoutingModule } from './stocks-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductService } from 'src/app/shared/services/product.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ProductShowComponent } from './product-show/product-show.component';
import { ProductFormClothesComponent } from './product-form-clothes/product-form-clothes.component';
import { ProductFormFoodComponent } from './product-form-food/product-form-food.component';
import { ParameterService } from 'src/app/shared/services/parameter.service';

@NgModule({
  imports: [
    CommonModule,
    StocksRoutingModule,
    SharedModule,
    FontAwesomeModule,
    //OwlDateTimeModule, 
    //OwlNativeDateTimeModule,
  ],
  providers: [
    ProductService, UtilsService, ParameterService
  ],
  declarations: [ProductListComponent, ProductShowComponent, ProductFormClothesComponent, ProductFormFoodComponent]
})
export class StocksModule { }