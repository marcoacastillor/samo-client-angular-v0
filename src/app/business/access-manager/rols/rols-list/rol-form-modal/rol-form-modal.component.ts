import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Rol } from 'src/app/shared/models/rol';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';

@Component({
  selector: 'app-rol-form-modal',
  templateUrl: 'rol-form-modal.component.html',
  styles: []
})
export class RolFormModalComponent implements OnInit {
  rolForm: FormGroup;
  faSave = faSave;

  @Input() public rol: Rol;

  @Output() public create = new EventEmitter<Rol>();
  @Output() public update = new EventEmitter<Rol>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
  ) { }

  ngOnInit() {
    this.initUpdForm(this.rol);
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.rol)
    {
      if(changes.rol.currentValue != changes.rol.previousValue)
      {
        this.initUpdForm(changes.rol.currentValue);
      }
    }
  }

  public updateRol(){
    this.update.emit(this.rolForm.value);
  }

  public createRol(){
    this.create.emit(this.rolForm.value);
    this.rolForm.reset();
  }

  private initUpdForm(rol:Rol) {
    this.rolForm = this.fb.group({
      pk_id_rol: [rol.pk_id_rol],
      name: [rol.name, Validators.required],
      description: [rol.description],
      });
  }
  
  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.rolForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.rolForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.rolForm, controlName, errorCode);
  }

}
