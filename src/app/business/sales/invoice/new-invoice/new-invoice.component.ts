import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { faPlusCircle, faMinusCircle, faHandPointUp, faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Operation } from 'src/app/shared/models/operation';
import { Parameter } from 'src/app/shared/models/parameter';
import { Product } from 'src/app/shared/models/product';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { ProductOperation } from 'src/app/shared/models/product-operation';
import { environment } from 'src/environments/environment';
import { Person } from 'src/app/shared/models/person';

@Component({
  selector: 'app-new-invoice',
  templateUrl: 'new-invoice.component.html',
  styles: []
})
export class NewInvoiceComponent implements OnInit, OnChanges {
  operationForm: FormGroup;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faHandPaper = faHandPointUp;
  faCogs = faCog;
  faSearch =faSearch;

  public mode: string = 'auto';
  public efecty_payment: string = environment.efecty_payment;
  
  @ViewChild('code_product') nameField: ElementRef;
  
  @Input() public operation: Operation;
  @Input() public paymentTypeList: Parameter[];
  @Input() public discountsList: Parameter[];
  @Input() public typeIdsList: Parameter[];
  @Input() public taxesList: Parameter[];
  @Input() public product: Product;
  @Input() public client: Person;

  @Output() public getByCode = new EventEmitter<string>();
  @Output() public resetProduct = new EventEmitter<Product>();
  @Output() public create = new EventEmitter<Operation>();
  @Output() public getPerson = new EventEmitter<Person>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { }
  
  ngOnInit() {
    this.initUpdForm();
  }

  public setMode(mode: string){
    this.mode = mode;
  }

  public onSelect(code: string){
    this.loadProductByCode(code);
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.product)
    {
      if(changes.product.currentValue.code)
      {
        this.updFormProduct(changes.product.currentValue);
        if(this.mode =='auto')
        {
          if(changes.product.currentValue.presentation == environment.individual){
            this.addProduct();
          }
        }
      }
    }

