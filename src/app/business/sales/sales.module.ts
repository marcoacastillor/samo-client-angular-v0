import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { AdminInvoiceComponent } from './invoice/admin-invoice/admin-invoice.component';
import { ListInvoiceComponent } from './invoice/list-invoice/list-invoice.component';
import { NewInvoiceComponent } from './invoice/new-invoice/new-invoice.component';
import { ShowInvoiceComponent } from './invoice/show-invoice/show-invoice.component';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PersonService } from 'src/app/shared/services/person.service';
import { ModalPaymentComponent } from './invoice/new-invoice/modal-payment/modal-payment.component';
import { EfectyPaymentComponent } from './invoice/new-invoice/efecty-payment/efecty-payment.component';
import { NewSalePaymentComponent } from './invoice/show-invoice/new-sale-payment/new-sale-payment.component';
import { ModalSalePaymentComponent } from './invoice/show-invoice/modal-sale-payment/modal-sale-payment.component';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { AdminSaleReportComponent } from './sale-report/admin-sale-report/admin-sale-report.component';
import { ConsolidatedComponent } from './sale-report/consolidated/consolidated.component';
import { ModalShowOperationComponent } from './sale-report/modal-show-operation/modal-show-operation.component';
import { ShowOperationComponent } from './sale-report/show-operation/show-operation.component';
import { ModalNewPaymentComponent } from './sale-report/modal-new-payment/modal-new-payment.component';
import { NewPaymentComponent } from './sale-report/new-payment/new-payment.component';
import { ModalSearchComponent } from './invoice/new-invoice/modal-search/modal-search.component';
import { SearchComponent } from './invoice/new-invoice/search/search.component';

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
    GlobalStoreService, OperationService, ParameterService, ProductService, PersonService, PaymentService
  ],
  declarations: [AdminInvoiceComponent, ListInvoiceComponent, NewInvoiceComponent, ShowInvoiceComponent, ModalPaymentComponent, EfectyPaymentComponent, NewSalePaymentComponent, ModalSalePaymentComponent, AdminSaleReportComponent, ConsolidatedComponent, ModalShowOperationComponent, ShowOperationComponent, ModalNewPaymentComponent, NewPaymentComponent, ModalSearchComponent, SearchComponent]
})
export class SalesModule { }