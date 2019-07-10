import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faSave, faSearch, faCheckCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Operation } from 'src/app/shared/models/operation';
import { Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/shared/services/product.service';
import { Parameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-form-product-modal',
  templateUrl: 'form-product-modal.component.html',
  styles: []
})
export class FormProductModalComponent implements OnInit, OnChanges {
  productForm: FormGroup;
  faSave = faSave;
  faSearch = faSearch;
  faCheckCircle = faCheckCircle;
  faPlusCircle = faPlusCircle;

  taxes  = environment.tax_purchase;

  @Input() public operation: Operation;
  @Input() public lstParams: Parameter[];

  @Output() public addProduct = new EventEmitter<Operation>();
  @ViewChild('units_product') nameField: ElementRef;
  
  lstProductsCodes: Product[] = [];
  lstProductsNames: Product[] = [];
  product: Product = new Product();

  lastkeydown1 = 0;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.initForm();
    console.log(this.nameField);
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.operation)
    {
      if(changes.operation.currentValue != changes.operation.previousValue)
      {
        this.initForm();
      }
    }
  }

  private initForm(){
    this.productForm = this.fb.group({
      fk_id_product: [this.product.pk_id_product],
      code_product: [this.product.code],
      name_product: [this.product.name],
      fk_id_operation: [this.operation.pk_id_operation],
      number_selected:['0'],
      value_unit: ['0'],
      tax_product:['0',Validators.required]
    })
  }

  onFindProductName(filter: any){
    let nameProduct = (<HTMLInputElement>document.getElementById('filterProductName')).value;
    this.lstProductsNames = [];

    if (nameProduct.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.productService.getByNameFilterAndType$(nameProduct,environment.type_product_purchase).subscribe(
            lstProducts => this.lstProductsNames = lstProducts
        )
      }
    }
  }

  onFindProductCode(filter: any){
    let codeProduct = (<HTMLInputElement>document.getElementById('filterProductCode')).value;
    this.lstProductsCodes = [];

    if (codeProduct.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.productService.getByCodeFilterAndType$(codeProduct,environment.type_product_purchase).subscribe(
            lstProducts => this.lstProductsCodes = lstProducts
        )
      }
    }
  }

  selectProduct(product: Product){
    this.product = product;
    this.lstProductsCodes = [];
    this.lstProductsNames = [];
    this.productForm.patchValue({
      fk_id_product: product.pk_id_product,
      code_product: product.code,
      name_product: product.name,
    });

    //resetear producto seleccionado con código de barras.
    this.nameField.nativeElement.focus();
  }

  add(){
    this.addProduct.emit(this.productForm.value);
    this.initForm();
  }
}
