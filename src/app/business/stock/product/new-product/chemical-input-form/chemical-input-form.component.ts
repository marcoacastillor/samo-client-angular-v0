import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { Parameter } from 'src/app/shared/models/parameter';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chemical-input-form',
  templateUrl: 'chemical-input-form.component.html',
  styles: []
})
export class ChemicalInputFormComponent implements OnInit {
  chemicalInputForm: FormGroup;
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
    this.createFormChemicalInput();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.product)
    {
      if(changes.product.currentValue)
      {
        this.product = changes.product.currentValue;
        this.createFormChemicalInput();
        this.setInfoByPresentation();
      }
    }
  }

  public setInfoByPresentation(){
    if(this.chemicalInputForm.value.presentation == environment.individual){
      this.showPackageInfo = false;
      this.chemicalInputForm.patchValue({
        units_package: 0, 
        sale_price_package: 0, 
      })
    }
    else{
      this.showPackageInfo = true;
    }
  }

  private createFormChemicalInput(){
    this.chemicalInputForm = this.fb.group({
      pk_id_product: [this.product.pk_id_product], 
      code: [this.product.code, Validators.required], 
      reference: [''], 
      category: [this.product.category, Validators.required], 
      name: [this.product.name,Validators.required], 
      presentation: [this.product.presentation, Validators.required], 
      units_package: [this.product.units_package], 
      sale_price_unit: [0], 
      sale_price_package: [0], 
      type_product: [environment.type_product_input], 
      units_available: [this.product.units_available], 
      size: [''], 
      color: [''], 
      trademark: [''], 
     });
  }

  private resetManualform(){
    this.chemicalInputForm.patchValue({
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
    this.onCreate.emit(this.chemicalInputForm.value);
    this.resetManualform();
    this.success = true;
    this.message = 'Se crea el registro satisfactoriamente.';
  }

  updateProduct(){
    this.onUpdate.emit(this.chemicalInputForm.value);
    this.success = true;
    this.message = 'Se actualiza el registro satisfactoriamente.';
  }

  /**
   * Funciones para verificar si los formularios son obligatorios o no.
   */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.chemicalInputForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.chemicalInputForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.chemicalInputForm, controlName, errorCode);
  }

}
