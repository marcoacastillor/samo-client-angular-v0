import { Component, OnInit, Output, EventEmitter, SimpleChanges, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { environment } from 'src/environments/environment';
import { Parameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-new-product',
  templateUrl: 'new-product.component.html',
  styles: []
})
export class NewProductComponent implements OnInit, OnChanges {
  productForm: FormGroup;

  public showPackageInfo: boolean = false;
  public showClothingInfo:  boolean = false;
  public showPresentationInfo: boolean = false;
  
  @Input() public product: Product;
  @Input() public categoryList: Parameter[];
  @Input() public presentationList: Parameter[];
  @Input() public typeProductList: Parameter[];
  
  @Output() public update = new EventEmitter<Product>();
  @Output() public create = new EventEmitter<Product>();
  
  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.product)
    {
      if(changes.product.currentValue.pk_id_product)
      {
        this.initUpdForm();
      }
    }
  }
  
  public setInfoByCategory(){
    if(this.productForm.value.category == environment.clothes){
      this.showClothingInfo = true;
      this.showPresentationInfo = false;
      this.productForm.patchValue({
        presentation: environment.individual,
        units_package: 0,
        sale_price_package: 0,
      });
    }
    else
    {
      this.showClothingInfo = false;
      this.showPresentationInfo = true;
      this.productForm.patchValue({
        reference: '',
        size: '',
        color: '',
        trademark: '',
      }); 
    }
  }

  public setInfoByPresentation(){
    if(this.productForm.value.presentation == environment.package){
      this.showPackageInfo = true;
    }
    else
    {
      this.showPackageInfo = false;
      this.productForm.patchValue({
        units_package: 0,
        sale_price_package: 0,
      }); 
    }
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm() {
  if(this.product.category == environment.clothes){
    this.showClothingInfo = true;
    this.showPresentationInfo = false;
  }
  else{
    this.showClothingInfo = false;
    this.showPresentationInfo = true;
  }

  this.productForm = this.fb.group({
    pk_id_product: [this.product.pk_id_product], 
    category: [this.product.category, Validators.required],
    code: [this.product.code,Validators.required],
    reference: [this.product.reference],
    presentation: [this.product.presentation, Validators.required],
    size: [this.product.size],
    color: [this.product.color],
    trademark: [this.product.trademark],
    name: [this.product.name,Validators.required],
    units_package: [this.product.units_package],
    sale_price_unit: [this.product.sale_price_unit,Validators.required],
    sale_price_package: [this.product.sale_price_package],
    type_product: [this.product.type_product],
    units_available: [this.product.units_available]
   });
 }

 /**
   *  Funciones de creación y actualización
   */
  public updateProduct(){
    this.update.emit(this.productForm.value);
    this.productForm.reset();
  }

  public createProduct(){
    this.create.emit(this.productForm.value);
    this.productForm.reset();
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
