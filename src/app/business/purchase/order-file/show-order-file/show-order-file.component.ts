import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Operation } from 'src/app/shared/models/operation';
import { Product } from 'src/app/shared/models/product';
import { ProductOperation } from 'src/app/shared/models/product-operation';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Parameter } from 'src/app/shared/models/parameter';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';

@Component({
  selector: 'app-show-order-file',
  templateUrl: 'show-order-file.component.html',
  styles: []
})
export class ShowOrderFileComponent implements OnInit, OnChanges {
  public orderFileForm: FormGroup;
  public credit_payment: string = environment.credit_payment;

  @Input() public data: any;
  @Input() public operation: Operation;
  @Input() public lstParams: Parameter[];

  @Output() public create = new EventEmitter<Operation>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.data)
    {
      if(changes.data.currentValue)
      {
        this.readInvoice(changes.data.currentValue);   
        this.initUpdForm(); 
      }
    }
  }

  private readInvoice(data: any){
    this.operation.external_reference =  data[1][0];
    this.operation.number_invoice     =  data[1][1];
    
    let descuento         = 0;
    let subtotal          = 0;
    let totalTax          = 0;
    let totalPurchase     = 0;

    

    for(let i = 1; i < data.length; i++)
    {
      let product: ProductOperation = new ProductOperation;
      product.code            = data[i][4];    
      product.name            = data[i][3];    
      product.reference       = data[i][2];   
      product.number_units    = data[i][9];   
      product.cost_price      = data[i][10];
      product.tax_product     = data[i][11];
      product.sale_price_unit = data[i][13];
      product.category        = environment.clothes;
      product.presentation    = environment.individual;
      product.trademark       = data[i][8]
      product.color           = data[i][7];
      product.size            = data[i][5];
      product.tax             = data[i][11];
      product.type_product    = environment.type_product_purchase;
      
      //Calcuar valores
      let totalProduct        = product.number_units * product.cost_price;
      let discountProduct     = (data[i][12] * totalProduct) / 100; 
      let taxProduct         = Math.round(totalProduct - (totalProduct / (1+(product.tax/100))));
      
      product.value_tax       = taxProduct;
      product.discount        = discountProduct;
      product.total_product   = totalProduct - discountProduct;
      product.subtotal        = totalProduct - taxProduct;
      
      //Calculo del valor de la factura
      totalTax                = Math.round(totalTax + product.value_tax);
      subtotal                = Math.round(subtotal + product.subtotal);
      
      this.operation.products_list.push(product);
      descuento = descuento + discountProduct;
    }

    this.operation.total_discounts    = descuento;
    this.operation.subtotal_operation = subtotal;
    this.operation.total_tax          = totalTax;
    this.operation.total_operation    = subtotal + totalTax;
  }

  private initUpdForm() {
    this.orderFileForm = this.fb.group({
      type_payment: [environment.efecty_payment, Validators.required],
      total_purchase: [this.operation.total_operation - this.operation.total_discounts ],
      value_payment: [0,Validators.max(this.operation.total_operation - this.operation.total_discounts)],
    });
  }

  public updateState(){
    let type_payment = this.orderFileForm.value.type_payment;
    if(type_payment === environment.efecty_payment){
      this.operation.state_operation = environment.state_payment_purchase;
    }
    else{
      this.operation.state_operation = environment.state_opened_purchase;
    }
    this.operation.payment_type = type_payment;
  }

  public createPurchaseFile(){
    this.operation.value_payment = this.orderFileForm.value.value_payment;
    this.operation.payment_type  = this.orderFileForm.value.type_payment;

    this.create.emit(this.operation);
  }

   /**
   * Funciones para verificar si los formularios son obligatorios o no.
   */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.orderFileForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.orderFileForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.orderFileForm, controlName, errorCode);
  }
}
