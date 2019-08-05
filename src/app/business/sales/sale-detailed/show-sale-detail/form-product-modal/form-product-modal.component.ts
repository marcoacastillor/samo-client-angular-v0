import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faSave, faCheckCircle, faSearch, faPlusCircle, faArchive, faUnderline } from '@fortawesome/free-solid-svg-icons';
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
  faArchive = faArchive;
  faUnderline = faUnderline;

  taxes  = environment.tax_purchase;

  @Input() public operation: Operation;
  @Input() public lstParams: Parameter[];

  @Output() public addProduct = new EventEmitter<Operation>();

  @ViewChild('number_units') numberUnits: ElementRef;
  
  lstProductsCodes: Product[] = [];
  lstProductsNames: Product[] = [];
  product: Product = new Product();

  lastkeydown1 = 0;
  selectedPresentation  = '';
  units_available = 0;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private formToolService: FormToolsService
  ) { }

  ngOnInit() {
    this.initForm();
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
      number_selected:['0',Validators.required],
      cost_price: ['0'],
      presentation: [''],
      tax_product:['0',Validators.required]
    })
  }

  onFindProductName(filter: any){
    let nameProduct = (<HTMLInputElement>document.getElementById('filterProductName')).value;
    this.lstProductsNames = [];

    if (nameProduct.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.productService.getSalesProductsByNameFilter$(nameProduct).subscribe(
            lstProducts => {
              this.lstProductsNames = lstProducts
              if(lstProducts.length == 1){
                this.selectProduct(lstProducts[0]);
              }
            }
            
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
            lstProducts => {
              this.lstProductsCodes = lstProducts;
              if(lstProducts.length == 1){
                this.selectProduct(lstProducts[0]);
              }
            }
        )
      }
    }
  }

  selectProduct(product: Product){
    let cost_price = 0;
    this.product = product;
    this.initForm();
    this.lstProductsCodes = [];
    this.lstProductsNames = [];

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

    //Setear valores del producto seleccionado.
    this.productForm.patchValue({
      fk_id_product: product.pk_id_product,
      code_product: product.code,
      name_product: product.name,
      cost_price: cost_price,
      number_selected: 1
    });

    //pone el focus sobre el input de código.
    if(this.numberUnits)
      this.numberUnits.nativeElement.focus();
  }

  public setUnitsByProduct(){
    this.units_available = this.product.units_available;
    this.selectedPresentation = 'INDIVIDUAL';
    this.productForm.patchValue({
      cost_price: this.product.sale_price_unit,
      presentation: 'INDIVIDUAL'
    });
  }

  public setPackageByProduct(){
    this.units_available = this.product.units_available / this.product.units_package;
    this.selectedPresentation = 'PAQUETE';
    this.productForm.patchValue({
      cost_price: this.product.sale_price_package,
      presentation: 'PAQUETE'
    });
  }

  add(){
    this.addProduct.emit(this.productForm.value);
    this.product = new Product;
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
