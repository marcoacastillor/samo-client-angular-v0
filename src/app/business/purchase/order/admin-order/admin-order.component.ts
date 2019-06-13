import { Component, OnInit } from '@angular/core';
import { Operation } from 'src/app/shared/models/operation';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { environment } from 'src/environments/environment';
import { Purchase } from 'src/app/shared/models/purchase';
import { Parameter } from 'src/app/shared/models/parameter';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Results } from 'src/app/shared/models/results';
import { Payment } from 'src/app/shared/models/payment';
import { PaymentService } from 'src/app/shared/services/payment.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: 'admin-order.component.html',
  styles: []
})
export class AdminOrderComponent implements OnInit {
  public showOperation: boolean = false;

  public operation: Operation = new Operation;
  public enterprise: Enterprise = new Enterprise;

  public purchase: Purchase;
  public orderList: Results = new Results();
  
  //Crear purchase
  public providerList: Enterprise[] = [];
  public paymentTypeList: Parameter[] = [];
  public discountsList: Parameter[] = [];
  public categoryList: Parameter[] = [];
  public presentationList: Parameter[] = [];
  public taxesList: Parameter[] = [];
  public product: Product = new Product;

  public actualPg: number = 0;
  public regPerPg: number = 5;
  
  constructor(
    private globalStoreService: GlobalStoreService,
    private enterpriseService: EnterpriseService,
    private operationService: OperationService,
    private parameterService: ParameterService,
    private productService: ProductService,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.loadProviders();
    this.loadOrders();
    this.loadDataPurchase();
    this.loadPaymentType();
    this.loadDiscounts();
    this.loadCategoryList();
    this.loadPresentationProductList();
    this.loadTaxesPurchaseList();
  }

  private loadTaxesPurchaseList(){
    this.parameterService.getByCodeCategory$(environment.tax_purchase).subscribe(
      tax_purchase => this.taxesList = tax_purchase
    );
  }

  private loadPresentationProductList(){
    this.parameterService.getByCodeCategory$(environment.presentation_product).subscribe(
      presentation_list => this.presentationList = presentation_list
    );
  }

  private loadCategoryList(){
    this.parameterService.getByCodeCategory$(environment.category_product).subscribe(
      category_list => this.categoryList = category_list
    );
  }

  private loadProviders(){
    this.enterpriseService.getByType$(environment.enterprise_provider).subscribe(
      providers => this.providerList = providers
    );
  }

  private loadOrders(){
    this.operationService.getByType$(environment.type_operation_purchase).subscribe(
      orders => {
        this.orderList = orders;
      }
    );
  }

  private loadDataPurchase(){
    this.purchase = new Purchase;

    let user = this.globalStoreService.getUser();
    this.purchase.fk_id_person = user.fk_id_person;
    this.purchase.operation_type  = environment.type_operation_purchase; 
    this.purchase.state_purchase = environment.state_initial_purchase;
    this.purchase.total_purchase = 0;
    this.purchase.total_taxes = 0;
    this.purchase.total_discounts = 0;
    this.purchase.value_discount = 0;
  }

  private loadPaymentType(){
    this.parameterService.getByCodeCategory$(environment.type_payment).subscribe(
      type_payments => this.paymentTypeList = type_payments
    );
  }

  private loadDiscounts(){
    this.parameterService.getByCodeCategory$(environment.discounts_purchase).subscribe(
      discounts => this.discountsList = discounts
    );
  }

  /**
   * Búscar producto por código 
   */
  public onGetByCode(code: string){
    this.productService.getByCode$(code,environment.purchase)
    .pipe(
      tap(this.loadProduct)
    )
    .subscribe(this.onSuccess, this.onError);
  }

  private loadProduct = (product: Product): void => {
    this.product = product;
  }

  public onResetProduct(product: Product){
    this.product = product;
  }

  /**
   * Funciones de creación de operaciones
   */

  public onCreate(purchase: Purchase){
    this.operationService.store_purchase$(purchase).subscribe(this.onSuccess, this.onError);
    this.loadDataPurchase();
  }
  
  public onCancel(cancel: boolean){
    if(cancel){
      this.loadDataPurchase();
    }
  }

  public onView(id_order: number){
    this.enterprise = new Enterprise;
    
    this.showOperation = true;
    this.operationService.show_purchase$(id_order).pipe(
      tap(this.loadOperation),
      switchMap((operation: Operation): Observable<Enterprise> => this.enterpriseService.showByExternalReference$(operation.external_reference)),
      tap(this.loadProvider)
    )
    .subscribe(this.onSuccess, this.onError);
  }

  private loadOperation = (operation: Operation): void => {
    this.operation = operation;
  }

  private loadProvider = (enterprise: Enterprise): void => {
    this.enterprise = enterprise;
  }

  public onUpdate(operation: Operation){
    this.showOperation = false;
    this.operation = operation;
  }

  public onSearch(filter: string){
    this.operationService.searchByFilter$(filter, environment.type_operation_purchase).subscribe(
      operations => {
        this.orderList = operations;
      }
    );
  }

  /**
   * Funciones para crear producto
   */
  public onCreateProduct(product: Product){
    this.productService.store$(product).pipe(
      tap(this.loadProduct)
    ).subscribe(this.onSuccess, this.onError)
  }

  public onCreateEnterprise(enterprise: Enterprise){
    this.enterpriseService.store$(enterprise)
    .subscribe(
      () => {
        this.loadProviders();
        this.onSuccess;
      }, this.onError)
  }

  /**
   * Funciones para crear pagos
   */
  public onCreatePayment(payment: Payment){
    this.paymentService.store$(payment).subscribe(
      payment => {
        this.onView(payment.fk_id_operation)
      }
    )
  }

  /*
  * ------------------------------------------
  * Funciones validación de resultado
  * ------------------------------------------
  */
 private onSuccess = () => {
  this.globalStoreService.dispatchUserMessage('200', ' Se ejecutó exitosamente, la operación ');
  this.loadOrders();
  }

  private onError = (error: any) => {
    this.globalStoreService.dispatchUserMessage(error.status, error.statusText + ' : ' + error.error.error);
  }

}
