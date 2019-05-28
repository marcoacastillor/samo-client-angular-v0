import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Parameter } from 'src/app/shared/models/parameter';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-new-parameter',
  templateUrl: 'new-parameter.component.html',
  styles: []
})
export class NewParameterComponent implements OnInit, OnChanges {
  parameterForm: FormGroup;
  @Input() public parameter: Parameter;
  
  @Output() public create = new EventEmitter<Parameter>();
  @Output() public update = new EventEmitter<Parameter>();
  @Output() public cancel = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.parameter.currentValue.pk_id_parameter)
    {
      if(changes.parameter.currentValue.pk_id_parameter != changes.parameter.previousValue.pk_id_parameter)
      {
        this.initUpdForm();
      }
    }
  }

  public createParameter(){
    this.create.emit(this.parameterForm.value);
    this.parameterForm.reset();
  }

  public updateParameter(){
    this.update.emit(this.parameterForm.value);
  }

  public cancelParameter(){
    this.cancel.emit(true);
  }
  

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm() {
  this.parameterForm = this.fb.group({
    pk_id_parameter: [this.parameter.pk_id_parameter],
    fk_id_category: [this.parameter.fk_id_category],
    name: [this.parameter.name, Validators.required], 
    value: [this.parameter.value, Validators.required],    
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
