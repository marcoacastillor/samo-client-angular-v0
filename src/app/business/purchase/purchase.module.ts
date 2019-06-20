import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { AdminOrderComponent } from './order/admin-order/admin-order.component';
import { ListOrderComponent } from './order/list-order/list-order.component';
import { NewOrderComponent } from './order/new-order/new-order.component';
import { ShowOrderComponent } from './order/show-order/show-order.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ModalEnterpriseComponent } from './order/new-order/modal-enterprise/modal-enterprise.component';
import { NewEnterpriseComponent } from './order/new-order/new-enterprise/new-enterprise.component';
import { ModalPaymentComponent } from './order/show-order/modal-payment/modal-payment.component';
import { NewPaymentComponent } from './order/show-order/new-payment/new-payment.component';
import { ModalProductComponent } from './order/new-order/modal-product/modal-product.component';
import { NewProductComponent } from './order/new-order/new-product/new-product.component';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { AdminPurchaseReportComponent } from './purchase-report/admin-purchase-report/admin-purchase-report.component';
import { ConsolidatedComponent } from './purchase-report/consolidated/consolidated.component';
import { PendingReceiveComponent } from './purchase-report/pending-receive/pending-receive.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ModelPaymentComponent } from './purchase-report/model-payment/model-payment.component';
import { ModelViewOperationComponent } from './purchase-report/model-view-operation/model-view-operation.component';
import { ViewOperationComponent } from './purchase-report/view-operation/view-operation.component';
import { PaymentComponent } from './purchase-report/payment/payment.component';
import { ModalSearchComponent } from './order/new-order/modal-search/modal-search.component';
import { SearchComponent } from './order/new-order/search/search.component';

@NgModule({
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    SharedModule,
    FontAwesomeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  providers: [ EnterpriseService, ParameterService, UserService, UtilsService, GlobalStoreService, OperationService, ProductService, PaymentService],
  declarations: [AdminOrderComponent, ListOrderComponent, NewOrderComponent, ShowOrderComponent, ModalEnterpriseComponent, NewEnterpriseComponent, ModalPaymentComponent, NewPaymentComponent, ModalProductComponent, NewProductComponent, AdminPurchaseReportComponent, ConsolidatedComponent, PendingReceiveComponent, ModelPaymentComponent, ModelViewOperationComponent, ViewOperationComponent, PaymentComponent, ModalSearchComponent, SearchComponent]
})
export class PurchaseModule { }