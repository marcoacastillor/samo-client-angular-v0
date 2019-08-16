import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { CuttingPeriod } from 'src/app/shared/models/cutting-period';
import { DetailProductInput } from 'src/app/shared/models/detail-product-input';
import { Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/shared/services/product.service';
import { faCheckCircle, faArchive, faUnderline } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-form-modal',
  templateUrl: 'product-form-modal.component.html',
  styles: []
})
export class ProductFormModalComponent implements OnInit, OnChanges {
  faCheckCircle = faCheckCircle;
  faArchive = faArchive;
  faUnderline = faUnderline;

  selectedPresentation = '';
  
  detailProductForm: FormGroup;
  lstProductsNames: Product[] = [];
  lstProductsCodes: Product[] = [];
  units_available: number = 0;
  product: Product = new Product;

  lastkeydown1 = 0;

  @Input() public cuttingPeriod: CuttingPeriod;
  @Input() public detailProductInput: DetailProductInput;

  @Output() public onCreateDetailProduct = new EventEmitter<DetailProductInput>();


  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.initUpdForm(0);
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.cuttingPeriod)
    {
      if(changes.cuttingPeriod.currentValue)
      {
        this.initUpdForm(0);
      }
    }
  }

  onFindProductName(filter: any){
    let nameProduct = (<HTMLInputElement>document.getElementById('filterProductName')).value;
    this.lstProductsNames = [];

    if (nameProduct.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.productService.getByNameFilterAndTypeINProduction$(nameProduct).subscribe(
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
        this.productService.getByCodeFilterAndTypeINProduction$(codeProduct).subscribe(
            lstProducts => this.lstProductsCodes = lstProducts
        )
      }
    }
  }

  selectProduct(product: Product){
    this.product = product;
    this.lstProductsCodes = [];
    this.lstProductsNames = [];
    this.detailProductForm.patchValue({
      fk_id_product: product.pk_id_product,
      code_product: product.code,
      name_product: product.name,
      presentation: product.presentation
    });

    if(this.product.type_product == 'Producto Insumo'){
      if(this.selectedPresentation == 'INDIVIDUAL'){
        this.initUpdForm(this.product.units_available);
      }else{
        this.initUpdForm(this.product.units_available/this.product.units_package);
      }
    }
    else{
      this.initUpdForm(1000);
    }
  }

  public setUnitsByProduct(){
    this.selectedPresentation = 'INDIVIDUAL';
    if(this.product.type_product == 'Producto Insumo'){
      this.initUpdForm(this.product.units_available);
    }

    this.detailProductForm.patchValue({
      code_product: this.product.code,
      name_product: this.product.name,
      presentation: 'INDIVIDUAL'
    });
  }

  public setPackageByProduct(){
    this.selectedPresentation = 'PAQUETE';
    if(this.product.type_product == 'Producto Insumo'){
      this.initUpdForm(this.product.units_available/this.product.units_package);
    }

    this.detailProductForm.patchValue({
      code_product: this.product.code,
      name_product: this.product.name,
      presentation: 'PAQUETE',
    });
  }

  create(){
    this.onCreateDetailProduct.emit(this.detailProductForm.value);
    this.product = new Product;
    this.initUpdForm(0);
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm(units:number) {
    this.detailProductForm = this.fb.group({
      pk_id_detail_product_input: [this.detailProductInput.pk_id_detail_product_input], 
      fk_id_cutting_period: [this.cuttingPeriod.pk_id_cutting_period, Validators.required], 
      fk_id_product: [this.product.pk_id_product, Validators.required],
      code_product:[this.product.code],
      name_product:[this.product.name],
      presentation: [this.product.presentation],
      amount_use_product: [0,[Validators.required, Validators.max(units)]],
    });
  }

  /**
   * Funciones para verificar si los formularios son obligatorios o no.
   */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.detailProductForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.detailProductForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.detailProductForm, controlName, errorCode);
  }

}
