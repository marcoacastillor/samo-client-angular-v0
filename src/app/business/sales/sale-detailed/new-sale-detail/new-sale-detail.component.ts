import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { faThList, faSearch, faCheckCircle, faSave, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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

@Component({
  selector: 'app-new-sale-detail',
  templateUrl: 'new-sale-detail.component.html',
  styles: []
})
export class NewSaleDetailComponent implements OnInit {
  faThList = faThList;
  faSearch = faSearch;
  faCheckCircle = faCheckCircle;
  faSave = faSave;
  faPlusCircle = faPlusCircle;
  faTrashAlt = faTrashAlt;

  activeUser: User = new User();
  
  operationForm: FormGroup;

  person: Person = new Person();
  product: Product = new Product();

  lstClients: Person[] = [];
  lstClientsModal: Person[] = [];

  lstProducts: Product[] = [];
  lstProductsModal: Product[] = [];
  lstParams: Parameter[] = [];

  type_payment    = environment.type_payment;
  taxes           = environment.tax_purchase;
  type_id         = environment.type_ids;
  credit_payment  = environment.credit_payment;
  categories      = {'categories' : [this.type_payment,this.taxes,this.type_id]};

  @ViewChild('code_product') nameField: ElementRef;
  lastkeydown1 = 0;
  success = false;
  message = '';
  emptyCli = false;
  emptyPrd = false;

  constructor(
    private operationService: OperationService,
    private fb: FormBuilder,
    private globalStore: GlobalStoreService,
    private personService: PersonService,
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
      operation_type: [environment.sales],
      state_operation: [environment.state_initial_purchase],
      total_operation: [0],
      total_tax: [0],
      total_discounts: [0],
      external_reference: ['',Validators.required],
      number_invoice: ['',Validators.required],
      subtotal_operation: [0],
      value_payment: [0],
      payment_type: ['',Validators.required],
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
      external_reference: person.number_id
    })
  }


  onFindProduct(filter: any){
    let codeProduct = (<HTMLInputElement>document.getElementById('filterProduct')).value;
    this.lstProducts = [];

    if (codeProduct.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.productService.getByCodeFilterAndType$(codeProduct,environment.type_product_purchase).subscribe(
            lstProducts => {
              this.lstProducts = lstProducts;
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

  selectProduct(product: Product){
    let cost_price = 0;

    this.emptyPrd = false;
    this.product = product;
    this.lstProducts = [];

    if(this.product.presentation === environment.individual)
    {
      cost_price = this.product.sale_price_unit;
    }
    else
    {
      cost_price = this.product.sale_price_package;
    }

    this.operationForm.get('product').patchValue({
      code: product.code,
      cost_price: cost_price
    });

    //pone el focus sobre el input de código.
    this.nameField.nativeElement.focus();
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
        this.person = new Person();
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