    if(changes.client)
    {
      if(changes.client.currentValue.names)
      {
        this.updFormClient(changes.client.currentValue);
      }
    }
  }

  private updFormClient(client: Person){
    //resetear los valores del producto.
    this.operationForm.get('client').patchValue({
      number_id: client.number_id,
      type_id: client.type_id,
      names: client.names,
      last_names: client.last_names,
      address: client.address,
      phone: client.phone,
    });
  }

  private updFormProduct(product: Product){
    //resetear los valores del producto.
    this.operationForm.get('product_new').patchValue({
      name_product: product.name,
      code_product: product.code,
      units_product: '1',
      package_product: '0',
      tax_product: '19',
      value_tax:['0'],
      value_product_package: product.sale_price_package,
      value_product_unit: product.sale_price_unit,
      value_total_product: '0',
    });
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm() {
  let prdList: ProductOperation[] = [];
  this.operationForm = this.fb.group({
    operation_type: [this.operation.operation_type],
    fk_id_person: [this.operation.fk_id_person],
    fk_id_enterprise: [this.operation.fk_id_enterprise],
    type_payment: [environment.efecty_payment, Validators.required],
    state_operation: [environment.state_payment_purchase],
    subtotal_operation: [this.operation.subtotal_operation],
    total_operation: [this.operation.total_operation],
    total_discounts: ['0'],
    total_taxes: ['0'],
    value_discount:['0', Validators.required],
    value_payment:['0'],
    products_list: this.fb.array(prdList),
    product_new: this.fb.group({
      code_product: ['',],
      name_product: ['',],
      units_product: ['1',[Validators.required,Validators.max(this.product.units_available)]],
      package_product: ['0',[Validators.required,Validators.max(this.product.units_available/this.product.units_package)]],
      value_product_package: ['0'],
      value_product_unit: ['0'],
      tax_product: ['19'],
      value_tax:['0'],
      value_total_product: ['0'],
    }),
    client: this.fb.group({
     number_id: [this.client.number_id],
     type_id: [this.client.type_id],
     names: [this.client.names],
     last_names: [this.client.last_names],
     address: [this.client.address],
     phone: [this.client.phone],
     rol_enterprise: [environment.rol_client],
     state:[environment.state_rol_person_active]
    })
   });
 }

get products_list(): FormArray {
  return this.operationForm.get('products_list') as FormArray;
}

public loadProductByCode(code: string){
  this.operationForm.get('product_new').reset();
  this.getByCode.emit(code);
}

public loadClient(){
  this.getPerson.emit(this.operationForm.get('client').value);
}

public addProduct(){
    let total_product   = 0;
    let total_operation = 0;
    let subtotal_operation   = this.operationForm.value.subtotal_operation;
    let total_tax_operation  = this.operationForm.value.total_taxes;

    let tax_product       = this.operationForm.get('product_new').value.tax_product;
    let units             = this.operationForm.get('product_new').value.units_product;
    let package_product   = this.operationForm.get('product_new').value.package_product;
    let value_unit        = this.operationForm.get('product_new').value.value_product_unit;
    let value_package     = this.operationForm.get('product_new').value.value_product_package;
    
    //Calcular valor de compra por producto
    total_product         = Number(units * value_unit) + Number( package_product * value_package); 
    
    //Calcular impuesto para producto
    let value_tax_product = Math.round(total_product - (total_product / (1+(tax_product/100))));

    //Calcular valores para factura
    subtotal_operation       = Math.round(subtotal_operation + (total_product-value_tax_product));
    total_tax_operation      = Math.round(total_tax_operation + value_tax_product);
    total_operation          = Math.round(subtotal_operation + total_tax_operation);
    
    //Actualizar datos para producto seleccionado
    this.operationForm.get('product_new').patchValue({
      value_tax: value_tax_product,
      value_total_product: total_product,
    });

    //Sacar producto para agregarlo
    let prd = this.fb.group(this.operationForm.get('product_new').value);
    
    //Agregar producto a listado
    this.products_list.push(prd);

    //Modificar valor general de la operación
    this.operationForm.patchValue({
        subtotal_operation: subtotal_operation,
        total_operation: total_operation,
        total_taxes: total_tax_operation
    });

    //resetear los valores del producto.
    this.operationForm.get('product_new').patchValue({
      name_product: '',
      code_product: '',
      units_product: '1',
      package_product: '0',
      value_product_package: '0',
      value_product_unit: '0',
      value_total_product: '0',
      value_tax: '0'
    });

    //resetear producto seleccionado con código de barras.
    this.nameField.nativeElement.focus();
}

public delProduct(prd: any, idx: number){
  let total_tax           = this.operationForm.value.total_taxes; 
  let subtotal_operation   = this.operationForm.value.subtotal_operation;
  let total_product       = prd.value_total_product;
  let tax_producto        = prd.value_tax;
  
  subtotal_operation       = subtotal_operation - (total_product - tax_producto);
  total_tax               = total_tax - tax_producto;
  
  this.operationForm.patchValue({
    subtotal_operation: subtotal_operation,
    total_taxes: total_tax,
    total_operation: (subtotal_operation + total_tax),
  });
  this.products_list.removeAt(idx);
}

public updateDiscount(){
  let taxes_operation      = this.operationForm.value.total_taxes;
  let subtotal_operation   = this.operationForm.value.subtotal_operation;
  let value_discount       = this.operationForm.value.value_discount;
  let total_discount       = (((subtotal_operation + taxes_operation) * value_discount) / 100);
  
  this.operationForm.patchValue({
    total_operation: ((subtotal_operation + taxes_operation)-total_discount),
    total_discounts: total_discount
  });
}

public updateTotalDiscount(){
  let taxes_operation      = this.operationForm.value.total_taxes;
  let subtotal_operation   = this.operationForm.value.subtotal_operation;
  let total_discount       = this.operationForm.value.total_discounts;
  
  this.operationForm.patchValue({
    total_operation: ((subtotal_operation + taxes_operation)-total_discount),
    total_discounts: total_discount
  });
}

public updateState(){
  let state_purchase = this.operationForm.value.type_payment;
  if(state_purchase === 'Efectivo')
  {
    this.operationForm.patchValue({
      state_operation: environment.state_payment_purchase,
    }); 
  }
  else{
    this.operationForm.patchValue({
      state_operation: environment.state_opened_purchase,
    }); 
  }
}

/**
   *  Funciones de creación y actualización
   */
  public createSale(){
    this.create.emit(this.operationForm.value);
    this.initUpdForm();
  }

  public cancelSale(){
    this.initUpdForm();
  }

  public onSaveInvoice(onEvent: boolean){
    this.createSale();
  }

  /**
  * Funciones para verificar si los formularios son obligatorios o no.
  */
  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.operationForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.operationForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.operationForm, controlName, errorCode);
  }

  public getErrorsChild(controlName: string, controlNameChild){
    return this.formToolService.getErrorsChild(this.operationForm, controlName, controlNameChild);
  }

  public mustShowErrorChild(controlName: string, controlNameChild: string) {
    return this.formToolService.mustShowErrorChild(this.operationForm, controlName, controlNameChild);
  }

  public hasErrorChild(controlName: string, controlNameChild: string, errorCode: string): any {
    return this.formToolService.hasErrorChild(this.operationForm, controlName, controlNameChild, errorCode);
  }
}
