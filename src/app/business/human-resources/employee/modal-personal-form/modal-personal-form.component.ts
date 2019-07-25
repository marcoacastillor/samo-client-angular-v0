import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Person } from 'src/app/shared/models/person';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Parameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-modal-personal-form',
  templateUrl: 'modal-personal-form.component.html',
  styles: []
})
export class ModalPersonalFormComponent implements OnInit, OnChanges {
  faSave = faSave;
  personalForm: FormGroup;

  @Input() public person: Person;
  @Input() public personalParametersList: Parameter[];

  @Output() public update = new EventEmitter<Person>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.person)
    {
      if(changes.person.currentValue != changes.person.previousValue)
      {
        this.initForm();
      }
    }
  }

  private initForm(){
    this.personalForm = this.fb.group({
      pk_id_person: [this.person.pk_id_person,Validators.required],
      type_id: [this.person.type_id,Validators.required],
      number_id: [this.person.number_id,Validators.required],
      names: [this.person.names,Validators.required],
      last_names: [this.person.last_names,Validators.required],
      address: [this.person.address,Validators.required],
      phone: [this.person.phone,Validators.required],
    })
  }

  updatePerson(){
    this.update.emit(this.personalForm.value);
  }

  /**
  * Funciones para verificar si los formularios son obligatorios o no.
  */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.personalForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.personalForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.personalForm, controlName, errorCode);
  }

}
