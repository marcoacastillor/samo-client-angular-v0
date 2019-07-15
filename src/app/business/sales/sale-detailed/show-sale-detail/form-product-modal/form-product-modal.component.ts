import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faSave, faCheckCircle, faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { Operation } from 'src/app/shared/models/operation';
import { Parameter } from 'src/app/shared/models/parameter';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';


@Component({
  selector: 'app-form-product-modal',
  templateUrl: 'form-product-modal.component.html',
  styles: []
})
export class FormProductModalComponent implements OnInit {
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
    private productService: ProductService,
    private formToolService: FormToolsService
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
      number_selected:['0',[Validators.required,Validators.max(this.product.units_available)]],
      value_unit: ['0'],
      tax_product:['0',Validators.required]
    })
  }

  onFindProductName(filter: any){
    let nameProduct = (<HTMLInputElement>document.getElementById('filterProductName')).value;
    this.lstProductsNames = [];

    if (nameProduct.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.productService.getSalesProductsByNameFilter$(nameProduct).subscribe(
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
        this.productService.getSalesProductsByCodeFilter$(codeProduct).subscribe(
            lstProducts => this.lstProductsCodes = lstProducts
        )
      }
    }
  }

  selectProduct(product: Product){
    let value_unit = 0;
    this.product = product;
    this.initForm();
    this.lstProductsCodes = [];
    this.lstProductsNames = [];

    if(this.product.presentation === environment.individual)
    {
      value_unit = this.product.sale_price_unit;
    }
    else
    {
      value_unit = this.product.sale_price_package;
    }

    //Setear valores del producto seleccionado.
    this.productForm.patchValue({
      fk_id_product: product.pk_id_product,
      code_product: product.code,
      name_product: product.name,
      value_unit: value_unit
    });

    //resetear producto seleccionado con código de barras.
    if(this.nameField)
      this.nameField.nativeElement.focus();
  }

  add(){
    this.addProduct.emit(this.productForm.value);
    this.initForm();
  }

  /**
   * Funciones para verificar si los formularios son obligatorios o no.
   */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.productForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.productForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.productForm, controlName, errorCode);
  }

}
