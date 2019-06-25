import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { Purchase } from 'src/app/shared/models/purchase';
import { Parameter } from 'src/app/shared/models/parameter';
import { ProductOperation } from 'src/app/shared/models/product-operation';
import { faPlusCircle, faTrashAlt, faMinusCircle, faMinusSquare, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/shared/models/product';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-order',
  templateUrl: 'new-order.component.html',
  styles: []
})
export class NewOrderComponent implements OnInit, OnChanges {
  purchaseForm: FormGroup;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faSearch = faSearch;

  @ViewChild('code_product') nameField: ElementRef;

  @Input() public purchase: Purchase;
  @Input() public providerList: Enterprise[];
  @Input() public categoryList: Parameter[];
  @Input() public presentationList: Parameter[];
  @Input() public paymentTypeList: Parameter[];
  @Input() public taxesList: Parameter[];
  @Input() public discountsList: Parameter[];
  @Input() public product: Product;
  
  @Output() public getByCode = new EventEmitter<string>();
  @Output() public resetProduct = new EventEmitter<Product>();
  @Output() public create = new EventEmitter<Purchase>();
  @Output() public update = new EventEmitter<Purchase>();
  @Output() public cancel = new EventEmitter<boolean>();

  @Output() public createProduct = new EventEmitter<Product>();
  @Output() public createEnterprise = new EventEmitter<Enterprise>();

