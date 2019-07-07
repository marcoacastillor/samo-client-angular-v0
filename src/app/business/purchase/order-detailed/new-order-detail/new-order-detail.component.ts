import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faThList } from '@fortawesome/free-solid-svg-icons';
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

@Component({
  selector: 'app-new-order-detail',
  templateUrl:'new-order-detail.component.html',
  styles: []
})
export class NewOrderDetailComponent implements OnInit {
  faThList = faThList;
  activeUser: User = new User();
  
  operationForm: FormGroup;

  enterprise: Enterprise = new Enterprise();
  product: Product = new Product();

  lstProviders: Enterprise[] = [];
  lstProducts: Product[] = [];

  lastkeydown1 = 0;
  
  constructor(
    private operationService: OperationService,
    private fb: FormBuilder,
    private globalStore: GlobalStoreService,
    private enterpriseService: EnterpriseService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.activeUser = this.globalStore.getUser();
    this.initForm();
  }

  private initForm(){
    this.operationForm = this.fb.group({
      fk_id_vendedor: [this.activeUser.fk_id_person],
      fk_id_provider: [''],
      operation_type: [environment.purchase],
      payment_type: [''],
      state_operation: [environment.state_initial_purchase],
      number_invoice: [''],
      date_operation: [moment().format('YYYY-MM-DD')],
      subtotal_operation: [0],
      total_operation: [0],
      total_tax: [0],
      total_discount: [0],
      total_pays: [0],
      product: this.fb.group({
        code_product: [''],
        name_product: [''],
        presentation: [''],
        number_selected:['0'],
        value_unit: ['0'],
        tax_product:['0',Validators.required],
        value_tax: '0',
        value_total_product: ['0']
      }),
      selected_products: this.fb.array([
        this.fb.control('')
      ])
    })
  }

  get selected_products() {
    return this.operationForm.get('selected_products') as FormArray;
  }

  onSubmit(){
    // TODO: Use EventEmitter con el valor.
    console.warn(this.operationForm.value);
  }

  onFindProvider(filter: any){
    let nameProvider = (<HTMLInputElement>document.getElementById('filterProvider')).value;
    this.lstProviders = [];

    if (nameProvider.length > 2) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.enterpriseService.getByNameFilter$(nameProvider, environment.enterprise_provider).subscribe(
          lstProviders => this.lstProviders = lstProviders
        )
      }
    }
  }

  selectProvider(provider: Enterprise){
    this.enterprise = provider;
    this.lstProviders = [];
    this.operationForm.patchValue({
      fk_id_provider: provider.nit
    })
  }


  onFindProduct(filter: any){
    let nameProduct = (<HTMLInputElement>document.getElementById('filterProduct')).value;
    this.lstProducts = [];

    if (nameProduct.length > 2) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.productService.getByNameFilter$(nameProduct).subscribe(
            lstProducts => this.lstProducts = lstProducts
        )
      }
    }
  }

  selectProduct(product: Product){
    this.product = product;
    this.lstProducts = [];
  }
}
