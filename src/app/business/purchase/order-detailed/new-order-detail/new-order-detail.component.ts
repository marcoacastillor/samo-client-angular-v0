import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { faThList, faSearch, faCheckCircle, faSave, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { OperationService } from 'src/app/shared/services/operation.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import * as moment from 'moment';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Product } from 'src/app/shared/models/product';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductOperation } from 'src/app/shared/models/product-operation';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { Parameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-new-order-detail',
  templateUrl:'new-order-detail.component.html',
  styles: []
})
export class NewOrderDetailComponent implements OnInit {
  faThList = faThList;
  faSearch = faSearch;
  faCheckCircle = faCheckCircle;
  faSave = faSave;
  faPlusCircle = faPlusCircle;
  faTrashAlt = faTrashAlt;

  activeUser: User = new User();
  
  operationForm: FormGroup;

  enterprise: Enterprise = new Enterprise();
  product: Product = new Product();

  lstProviders: Enterprise[] = [];
  lstProvidersModal: Enterprise[] = [];

  lstProducts: Product[] = [];
  lstProductsModal: Product[] = [];
  lstParams: Parameter[] = [];

  type_payment    = environment.type_payment;
  taxes           = environment.tax_purchase;
  credit_payment  = environment.credit_payment;
  categories      = {'categories' : [this.type_payment,this.taxes]};

  @ViewChild('code_product') nameField: ElementRef;
  lastkeydown1 = 0;
  success = false;
  message = '';
  emptyProv = false;
  emptyPrd = false;

  constructor(
    private operationService: OperationService,
    private fb: FormBuilder,
    private globalStore: GlobalStoreService,
    private enterpriseService: EnterpriseService,
    private productService: ProductService,
    private parameterService: ParameterService
  ) { }

  ngOnInit() {
    this.activeUser = this.globalStore.getUser();
    this.getMultipleParams();
    this.initForm();
  }

  private getMultipleParams(){
    this.parameterService.getByMultipleCodeCategory$(this.categories).subscribe(
      lstParams => this.lstParams = lstParams
    )
  }

  private initForm(){
    this.operationForm = this.fb.group({
      fk_id_person: [this.activeUser.fk_id_person],
      operation_type: [environment.purchase],
      state_operation: [environment.state_initial_purchase],
      total_operation: [0],
      total_tax: [0],
      total_discounts: [0],
      external_reference: ['',Validators.required],
      number_invoice: ['',Validators.required],
      subtotal_operation: [0],
      value_payment: [0],
      value_received:[0],
      payment_type: [environment.efecty_payment,Validators.required],
      date_operation: [moment().format('YYYY-MM-DD')],
      product: this.fb.group({
        code: [''],
        name: [''],
        reference: [''],
        number_units:['0'],
        cost_price: ['0'],
        tax_product: ['0'],
        sale_price_unit: [0],
        category: [''],
        presentation: [''],
        trademark: [''],
        color: [''],
        size: [''],
        tax: [''],
        type_product: [''],
        value_tax: [0],
        discount: [0],
        subtotal: [0],
        total_product: [0],        
      }),
      products_list: this.fb.array([])
    })
  }

  get products_list() {
    return this.operationForm.get('products_list') as FormArray;
  }

  onSubmit(){
    this.saveProduct();
  }

  onFindProvider(filter: any){
    let codeProvider = (<HTMLInputElement>document.getElementById('filterProvider')).value;
    this.lstProviders = [];

    if (codeProvider.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.enterpriseService.getByCodeFilter$(codeProvider, environment.enterprise_provider).subscribe(
          lstProviders => this.lstProviders = lstProviders,
          () => this.emptyProv = true
        )
      }
    }
  }

  selectProvider(provider: Enterprise){
    this.enterprise = provider;
    this.lstProviders = [];
    this.operationForm.patchValue({
      external_reference: provider.nit
    })
  }


  onFindProduct(filter: any){
    let codeProduct = (<HTMLInputElement>document.getElementById('filterProduct')).value;
    this.lstProducts = [];
    
    if (codeProduct.length > 0) {
      this.emptyPrd =false;
      
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.productService.getByCodeFilterAndType$(codeProduct).subscribe(
            lstProducts => this.lstProducts = lstProducts,
            () => this.emptyPrd = true
        )
      }
    }
  }

  selectProduct(product: Product){
    this.product = product;
    this.lstProducts = [];
    this.operationForm.get('product').patchValue({
      code: product.code
    });

    //pone el focus sobre el input de código.
    this.nameField.nativeElement.focus();
  }

  loadAllProviders(){
    this.enterpriseService.getByType$(environment.enterprise_provider).subscribe(
      lstProviders => this.lstProvidersModal = lstProviders
    )
  }
  
  public addProduct(){
    let totalProduct       = 0;
    let totalOperation     = 0;
    let subTotalOperation  = this.operationForm.value.subtotal_operation;
    let totalTaxOperation  = this.operationForm.value.total_tax;

    let tax_product       = this.operationForm.get('product').value.tax_product;
    let units             = this.operationForm.get('product').value.number_units;
    let value             = this.operationForm.get('product').value.cost_price;
    let presentation      = this.product.presentation;
    let name              = this.product.name;
    
    //Calcular el valor de compra
    totalProduct      = units * value;
    
    //Calcular impuesto para producto
    let value_tax_product = (totalProduct - (totalProduct / (1+(tax_product/100))));
    
    //Calculo del valor de la factura
    subTotalOperation       = Math.round(subTotalOperation + (totalProduct-value_tax_product));
    totalTaxOperation       = Math.round(totalTaxOperation + value_tax_product);
    totalOperation          = Math.round(subTotalOperation + totalTaxOperation);
     
    //Actualizar datos para producto seleccionado
    this.operationForm.get('product').patchValue({
      value_tax: value_tax_product,
      name: name,
      total_product: totalProduct,
      presentation: presentation
    });
    
    this.operationForm.patchValue({
      subtotal_operation: subTotalOperation,
      total_operation: totalOperation,
      total_tax: totalTaxOperation,
      value_payment: Math.round(totalOperation - this.operationForm.value.total_discounts)
    });

    //Sacar producto para agregarlo
    let prd = this.fb.group(this.operationForm.get('product').value);
    
    //Agregar producto a listado
    this.products_list.push(prd);
    
    //resetear los valores del producto.
    this.operationForm.get('product').patchValue({
      code: '',
      name: '',
      presentation: '',
      number_units: 0,
      cost_price: 0,
      value_tax: 0,
      tax_product: '0',
      total_product: 0
    });

    //resetear producto seleccionado con código de barras.
    this.nameField.nativeElement.focus();

    //limpiar producto seleccionado.
    this.product = new Product();
  }

  saveProduct(){
    this.operationService.storeOperation$(this.operationForm.value).subscribe(
      () => {
        this.initForm();
        this.enterprise = new Enterprise();
        this.success = true;
        this.message = 'Se realizó la creación de la factura con éxito.';
      }
    )
  }

  public delProduct(prd: any, idx: number){
    let total_tax             = this.operationForm.value.total_tax; 
    let subtotal_operation    = this.operationForm.value.subtotal_operation;
    let total_product         = prd.value_total_product;
    let value_tax             = prd.value_tax;
    
    subtotal_operation       = subtotal_operation - (total_product - value_tax);
    total_tax                 = total_tax - value_tax;
    
    this.operationForm.patchValue({
      subtotal_operation: subtotal_operation,
      total_tax: total_tax,
      total_operation: (subtotal_operation + total_tax),
    });

    this.products_list.removeAt(idx);
  }
}
