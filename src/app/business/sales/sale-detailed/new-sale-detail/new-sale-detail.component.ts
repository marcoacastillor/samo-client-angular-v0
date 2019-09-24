import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { faThList, faSearch, faCheckCircle, faSave, faPlusCircle, faTrashAlt, faEye, faClone, faDonate, faUnderline, faArchive } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/models/user';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { Parameter } from 'src/app/shared/models/parameter';
import { environment } from 'src/environments/environment';
import { OperationService } from 'src/app/shared/services/operation.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import * as moment from 'moment';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/shared/services/person.service';
import { tap } from 'rxjs/operators';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { ParameterConfig } from 'src/app/shared/models/parameter-config';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { ParameterConfigService } from 'src/app/shared/services/parameter-config.service';
import { Operation } from 'src/app/shared/models/operation';

@Component({
  selector: 'app-new-sale-detail',
  templateUrl: 'new-sale-detail.component.html',
  styles: []
})
export class NewSaleDetailComponent implements OnInit {
  pk_id_operation = 0;
  faThList = faThList;
  faSearch = faSearch;
  faCheckCircle = faCheckCircle;
  faSave = faSave;
  faPlusCircle = faPlusCircle;
  faTrashAlt = faTrashAlt;
  faEye = faEye;
  faClone = faClone;
  faDonate = faDonate;
  faUnderline = faUnderline;
  faArchive = faArchive;

  activeUser: User = new User();
  
  operationForm: FormGroup;

  person: Person = new Person();
  product: Product = new Product();
  enterprise: Enterprise = new Enterprise();
  lstParameters: ParameterConfig[] = [];

  lstClients: Person[] = [];
  lstClientsModal: Person[] = [];

  lstProducts: Product[] = [];
  lstProductsByName: Product[] = [];
  lstProductsModal: Product[] = [];
  lstParams: Parameter[] = [];

  type_payment    = environment.type_payment;
  taxes           = environment.tax_purchase;
  type_id         = environment.type_ids;
  credit_payment  = environment.credit_payment;
  separated_payment = environment.separated_payment;

  //Valores para actualizar los valores de facturación activas.
  code_paramSelected    = '';
  value_paramSelected   = '';
  selectedPresentation  = '';
  units_available = 0;

  categories      = {'categories' : [this.type_payment,this.taxes,this.type_id]};

  @ViewChild('code_product') nameField: ElementRef;
  @ViewChild('number_units') numberUnits: ElementRef;

  lastkeydown1 = 0;
  success = false;
  message = '';
  emptyCli = false;
  emptyPrd = false;

  url_storage: string = environment.url_sales_storage;

  constructor(
    private operationService: OperationService,
    private fb: FormBuilder,
    private globalStore: GlobalStoreService,
    private personService: PersonService,
    private productService: ProductService,
    private parameterService: ParameterService,
    private enterpriseService: EnterpriseService,
    private parameterConfigService: ParameterConfigService
  ) { }

  ngOnInit() {
    this.activeUser = this.globalStore.getUser();
    this.getMultipleParams();
    this.initForm();
    this.loadClientOther();
  }

  private loadClientOther(){
    this.personService.getByTypeAndNumberId$('CC','999999').subscribe(
      person => {
        this.person = person;
        this.selectClient(person);
      }
    )
  }

  public selectNumberSale(){
    let number_sale = '';
    let prefix_sale = this.getParameters(environment.prefix_sale);
    let current_sale = this.getParameters(environment.current_sale);
      
    if(prefix_sale){
      if(current_sale){
        number_sale = prefix_sale + (Number(current_sale) + 1);
      }
      else{
        number_sale = prefix_sale +'1';
      }
    }
    else{
      if(current_sale){
        number_sale = (Number(current_sale) + 1).toString();
      }
      else{
        number_sale = '1';
      }
    }
    
    //Actualizar datos sobre numeración de facturas
    this.code_paramSelected    = environment.current_sale;
    this.value_paramSelected   = (Number(current_sale) + 1).toString();

    this.operationForm.patchValue({
      number_invoice: number_sale,
      current_invoice: (Number(current_sale) + 1)
    });
  }

