import { Component, OnInit } from '@angular/core';
import { Operation } from 'src/app/shared/models/operation';
import { Results } from 'src/app/shared/models/results';
import { Parameter } from 'src/app/shared/models/parameter';
import { Product } from 'src/app/shared/models/product';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { environment } from 'src/environments/environment';
import { tap, switchMap } from 'rxjs/operators';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/shared/services/person.service';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/shared/models/payment';

@Component({
  selector: 'app-admin-invoice',
  templateUrl: 'admin-invoice.component.html',
  styles: []
})
export class AdminInvoiceComponent implements OnInit {
  public showInvoice = false;

  public actualPg = 0;
  public regPerPg = 5;
  
  public operation: Operation = new Operation;
  public orderList: Results = new Results();
  
  //Crear purchase
  public paymentTypeList: Parameter[] = [];
  public discountsList: Parameter[] = [];
  public typeIdsList: Parameter[] = [];
  public taxesList: Parameter[] = [];
  public product: Product = new Product;
  public client: Person = new Person;

  constructor(
    private globalStoreService: GlobalStoreService,
    private operationService: OperationService,
    private parameterService: ParameterService,
    private productService: ProductService,
    private paymentService: PaymentService,
    private personService: PersonService
  ) { }
  
  ngOnInit() {
    this.loadOrders();
    this.loadPaymentType();
    this.loadIdsType();
    this.loadDiscounts();
    this.loadDataSale();
    this.loadTaxesPurchaseList();
  }

  private loadTaxesPurchaseList(){
    this.parameterService.getByCodeCategory$(environment.tax_purchase).subscribe(
      tax_purchase => this.taxesList = tax_purchase
    );
  }

  private loadIdsType(){
    this.parameterService.getByCodeCategory$(environment.type_ids).subscribe(
      typeIds => {
        this.typeIdsList = typeIds;
      }
    );
  }

  private loadOrders(){
    this.operationService.getByType$(environment.type_operation_sale).subscribe(
      orders => {
        this.orderList = orders;
      }
    );
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

  private loadDataSale(){
    let user = this.globalStoreService.getUser();
    this.operation.fk_id_person = user.fk_id_person;
    this.operation.fk_id_enterprise = user.fk_id_enterprise;
    this.operation.operation_type  = environment.type_operation_sale;
  }

  /*
  * Funciones invocadas desde LIST
  */
  public onView(id_order: number){
    this.client = new Person;

    this.showInvoice = true;
    this.operationService.show_purchase$(id_order).pipe(
      tap(this.loadOperation),
      switchMap((operation: Operation): Observable<Person> => this.personService.showByExternalReference$(operation.external_reference)),
      tap(this.loadClient)
    )
    .subscribe(this.onSuccess, this.onError);
  }

  private loadOperation = (operation: Operation): void => {
    this.operation = operation;
  }

  public onUpdate(operation: Operation){
    this.showInvoice = false;
    this.operation = operation;
    this.client = new Person;
    this.product = new Product;
    this.loadDataSale();
  }

  public onSearch(filter: string){
    this.operationService.searchByFilter$(filter, environment.type_operation_sale).subscribe(
      operations => {
        this.orderList = operations;
      }
    );
  }

  public onCreate(operation: Operation){
    this.operationService.store_sale$(operation).subscribe(this.onSuccess, this.onError);
    this.loadDataSale();
  }

  public onSelect(prd: Product){
    this.product = prd;
  }

  /**
   * Búscar producto por código 
   */
  public onGetByCode(code: string){
    this.productService.getByCode$(code,environment.sales)
    .pipe(
      tap(this.loadProduct)
    )
    .subscribe(this.onSuccess, this.onError);
  }

  private loadProduct = (product: Product): void => {
    this.product = product;
  }

  public onGetPerson(person: Person){
    this.personService.getByTypeAndNumberId$(person.type_id, person.number_id)
    .pipe(
      tap(this.loadClient)
    ).subscribe(this.onSuccess, this.onError);
  }

  private loadClient = (person: Person): void => {
    this.client = person;
  }

  public onResetProduct(product: Product){
    this.product = product;
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
    this.globalStoreService.dispatchUserMessage(error.status, error.statusText + ' : ' + error.error);
  }

}
