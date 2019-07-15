import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NewOrderFileComponent } from './order-file/new-order-file/new-order-file.component';
import { ShowOrderFileComponent } from './order-file/show-order-file/show-order-file.component';
import { ModalShowOrderFileComponent } from './order-file/modal-show-order-file/modal-show-order-file.component';
import { ListOrderDetailComponent } from './order-detailed/list-order-detail/list-order-detail.component';
import { ShowOrderDetailComponent } from './order-detailed/show-order-detail/show-order-detail.component';
import { NewOrderDetailComponent } from './order-detailed/new-order-detail/new-order-detail.component';
import { OperationProductService } from 'src/app/shared/services/operation-product.service';
import { NotesService } from 'src/app/shared/services/notes.service';
import { ListProviderModalComponent } from './order-detailed/list-provider-modal/list-provider-modal.component';
import { ListProductsModalComponent } from './order-detailed/list-products-modal/list-products-modal.component';
import { FormOperationModalComponent } from './order-detailed/show-order-detail/form-operation-modal/form-operation-modal.component';
import { FormProductModalComponent } from './order-detailed/show-order-detail/form-product-modal/form-product-modal.component';
import { FormPaymentModalComponent } from './order-detailed/show-order-detail/form-payment-modal/form-payment-modal.component';

@NgModule({
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    SharedModule,
    FontAwesomeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  providers: [ EnterpriseService, ParameterService, UserService, UtilsService, GlobalStoreService, OperationService, ProductService, PaymentService, OperationProductService, NotesService],
  declarations: [NewOrderFileComponent, ShowOrderFileComponent, ModalShowOrderFileComponent, ListOrderDetailComponent, ShowOrderDetailComponent, NewOrderDetailComponent, ListProviderModalComponent, ListProductsModalComponent, FormOperationModalComponent, FormProductModalComponent, FormPaymentModalComponent]
})
export class PurchaseModule { }