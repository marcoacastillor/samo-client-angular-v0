import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';

@Component({
  selector: 'app-form-delivery-product',
  templateUrl: 'form-delivery-product.component.html',
  styles: []
})
export class FormDeliveryProductComponent implements OnInit {
  operationForm: FormGroup;
  faSave = faSave;

  @Input() public selectedProduct: any;
  @Output() public updateDelivery = new EventEmitter<any>();
  
  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { }


  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.selectedProduct)
    {
      if(changes.selectedProduct.currentValue != changes.selectedProduct.previousValue)
      {
        this.initForm();
      }
    }
  }

  private initForm(){
    this.operationForm = this.fb.group({
      pk_id_operation_product: [this.selectedProduct.pk_id_operation_product],
      fk_id_product: [this.selectedProduct.fk_id_product],
      units_separated: [this.selectedProduct.units_separated, Validators.max(this.selectedProduct.units_separated)],
    })
  }

  deliveryProduct(){
    this.updateDelivery.emit(this.operationForm.value);
    this.initForm();
  }

  /**
   * Funciones para verificar si los formularios son obligatorios o no.
   */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.operationForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.operationForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.operationForm, controlName, errorCode);
  }

}