  public credit_payment: string = environment.credit_payment;
  
  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  public onSelect(code: string){
    this.loadProductByCode(code);
  }
  
  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.product)
    {
      if(changes.product.currentValue.pk_id_product)
      {
        this.updFormProduct();
      }
    }
  }

  private updFormProduct(){
    //resetear los valores del producto.
    this.purchaseForm.get('product_new').patchValue({
      category: this.product.category,
      name_product: this.product.name,
      code_product: this.product.code,
      package_product: '0',
      units_product: '0',
      value_product: '0',
      tax_product: '19',
      value_tax: '0',
      value_total_product: '0',
      presentation: this.product.presentation
    });
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm() {
    let prdList: ProductOperation[] = [];
    this.purchaseForm = this.fb.group({
      fk_id_provider: [this.purchase.fk_id_provider,Validators.required],
      fk_id_person: [this.purchase.fk_id_person],
      operation_type: [this.purchase.operation_type],
      type_payment: [environment.efecty_payment, Validators.required],
      state_purchase: [environment.state_payment_purchase],
      number_invoice: [this.purchase.number_invoice, Validators.required],
      subtotal_purchase: [this.purchase.subtotal_purchase],
      total_purchase: [this.purchase.total_purchase],
      total_discounts: [this.purchase.total_discounts,Validators.required],
      value_discount:[this.purchase.value_discount],
      total_taxes:[this.purchase.total_taxes],
      value_payment: ['0'],
      products_list: this.fb.array(prdList),
      product_new: this.fb.group({
        code_product: [''],
        name_product: [''],
        package_product: ['0'],
        units_product:['0'],
        value_product: ['0'],
        tax_product:['19',Validators.required],
        value_tax: '0',
        value_total_product: ['0'],
        presentation: ['']
      })
    });
  }

  get products_list(): FormArray {
    return this.purchaseForm.get('products_list') as FormArray;
  }

  public addProduct(){
    let totalProduct      = 0;
    let totalPurchase     = 0;
    let subTotalPuchase   = this.purchaseForm.value.subtotal_purchase;
    let totalTaxPurchase  = this.purchaseForm.value.total_taxes;

    let tax_product       = this.purchaseForm.get('product_new').value.tax_product;
    let units             = this.purchaseForm.get('product_new').value.units_product;
    let value             = this.purchaseForm.get('product_new').value.value_product;
    let presentation      = this.product.presentation;
    
    //Calcular el valor de compra
    totalProduct      = units * value;
    
    //Calcular impuesto para producto
    let value_tax_product = Math.round(totalProduct - (totalProduct / (1+(tax_product/100))));
    
    //Calculo del valor de la factura
    subTotalPuchase       = Math.round(subTotalPuchase + (totalProduct-value_tax_product));
    totalTaxPurchase      = Math.round(totalTaxPurchase + value_tax_product);
    totalPurchase         = Math.round(subTotalPuchase + totalTaxPurchase);
     
    //Actualizar datos para producto seleccionado
    this.purchaseForm.get('product_new').patchValue({
      value_tax: value_tax_product,
      value_total_product: totalProduct,
      presentation: presentation
    });
    
    this.purchaseForm.patchValue({
      subtotal_purchase: subTotalPuchase,
      total_purchase: totalPurchase,
      total_taxes: totalTaxPurchase,
    });

    //Sacar producto para agregarlo
    let prd = this.fb.group(this.purchaseForm.get('product_new').value);
    
    //Agregar producto a listado
    this.products_list.push(prd);
    
    //resetear los valores del producto.
    this.purchaseForm.get('product_new').patchValue({
      name_product: '',
      code_product: '',
      package_product: '0',
      units_product: '0',
      value_product: '0',
      value_total_product: '0',
      value_tax: '0'
    });

    //resetear producto seleccionado con código de barras.
    this.nameField.nativeElement.focus();
    this.resetProduct.emit(new Product);
  }

  public delProduct(prd: any, idx: number){
    let total_tax           = this.purchaseForm.value.total_taxes; 
    let subtotal_purchase   = this.purchaseForm.value.subtotal_purchase;
    let total_product       = prd.value_total_product;
    let tax_producto        = prd.value_tax;
    
    subtotal_purchase       = subtotal_purchase - (total_product - tax_producto);
    total_tax               = total_tax - tax_producto;
    
    this.purchaseForm.patchValue({
      subtotal_purchase: subtotal_purchase,
      total_taxes: total_tax,
      total_purchase: (subtotal_purchase + total_tax),
    });
    this.products_list.removeAt(idx);
  }

  public updateDiscount(){
    let taxes_purchase      = this.purchaseForm.value.total_taxes;
    let subtotal_purchase   = this.purchaseForm.value.subtotal_purchase;
    let total_discount      = this.purchaseForm.value.total_discounts;
    let value_discount      = (((subtotal_purchase + taxes_purchase) * total_discount) / 100);
    
    //this.purchaseForm.get('product_new').value.value_total_product = totalPurchase;

    this.purchaseForm.patchValue({
      total_purchase: ((subtotal_purchase + taxes_purchase)-value_discount),
      value_discount: value_discount
    });
  }

  public updateState(){
    let state_purchase = this.purchaseForm.value.type_payment;
    if(state_purchase === 'Efectivo')
    {
      this.purchaseForm.patchValue({
        state_purchase: environment.state_payment_purchase,
      }); 
    }
    else{
      this.purchaseForm.patchValue({
        state_purchase: environment.state_opened_purchase,
      }); 
    }
  }

  public loadProductByCode(code: string){
    this.purchaseForm.get('product_new').reset();
    this.getByCode.emit(code);
  }

  /**
   *  Funciones de creación y actualización
   */
  public createPurchase(){
    this.create.emit(this.purchaseForm.value);
    this.initUpdForm();
  }

  public updatePurchase(){
    this.update.emit(this.purchaseForm.value);
  }

  public cancelPurchase(){
    this.initUpdForm();
  }

  /**
   * Funciones para crear producto 
   */
  public onCreateProduct(product: Product){
    this.createProduct.emit(product);
  }

  public onCreateEnterprise(enterprise: Enterprise){
    this.createEnterprise.emit(enterprise);
  }

  /**
   * Funciones para verificar si los formularios son obligatorios o no.
   */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.purchaseForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.purchaseForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.purchaseForm, controlName, errorCode);
  }

  public getErrorsChild(controlName: string, controlNameChild){
    return this.formToolService.getErrorsChild(this.purchaseForm, controlName, controlNameChild);
  }

  public mustShowErrorChild(controlName: string, controlNameChild: string) {
    return this.formToolService.mustShowErrorChild(this.purchaseForm, controlName, controlNameChild);
  }

  public hasErrorChild(controlName: string, controlNameChild: string, errorCode: string): any {
    return this.formToolService.hasErrorChild(this.purchaseForm, controlName, controlNameChild, errorCode);
  }
}

