import { Component, OnInit, ChangeDetectorRef, SimpleChanges, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { Position } from 'src/app/shared/models/position';
import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-position',
  templateUrl: 'new-position.component.html',
  styles: []
})
export class NewPositionComponent implements OnInit {
  faSave = faSave;
   
  positionForm: FormGroup;
  
  @Input() public position: Position;
  @Input() public fk_id_enterprise: number;
  

  @Output() public create = new EventEmitter<Position>();
  @Output() public update = new EventEmitter<Position>();
  
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
    if(changes.position)
    {
      if(changes.position.currentValue != changes.position.previousValue)
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

  createTypeService(){
    this.create.emit(this.positionForm.value);

    //Modificar valor general de la operación
    this.positionForm.patchValue({
      code: '',
      name: '',
    });

  }

  updateTypeService(){
    this.update.emit(this.positionForm.value);
    //Modificar valor general de la operación
    this.positionForm.patchValue({
      code: '',
      name: '',
    });
  }

  clear(){
    this.positionForm.reset();
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm() {
  this.positionForm = this.fb.group({
    pk_id_position: [this.position.pk_id_position],
    fk_id_enterprise: [this.fk_id_enterprise],
    code: [this.position.code,Validators.required],
    name: [this.position.name,Validators.required],
    });
 }

 public getErrors(controlName: string): any {
  return this.formToolService.getErrors(this.positionForm, controlName);
}

public mustShowError(controlName: string) {
  return this.formToolService.mustShowError(this.positionForm, controlName);
}

public hasError(controlName: string, errorCode: string): any {
  return this.formToolService.hasError(this.positionForm, controlName, errorCode);
}

}
