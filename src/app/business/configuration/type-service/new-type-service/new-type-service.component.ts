import { Component, OnInit, Input, ChangeDetectorRef, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { TypeService } from 'src/app/shared/models/type-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { Parameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-new-type-service',
  templateUrl: 'new-type-service.component.html',
  styles: []
})
export class NewTypeServiceComponent implements OnInit {
  typeServiceForm: FormGroup;
  
  @Input() public typeService: TypeService;
  @Input() public modeServiceList: Parameter[];
  @Input() public typesServiceList: Parameter[];
  @Input() public sizesEnterpriseList: Parameter[];
  
  @Output() public create = new EventEmitter<TypeService>();
  @Output() public update = new EventEmitter<TypeService>();
  
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
    if(changes.typeService)
    {
      if(changes.typeService.currentValue != changes.typeService.previousValue)
      {
        this.initUpdForm();
      }
    }
  }

  createTypeService(){
    this.create.emit(this.typeServiceForm.value);
    this.typeServiceForm.reset();
  }

  updateTypeService(){
    this.update.emit(this.typeServiceForm.value);
    this.typeServiceForm.reset();
  }

  clear(){
    this.typeServiceForm.reset();
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm() {
  this.typeServiceForm = this.fb.group({
    pk_id_type_service: [this.typeService.pk_id_type_service],
    type_enterprise: [this.typeService.type_enterprise,Validators.required],
    code_service: [this.typeService.code_service],
    mode_service: [this.typeService.mode_service, Validators.required],
    value_service: [this.typeService.value_service, Validators.required],
    type_service: [this.typeService.type_service, Validators.required],
    description: [this.typeService.description],
    });
  }

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.typeServiceForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.typeServiceForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.typeServiceForm, controlName, errorCode);
  }

}
