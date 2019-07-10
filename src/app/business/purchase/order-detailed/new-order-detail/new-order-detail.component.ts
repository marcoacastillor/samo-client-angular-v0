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
      fk_id_vendedor: [this.activeUser.fk_id_person],
      fk_id_provider: ['',Validators.required],
      nit_provider: [''],
      name_provider:[''],
      operation_type: [environment.purchase],
      payment_type: ['',Validators.required],
      state_operation: [environment.state_initial_purchase],
      number_invoice: ['',Validators.required],
      date_operation: [moment().format('YYYY-MM-DD')],
      subtotal_operation: [0],
      total_operation: [0],
      total_tax: [0],
      total_discounts: [0],
      type_discount: [''],
      total_pays: [0],
      product: this.fb.group({
        code_product: [''],
        name_product: [''],
        presentation: [''],
        number_selected:['0'],
        value_unit: ['0'],
        type_tax: [''],
        tax_product:['0',Validators.required],
        value_tax: '0',
        value_total_product: ['0']
      }),
      selected_products: this.fb.array([])
    })
  }

  get selected_products() {
    return this.operationForm.get('selected_products') as FormArray;
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
          lstProviders => this.lstProviders = lstProviders
        )
      }
    }
  }

  selectProvider(provider: Enterprise){
    this.enterprise = provider;
    this.lstProviders = [];
    this.operationForm.patchValue({
      fk_id_provider: provider.pk_id_enterprise,
      nit_provider: provider.nit,
      name_provider: provider.name
    })
  }


  onFindProduct(filter: any){
    let codeProduct = (<HTMLInputElement>document.getElementById('filterProduct')).value;
    this.lstProducts = [];

    if (codeProduct.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.productService.getByCodeFilterAndType$(codeProduct,environment.type_product_purchase).subscribe(
            lstProducts => this.lstProducts = lstProducts
        )
      }
    }
  }

  selectProduct(product: Product){
    this.product = product;
    this.lstProducts = [];
    this.operationForm.get('product').patchValue({
      code_product: product.code
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
    let units             = this.operationForm.get('product').value.number_selected;
    let value             = this.operationForm.get('product').value.value_unit;
    let presentation      = this.product.presentation;
    let name              = this.product.name;
    
    //Calcular el valor de compra
    totalProduct      = units * value;
    
    //Calcular impuesto para producto
    let value_tax_product = Math.round(totalProduct - (totalProduct / (1+(tax_product/100))));
    
    //Calculo del valor de la factura
    subTotalOperation       = Math.round(subTotalOperation + (totalProduct-value_tax_product));
    totalTaxOperation     = Math.round(totalTaxOperation + value_tax_product);
    totalOperation         = Math.round(subTotalOperation + totalTaxOperation);
     
    //Actualizar datos para producto seleccionado
    this.operationForm.get('product').patchValue({
      value_tax: value_tax_product,
      name_product: name,
      value_total_product: totalProduct,
      presentation: presentation
    });
    
    this.operationForm.patchValue({
      subtotal_operation: subTotalOperation,
      total_operation: totalOperation,
      total_tax: totalTaxOperation,
    });

    //Sacar producto para agregarlo
    let prd = this.fb.group(this.operationForm.get('product').value);
    
    //Agregar producto a listado
    this.selected_products.push(prd);
    
    //resetear los valores del producto.
    this.operationForm.get('product').patchValue({
      code_product: '',
      name_product: '',
      presentation: '',
      number_selected: '0',
      value_unit: '0',
      value_tax: '0',
      tax_product: 0,
      value_total_product: '0'
    });

    //resetear producto seleccionado con código de barras.
    this.nameField.nativeElement.focus();

    //limpiar producto seleccionado.
    this.product = new Product();
  }

  saveProduct(){
    this.operationService.storeOperationPurchase$(this.operationForm.value).subscribe(
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

    this.selected_products.removeAt(idx);
  }
}
