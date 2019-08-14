import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { faThList, faSearch, faCheckCircle, faSave, faPlusCircle, faTrashAlt, faDonate, faClone } from '@fortawesome/free-solid-svg-icons';
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
import { tap } from 'rxjs/operators';
import { ParameterConfigService } from 'src/app/shared/services/parameter-config.service';
import { ParameterConfig } from 'src/app/shared/models/parameter-config';
import { Operation } from 'src/app/shared/models/operation';

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
  faDonate = faDonate;
  faClone = faClone;
  

  activeUser: User = new User();
  
  operationForm: FormGroup;

  enterprise: Enterprise = new Enterprise();
  product: Product = new Product();

  lstProviders: Enterprise[] = [];
  lstProvidersModal: Enterprise[] = [];

  lstProducts: Product[] = [];
  lstProductsModal: Product[] = [];
  lstParams: Parameter[] = [];
  lstParameters: ParameterConfig[] = [];

  type_payment    = environment.type_payment;
  taxes           = environment.tax_purchase;
  credit_payment  = environment.credit_payment;
  categories      = {'categories' : [this.type_payment,this.taxes]};

  readOnly = false;

  //Valores para actualizar los valores de facturación activas.
  code_paramSelected    = '';
  value_paramSelected   = '';

  @ViewChild('code_product') nameField: ElementRef;
  @ViewChild('number_units') numberUnits: ElementRef;

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
    private parameterService: ParameterService,
    private parameterConfigService: ParameterConfigService
  ) { }

  ngOnInit() {
    this.activeUser = this.globalStore.getUser();
    this.getMultipleParams();
    this.initForm();
    this.selectNumberInvoice();
  }

  public disableNumberInvoice(){
    this.readOnly = false;

    //Actualizar datos sobre numeración de facturas
    let current_purchase = this.getParameters(environment.current_purchase);

    this.code_paramSelected    = environment.current_purchase;
    this.value_paramSelected   = current_purchase;

    this.operationForm.patchValue({
      number_invoice: 0,
      current_invoice: 0
    });
    
  }

  public selectNumberInvoice(){
    let number_invoice = '';
    let enterprise_purchase = this.getParameters(environment.enterprise_purchase_fact);
    let prefix_purchase = this.getParameters(environment.prefix_purchase);
    let current_purchase = this.getParameters(environment.current_purchase);
      
    if(enterprise_purchase){
      if(prefix_purchase){
        if(current_purchase){
          number_invoice = prefix_purchase + (Number(current_purchase) + 1);
        }
        else{
          number_invoice = prefix_purchase +'1';
        }
      }
      this.readOnly = true;
    }
    
    //Actualizar datos sobre numeración de facturas
    this.code_paramSelected    = environment.current_purchase;
    this.value_paramSelected   = (Number(current_purchase) + 1).toString();

    this.operationForm.patchValue({
      number_invoice: number_invoice,
      current_invoice: (Number(current_purchase) + 1)
    });
  }

  
  private getParameters(code: string)
  {
    if(this.lstParameters.length > 0){
      const resultado = this.lstParameters.filter( parameter => parameter.code === code );
    if(resultado[0].value != code)
      return resultado[0].value;
    else
      return null;
    }
    else{
      return null;
    }
  }

  private getMultipleParams(){
    this.parameterService.getByMultipleCodeCategory$(this.categories).pipe(
      tap((params:Parameter[]) => this.lstParams = params),
      tap(() => {
        this.enterpriseService.show$(this.activeUser.fk_id_enterprise).subscribe(
          enterprise =>this.enterprise = enterprise
        )
      }),
      tap(() => {
        this.getParametersByEnterprise();
      }),
    ).subscribe()
  }

  private getParametersByEnterprise(){
    this.parameterConfigService.getByEnterprise$(this.activeUser.fk_id_enterprise).subscribe(
      lstParameters => {
        this.lstParameters = lstParameters;
      }
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
      current_invoice: [0],
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
            lstProducts => {
              this.lstProducts = lstProducts;
              if(lstProducts.length == 1){
                this.selectProduct(lstProducts[0]);
              }
            },
            () => this.emptyPrd = true
        )
      }
    }
  }

  selectProduct(product: Product){
    this.product = product;
    this.lstProducts = [];
    this.operationForm.get('product').patchValue({
      code: product.code,
      number_units: 1,
      cost_price: product.cost_price
    });

    //pone el focus sobre el input de código.
    this.numberUnits.nativeElement.focus();
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
    this.operationService.storeOperation$(this.operationForm.value)
    .pipe(
      tap(() => {
        this.initForm();
        this.enterprise = new Enterprise();
        this.success = true;
        this.message = 'Se realizó la creación de la factura con éxito.';
      }),
      tap(() => {
        this.parameterConfigService.updateByEnterpriseAndCodeAndValue$(this.activeUser.fk_id_enterprise,this.code_paramSelected,this.value_paramSelected).subscribe(
          () => { this.getParametersByEnterprise();}
        )
      })
    )
    .subscribe()
  }

  public delProduct(prd: any, idx: number){
    let total_tax             = this.operationForm.value.total_tax; 
    let subtotal_operation    = this.operationForm.value.subtotal_operation;
    let total_product         = prd.total_product;
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
