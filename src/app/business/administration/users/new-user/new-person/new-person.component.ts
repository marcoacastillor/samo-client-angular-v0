import { Component, OnInit, SimpleChanges, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { Parameter } from 'src/app/shared/models/parameter';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Person } from 'src/app/shared/models/person';
import * as moment from 'moment';

@Component({
  selector: 'app-new-person',
  templateUrl: 'new-person.component.html',
  styles: []
})
export class NewPersonComponent implements OnInit {
  personForm: FormGroup;
  public faCalendar = faCalendar;

  //Datos para crear usuario
  @Input() public typesIdList: Parameter[];
  @Input() public postitionList : Parameter[];
  @Input() public laboralStateList : Parameter[];
  

  @Output() public create = new EventEmitter<Person>();
  @Input() public pk_id_enterprise : number;

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
  private initUpdForm() {
    this.personForm = this.fb.group({
    pk_id_person: [], 
    type_id: ['CC', Validators.required],
    number_id: ['', Validators.required],
    names: ['', Validators.required],
    last_names: ['', Validators.required],
    address:[''],
    phone:[''],
    fk_id_enterprise: [this.pk_id_enterprise],
    rol_enterprise: ['',Validators.required],
    date_register: [moment().format('YYYY-MM-DD'),Validators.required],
    state: ['',Validators.required]
   });
  }

 /**
   *  Funciones de creación y actualización
   */
  public createPerson(){
    this.personForm.patchValue({
      date_register: moment(this.personForm.value.date_register).format('YYYY-MM-DD')
    });
    this.create.emit(this.personForm.value);
    this.initUpdForm();
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