  public selectNumberInvoice(){
    let next_number = 0;
    let number_invoice = '';
    let enterprise_fact = this.getParameters(environment.enterprise_fact);
    let prefix_invoice = this.getParameters(environment.prefix_invoice);
    let current_invoice = this.getParameters(environment.current_invoice);
    let invoice_init = this.getParameters(environment.invoice_init);
    let invoice_end = this.getParameters(environment.invoice_end);

    if(enterprise_fact == 'true')
    {
      if(prefix_invoice){
        if(current_invoice){
          next_number = Number(current_invoice) + 1;
          if(next_number > Number(invoice_end)){
            number_invoice = '';
          }
          else{
            number_invoice = prefix_invoice + (next_number) 
          }
        }
        else{
          number_invoice = (Number(invoice_init)).toString();
        }
      }
      else{
        if(current_invoice){
          next_number = Number(current_invoice) + 1;
          if(next_number > Number(invoice_end)){
            number_invoice = '';
          }
          else{
            number_invoice = (next_number).toString(); 
          }
        }
        else
        {
          if(invoice_init)
          {
            number_invoice = (Number(invoice_init)).toString();
          }
          else{
            number_invoice = '';
          }
        }
      }
    }
    else
    {
      number_invoice = ''; 
    }

    //Actualizar datos sobre numeración de facturas
    this.code_paramSelected    = environment.current_invoice;
    this.value_paramSelected   = (Number(number_invoice)).toString();

    this.operationForm.patchValue({
      number_invoice: number_invoice,
      current_invoice: (Number(number_invoice) + 1)
    });
  }

