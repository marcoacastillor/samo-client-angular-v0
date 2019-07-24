import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParameterConfig } from 'src/app/shared/models/parameter-config';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';

@Component({
  selector: 'app-modal-parameter-form',
  templateUrl: 'modal-parameter-form.component.html',
  styles: []
})
export class ModalParameterFormComponent implements OnInit {
  faSave = faSave;
  parameterForm: FormGroup;

  @Input() public parameterConfig: ParameterConfig;
  @Input() public fk_id_enterprise: Number;
  
  @Output() public update = new EventEmitter<ParameterConfig>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.parameterConfig)
    {
      if(changes.parameterConfig.currentValue != changes.parameterConfig.previousValue)
      {
        this.initForm();
      }
    }

    if(changes.fk_id_enterprise)
    {
      this.fk_id_enterprise = changes.fk_id_enterprise.currentValue;
    }
  }

  private initForm(){
    this.parameterForm = this.fb.group({
      pk_id_parameter_config: [this.parameterConfig.pk_id_parameter_config],
      fk_id_enterprise: [this.fk_id_enterprise],
      code: [this.parameterConfig.code],
      description: [this.parameterConfig.description],
      value: [this.parameterConfig.value, Validators.required]
    })
  }

  updateParameter(){
    this.update.emit(this.parameterForm.value);
  }

  /**
  * Funciones para verificar si los formularios son obligatorios o no.
  */

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
