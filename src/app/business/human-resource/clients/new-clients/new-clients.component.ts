import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Parameter } from 'src/app/shared/models/parameter';
import { Person } from 'src/app/shared/models/person';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import * as moment from 'moment';

@Component({
  selector: 'app-new-clients',
  templateUrl: 'new-clients.component.html',
  styles: []
})
export class NewClientsComponent implements OnInit, OnChanges {
  personForm: FormGroup;
  public faCalendar = faCalendar;

  //Datos para crear usuario
  @Input() public person: Person;
  @Input() public typesIdList: Parameter[];
  
  @Output() public create = new EventEmitter<Person>();
  @Output() public update = new EventEmitter<Person>();
  
  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.person)
    {
      if(changes.person.currentValue)
      {
        this.person = changes.person.currentValue;
        this.initUpdForm();
      }
    }
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
  private initUpdForm() {
    this.personForm = this.fb.group({
    pk_id_person: [this.person.pk_id_person], 
    type_id: [this.person.type_id, Validators.required],
    number_id: [this.person.number_id, Validators.required],
    names: [this.person.names, Validators.required],
    last_names: [this.person.last_names, Validators.required],
    address:[this.person.address],
    phone:[this.person.phone],
   });
  }

 /**
   *  Funciones de creación y actualización
   */
  public createPerson(){
    this.personForm.patchValue({
      date_register: moment().format('YYYY-MM-DD')
    });
    this.create.emit(this.personForm.value);
    this.personForm.reset();
  }

  public updatePerson(){
    this.update.emit(this.personForm.value);
    this.personForm.reset();
  }

  /**
   * Funciones para verificar si los formularios son obligatorios o no.
   */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.personForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.personForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.personForm, controlName, errorCode);
  }
}