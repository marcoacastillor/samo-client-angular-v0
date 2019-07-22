import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { LaboralCondition } from 'src/app/shared/models/laboral-condition';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Parameter } from 'src/app/shared/models/parameter';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-modal-laboral-condition-form',
  templateUrl: 'modal-laboral-condition-form.component.html',
  styles: []
})
export class ModalLaboralConditionFormComponent implements OnInit {
  faSave = faSave;
  laboralConditionForm: FormGroup;

  @Input() public laboralCondition: LaboralCondition;
  @Input() public laboralConditionParametersList: Parameter[];

  @Output() public update = new EventEmitter<LaboralCondition>();

  type_salary = environment.salary_type;
  type_contract = environment.contract_type;

  lstProducts = [];
  lastkeydown1 = 0;

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    private productService: ProductService
    
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.laboralCondition)
    {
      if(changes.laboralCondition.currentValue != changes.laboralCondition.previousValue)
      {
        this.initForm();
      }
    }
  }

  private initForm(){
    this.laboralConditionForm = this.fb.group({
      pk_id_laboral_condition: [this.laboralCondition.pk_id_laboral_condition, Validators.required],
      contract_type: [this.laboralCondition.contract_type, Validators.required],
      salary_type: [this.laboralCondition.salary_type, Validators.required],
      salary: [this.laboralCondition.salary],
      production_unit: [this.laboralCondition.production_unit],
      pk_product_unit: [this.laboralCondition.pk_product_unit],
      value_product_unit: [this.laboralCondition.value_product_unit],
      benefit_health: [this.laboralCondition.benefit_health],
      benefit_pension: [this.laboralCondition.benefit_pension],
      benefit_arl: [this.laboralCondition.benefit_arl],
      benefit_compensation_box: [this.laboralCondition.benefit_compensation_box]
    })
  }

  onFindProduct(filter: any){
    let nameProduct = (<HTMLInputElement>document.getElementById('filterProduct')).value;
    this.lstProducts = [];

    if (nameProduct.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.productService.getNotSalesProductsByNameFilter$(nameProduct).subscribe(
          lstProducts => {
            this.lstProducts = lstProducts;
          },
        )
      }
    }
  }

  selectProduct(product: Product){
    this.lstProducts = [];
    this.laboralConditionForm.patchValue({
      production_unit: product.name,
      pk_product_unit: product.pk_id_product,
    })
  }

  updateLaboralCondition(){
    this.update.emit(this.laboralConditionForm.value);
  }

  /**
  * Funciones para verificar si los formularios son obligatorios o no.
  */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.laboralConditionForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.laboralConditionForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.laboralConditionForm, controlName, errorCode);
  }

}