  private getParameters(code: string)
  {
    const resultado = this.lstParameters.filter( parameter => parameter.code === code );
    if(resultado[0].value != code)
      return resultado[0].value;
    else
      return null;
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
        this.selectNumberSale();
      }
    )
  }

  private initForm(){
    this.operationForm = this.fb.group({
      fk_id_person: [this.activeUser.fk_id_person],
      operation_type: [environment.sales],
      state_operation: [environment.state_initial_purchase],
      total_operation: [0],
      total_tax: [0],
      total_discounts: [0],
      external_reference: ['',Validators.required],
      number_invoice: ['',Validators.required],
      subtotal_operation: [0],
      value_payment: [0],
      payment_type: [environment.efecty_payment,Validators.required],
      value_received:[0],
      current_invoice: [0],
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
      client: this.fb.group({
        type_id: [''],
        number_id: [''],
        names: [''],
        last_names: [''],
        address: [''],
        phone: [''],
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

  onFindClient(filter: any){
    let idClient = (<HTMLInputElement>document.getElementById('filterClient')).value;
    this.lstClients = [];

    if (idClient.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.personService.getPersonsByIdFilter$(idClient).subscribe(
          lstClients => {
            this.lstClients = lstClients;
            this.emptyCli = false;
          },
          () => {
            this.emptyCli = true;
            this.person = new Person;
            this.operationForm.get('client').patchValue({
              number_id: this.operationForm.value.external_reference
            })
          }
        )
      }
    }
  }

  selectClient(person: Person){
    this.emptyCli = false;
    this.person = person;
    this.lstClients = [];
    this.operationForm.patchValue({
      external_reference: person.pk_id_person
    })
  }


  onFindProduct(filter: any){
    let codeProduct = (<HTMLInputElement>document.getElementById('filterProduct')).value;
    this.lstProducts = [];

    if (codeProduct.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.productService.getSalesProductsByCodeFilter$(codeProduct).subscribe(
            lstProducts => {
              this.lstProducts = lstProducts;
              if(lstProducts.length == 1){
                this.selectProduct(lstProducts[0]);
              }
              this.emptyPrd = false;
            },
            () => {
              this.emptyPrd = true;
              this.product = new Product;
            }
        )
      }
    }
  }

  onFindProductByName(filter: any){
    let nameProduct = (<HTMLInputElement>document.getElementById('nameProduct')).value;
    this.lstProductsByName = [];

    if (nameProduct.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.productService.getSalesProductsByNameFilter$(nameProduct).subscribe(
            lstProducts => {
              this.lstProductsByName = lstProducts;
              if(lstProducts.length == 1){
                this.selectProduct(lstProducts[0]);
              }
              this.emptyPrd = false;
            },
            () => this.emptyPrd = true
        )
      }
    }
  }

  selectProduct(product: Product){
    let cost_price = 0;
    
    this.emptyPrd = false;
    this.product = product;
    this.lstProducts = [];
    this.lstProductsByName = [];
    
    if(this.product.presentation === environment.individual)
    {
      cost_price = this.product.sale_price_unit;
      this.setUnitsByProduct();
    }
    else
    {
      cost_price = this.product.sale_price_package;
      this.setPackageByProduct();
    }

    this.operationForm.get('product').patchValue({
      code: product.code,
      cost_price: cost_price,
      number_units: 1
    });

    //pone el focus sobre el input de código.
    this.numberUnits.nativeElement.focus();
  }

  public setUnitsByProduct(){
    this.units_available = this.product.units_available;
    this.selectedPresentation = 'INDIVIDUAL';
    this.operationForm.get('product').patchValue({
      cost_price: this.product.sale_price_unit,
      presentation: 'INDIVIDUAL'
    });
  }

  public setPackageByProduct(){
    this.units_available = this.product.units_available / this.product.units_package;
    this.selectedPresentation = 'PAQUETE';
    this.operationForm.get('product').patchValue({
      cost_price: this.product.sale_price_package,
      presentation: 'PAQUETE'
    });
  }

  public addProduct(){
    let value_payment      = 0;
    let totalProduct       = 0;
    let totalOperation     = 0;
    let subTotalOperation  = this.operationForm.value.subtotal_operation;
    let totalTaxOperation  = this.operationForm.value.total_tax;

    let tax_product       = this.operationForm.get('product').value.tax_product;
    let units             = this.operationForm.get('product').value.number_units;
    let value             = this.operationForm.get('product').value.cost_price;
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
      total_product: totalProduct
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

  updatePaymentValue(){
    if(this.operationForm.value.payment_type != environment.efecty_payment){
      this.operationForm.patchValue({
        value_payment: 0
      });
    }
    else{
      this.operationForm.patchValue({
        value_payment: Math.round(this.operationForm.value.total_operation - this.operationForm.value.total_discounts)
      });
    }
  }

  saveProductAndPrint(){
    this.operationService.storeOperation$(this.operationForm.value)
    .pipe(
      tap((operation:Operation) => {
        this.initForm();
        this.pk_id_operation = operation.pk_id_operation;
        this.person = new Person();
        this.success = true;
        this.message = 'Se realizó la creación de la factura con éxito.';
      }),
      tap(() => {
        this.parameterConfigService.updateByEnterpriseAndCodeAndValue$(this.activeUser.fk_id_enterprise,this.code_paramSelected,this.value_paramSelected).subscribe(
          () => { this.getParametersByEnterprise();}
        )
      }),
      tap((operation:Operation) => {
        this.operationService.getOperationPDF$(operation.pk_id_operation).subscribe(
          (path:string) => {
            let configuracion_ventana = "menubar=no,width=800,height=1200,location=yes,resizable=yes,scrollbars=yes,status=yes";
            let w = window.open(this.url_storage + path,"_blank", configuracion_ventana);
            //w.focus();
            //w.print();
            //w.close();         
          }
        )
      }),
      tap(() => this.loadClientOther())
    )
    .subscribe()
  }

  saveProduct(){
    this.operationService.storeOperation$(this.operationForm.value)
    .pipe(
      tap((operation:Operation) => {
        this.initForm();
        this.pk_id_operation = operation.pk_id_operation;
        this.person = new Person();
        this.success = true;
        this.message = 'Se realizó la creación de la factura con éxito.';
      }),
      tap(() => {
        this.parameterConfigService.updateByEnterpriseAndCodeAndValue$(this.activeUser.fk_id_enterprise,this.code_paramSelected,this.value_paramSelected).subscribe(
          () => { this.getParametersByEnterprise();}
        )
      }),
      tap(() => this.loadClientOther())
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
