import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { Parameter } from 'src/app/shared/models/parameter';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clothes-form',
  templateUrl: 'clothes-form.component.html',
  styles: []
})
export class ClothesFormComponent implements OnInit {
  clothesForm: FormGroup;
  showPackageInfo: boolean = false;

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
      if(changes.product.currentValue)
      {
        this.product = changes.product.currentValue;
        this.createFormFood();
      }
    }
  }

  private createFormFood(){
    this.clothesForm = this.fb.group({
      pk_id_product: [this.product.pk_id_product], 
      code: [this.product.code, Validators.required], 
      reference: [this.product.reference, Validators.required], 
      category: [this.product.category, Validators.required], 
      name: [this.product.name,Validators.required], 
      presentation: [environment.individual], 
      units_package: [0], 
      sale_price_unit: [this.product.sale_price_unit,Validators.required], 
      sale_price_package: [0], 
      type_product: [environment.type_product_purchase], 
      units_available: [this.product.units_available], 
      size: [this.product.size,Validators.required], 
      color: [this.product.color,Validators.required], 
      trademark: [this.product.trademark,Validators.required], 
     });
  }

  private resetManualform(){
    this.clothesForm.patchValue({
      pk_id_product: null, 
      code: '', 
      reference: '', 
      category: this.product.category, 
      name: '',  
      presentation: environment.individual, 
      units_package: 0,
      sale_price_unit: 0,
      sale_price_package: 0,
      type_product: environment.type_product_purchase, 
      units_available: 0,
      size: '', 
      color: '', 
      trademark: '', 
    })
  }

  createProduct(){
    this.onCreate.emit(this.clothesForm.value);
    this.resetManualform();
  }

  updateProduct(){
    this.onUpdate.emit(this.clothesForm.value);
    this.resetManualform();
  }

  /**
   * Funciones para verificar si los formularios son obligatorios o no.
   */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.clothesForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.clothesForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.clothesForm, controlName, errorCode);
  }

}
