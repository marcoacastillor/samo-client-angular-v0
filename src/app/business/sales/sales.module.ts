import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PersonService } from 'src/app/shared/services/person.service';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { ListSaleDetailComponent } from './sale-detailed/list-sale-detail/list-sale-detail.component';
import { ShowSaleDetailComponent } from './sale-detailed/show-sale-detail/show-sale-detail.component';
import { NewSaleDetailComponent } from './sale-detailed/new-sale-detail/new-sale-detail.component';
import { ListClientModalComponent } from './sale-detailed/new-sale-detail/list-client-modal/list-client-modal.component';
import { NotesService } from 'src/app/shared/services/notes.service';
import { OperationProductService } from 'src/app/shared/services/operation-product.service';
import { FormOperationModalComponent } from './sale-detailed/show-sale-detail/form-operation-modal/form-operation-modal.component';
import { FormProductModalComponent } from './sale-detailed/show-sale-detail/form-product-modal/form-product-modal.component';
import { FormPaymentModalComponent } from './sale-detailed/show-sale-detail/form-payment-modal/form-payment-modal.component';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { ParameterConfigService } from 'src/app/shared/services/parameter-config.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SalesRoutingModule,
    FontAwesomeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
  ],
  providers: [
    GlobalStoreService, OperationService, ParameterService, ProductService, PersonService, PaymentService, NotesService, OperationProductService, EnterpriseService, ParameterConfigService],
  declarations: [ListSaleDetailComponent, ShowSaleDetailComponent, NewSaleDetailComponent, ListClientModalComponent, FormOperationModalComponent, FormProductModalComponent, FormPaymentModalComponent]
})
export class SalesModule { }