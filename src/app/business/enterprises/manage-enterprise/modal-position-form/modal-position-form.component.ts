import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Position } from 'src/app/shared/models/position';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';

@Component({
  selector: 'app-modal-position-form',
  templateUrl: 'modal-position-form.component.html',
  styles: []
})
export class ModalPositionFormComponent implements OnInit {
  faSave = faSave;
  positionForm: FormGroup;

  @Input() public position: Position;
  @Input() public fk_id_enterprise: Number;
  
  
  @Output() public create = new EventEmitter<Position>();
  @Output() public update = new EventEmitter<Position>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.position)
    {
      if(changes.position.currentValue != changes.position.previousValue)
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
    this.positionForm = this.fb.group({
      pk_id_position: [this.position.pk_id_position],
      fk_id_enterprise: [this.fk_id_enterprise],
      code: [this.position.code,Validators.required],
      name: [this.position.name,Validators.required]
    })
  }

  updatePosition(){
    this.update.emit(this.positionForm.value);
  }

  createPosition(){
    this.create.emit(this.positionForm.value);
  }

  /**
  * Funciones para verificar si los formularios son obligatorios o no.
  */

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