import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StocksRoutingModule } from './stocks-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductService } from 'src/app/shared/services/product.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

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
    ProductService, UtilsService
  ],
  declarations: [ProductListComponent]
})
export class StocksModule { }