import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { CuttingPeriod } from 'src/app/shared/models/cutting-period';
import { DetailProductInput } from 'src/app/shared/models/detail-product-input';
import { Product } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-form-modal',
  templateUrl: 'product-form-modal.component.html',
  styles: []
})
export class ProductFormModalComponent implements OnInit, OnChanges {
  detailProductForm: FormGroup;
  productLst: Product[] = [];
  units_available: number = 0;

  final_product: string = environment.type_product_internal_prd;
  intermediaty_product: string = environment.type_product_intermediaty;
  input_product: string = environment.type_product_input;

  @Input() public cuttingPeriod: CuttingPeriod;
  @Input() public detailProductInput: DetailProductInput;

  @Output() public onCreateDetailProduct = new EventEmitter<DetailProductInput>();


  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.cuttingPeriod)
    {
      if(changes.cuttingPeriod.currentValue)
      {
        this.initUpdForm();
      }
    }
  }

  getProductByType(type: string){
    this.productService.getByType$(type).subscribe(
      lstProducts => this.productLst = lstProducts
    )
  }

  validateUnitsAvailable(product: Product){
    if(product.category === environment.type_product_input)
    {
      this.units_available = product.units_available;
    }
    else
    {
      this.units_available = 0;
    }
  }

  create(){
    this.onCreateDetailProduct.emit(this.detailProductForm.value);
    this.units_available = 0;
    this.detailProductForm.patchValue({
      fk_id_product: null,
      amount_use_product: '',
    })
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm() {
    this.detailProductForm = this.fb.group({
      pk_id_detail_product_input: [this.detailProductInput.pk_id_detail_product_input], 
      fk_id_cutting_period: [this.cuttingPeriod.pk_id_cutting_period, Validators.required], 
      fk_id_product: [this.detailProductInput.fk_id_product, Validators.required],
      amount_use_product: [this.detailProductInput.amount_use_product,Validators.required],
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
