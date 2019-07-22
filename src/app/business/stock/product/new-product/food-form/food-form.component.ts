import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { Parameter } from 'src/app/shared/models/parameter';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-food-form',
  templateUrl: 'food-form.component.html',
  styles: []
})
export class FoodFormComponent implements OnInit, OnChanges {
  foodsForm: FormGroup;
  showPackageInfo: boolean = false;

  success = false;
  message = '';

  @Input() public product: Product;
  @Input() public presentationList: Parameter[];
  @Input() public typeProductList: Parameter[];

  @Output() public onCreate = new EventEmitter<Product>();
  @Output() public onUpdate = new EventEmitter<Product>();
  
  
  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { }

  ngOnInit() {
    this.createFormFood();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.product)
    {
      this.success = false;
      if(changes.product.currentValue != changes.product.previousValue)
      {
        this.product = changes.product.currentValue;
        if(this.product.presentation == environment.package && this.product.type_product == environment.type_product_purchase)
        {
          this.showPackageInfo = true;
        }
        this.createFormFood();
      }
    }
  }

  public setInfoByPresentation(){
    if(this.foodsForm.value.type_product == environment.type_product_internal_prd || this.foodsForm.value.type_product == environment.type_product_purchase){
      if(this.foodsForm.value.presentation == environment.individual){
        this.showPackageInfo = false;
        this.foodsForm.patchValue({
          units_package: 0,
          sale_price_package: 0,
          sale_price_unit: 0,
        }); 
      }
      else{
        this.showPackageInfo = true;
      }
    }
    else{
      this.showPackageInfo = false;
      this.foodsForm.patchValue({
        units_package: 0,
        sale_price_package: 0,
        sale_price_unit: 0,
      });
    }
  }

  private createFormFood(){
    this.foodsForm = this.fb.group({
      pk_id_product: [this.product.pk_id_product], 
      code: [this.product.code, Validators.required], 
      reference: [''], 
      category: [this.product.category, Validators.required], 
      name: [this.product.name,Validators.required], 
      presentation: [this.product.presentation, Validators.required], 
      units_package: [this.product.units_package, Validators.required], 
      sale_price_unit: [this.product.sale_price_unit,Validators.required], 
      sale_price_package: [this.product.sale_price_package, Validators.required], 
      type_product: [this.product.type_product,Validators.required], 
      units_available: [this.product.units_available], 
      size: [''], 
      color: [''], 
      trademark: [''], 
     });
  }

  private resetManualform(){
    this.foodsForm.patchValue({
      pk_id_product: null, 
      code: '', 
      reference: '', 
      category: this.product.category, 
      name: '',  
      presentation: '', 
      units_package: 0,
      sale_price_unit: 0,
      sale_price_package: 0,
      type_product: '', 
      units_available: 0,
      size: '', 
      color: '', 
      trademark: '', 
    })
  }

  

  createProduct(){
    this.onCreate.emit(this.foodsForm.value);
    this.success = true;
    this.resetManualform();
    this.message = 'Se crea el registro satisfactoriamente.';
  }

  updateProduct(){
    this.onUpdate.emit(this.foodsForm.value);
    this.success = true;
    this.message = 'Se actualiza el registro satisfactoriamente.';
  }

  /**
   * Funciones para verificar si los formularios son obligatorios o no.
   */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.foodsForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.foodsForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.foodsForm, controlName, errorCode);
  }

}
