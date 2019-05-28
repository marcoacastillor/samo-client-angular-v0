import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { Parameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-new-product',
  templateUrl: 'new-product.component.html',
  styles: []
})
export class NewProductComponent implements OnInit {
  productForm: FormGroup;

  public showPackageInfo: boolean = false;
  public showClothingInfo:  boolean = false;
  public showPresentationInfo: boolean = false;
  
  @Input() public categoryList: Parameter[];
  @Input() public presentationList: Parameter[];
  @Input() public category: string;
  @Output() public create = new EventEmitter<Product>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }
  
  /*
  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.pk_id_provider)
    {
      if(changes.pk_id_provider.currentValue)
      {
        this.productForm.patchValue({
          fk_id_enterprise: this.pk_id_provider,
        });     
      }
    }
  }
  */

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
  this.productForm = this.fb.group({
    pk_id_product: [], 
    category: [this.category, Validators.required],
    code: ['',Validators.required],
    reference: [''],
    presentation: ['', Validators.required],
    size: [''],
    color: [''],
    trademark: [''],
    name: ['',Validators.required],
    units_package: [''],
    sale_price_unit: ['',Validators.required],
    sale_price_package: [''],
    type_product: [environment.type_product_purchase],
    units_available: ['0']
   });
 }

 /**
   *  Funciones de creación y actualización
   */
  public createProduct(){
    this.create.emit(this.productForm.value);
    this.initUpdForm();
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
