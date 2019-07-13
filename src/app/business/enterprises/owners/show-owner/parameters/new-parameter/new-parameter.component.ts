import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParameterConfig } from 'src/app/shared/models/parameter-config';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';

@Component({
  selector: 'app-new-parameter',
  templateUrl: 'new-parameter.component.html',
  styles: []
})
export class NewParameterComponent implements OnInit {
  faSave = faSave;
   
  parameterForm: FormGroup;
  
  @Input() public parameter: ParameterConfig;
  @Input() public fk_id_enterprise: number;
  

  @Output() public create = new EventEmitter<ParameterConfig>();
  @Output() public update = new EventEmitter<ParameterConfig>();
  
  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.parameter)
    {
      if(changes.parameter.currentValue != changes.parameter.previousValue)
      {
        this.initUpdForm();
      }
    }

    if(changes.fk_id_enterprise)
    {
      if(changes.fk_id_enterprise.currentValue != changes.fk_id_enterprise.previousValue)
      {
        this.fk_id_enterprise = changes.fk_id_enterprise.currentValue;
        this.initUpdForm();
      }
    }
  }

  createParameter(){
    this.create.emit(this.parameterForm.value);

    //Modificar valor general de la operación
    //this.clearForm();

  }

  updateParameter(){
    this.update.emit(this.parameterForm.value);
    
    //Modificar valor general de la operación
    //this.clearForm();
  }

  clearForm(){
    this.parameterForm.patchValue({
      code: '',
      description: '',
      value: '',
    });
  }

  clear(){
    this.clearForm();
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm() {
  this.parameterForm = this.fb.group({
    pk_id_parameter_config: [this.parameter.pk_id_parameter_config],
    fk_id_enterprise: [this.fk_id_enterprise],
    code: [this.parameter.code,Validators.required],
    description: [this.parameter.description,Validators.required],
    value: [this.parameter.value,Validators.required],
    });
 }

 public getErrors(controlName: string): any {
  return this.formToolService.getErrors(this.parameterForm, controlName);
}

public mustShowError(controlName: string) {
  return this.formToolService.mustShowError(this.parameterForm, controlName);
}

public hasError(controlName: string, errorCode: string): any {
  return this.formToolService.hasError(this.parameterForm, controlName, errorCode);
}

}
