import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { EnterprisePerson } from 'src/app/shared/models/enterprise-person';
import { Position } from 'src/app/shared/models/position';
import { faSave, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-contract-form',
  templateUrl: 'modal-contract-form.component.html',
  styles: []
})
export class ModalContractFormComponent implements OnInit {
  faSave = faSave;
  faCalendar = faCalendar;
  
  enterprisePersonForm: FormGroup;

  @Input() public enterprisePerson: EnterprisePerson;
  @Input() public positionsList: Position[];

  @Output() public update = new EventEmitter<EnterprisePerson>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.enterprisePerson)
    {
      if(changes.enterprisePerson.currentValue != changes.enterprisePerson.previousValue)
      {
        this.initForm();
      }
    }
  }

  private initForm(){
    this.enterprisePersonForm = this.fb.group({
      pk_id_enterprise_person: [this.enterprisePerson.pk_id_enterprise_person,Validators.required],
      fk_id_position: [this.enterprisePerson.fk_id_position, Validators.required],
      date_register: [this.enterprisePerson.date_register, Validators.required],
    })
  }

  updateEnterprisePerson(){
    this.enterprisePersonForm.patchValue({
      date_register: moment(this.enterprisePersonForm.value.date_register).format('YYYY-MM-DD'),
    });
    this.update.emit(this.enterprisePersonForm.value);
  }

  /**
  * Funciones para verificar si los formularios son obligatorios o no.
  */

  public getErrors(controlName: string): any {
      return this.formToolService.getErrors(this.enterprisePersonForm, controlName);
    }

    public mustShowError(controlName: string) {
      return this.formToolService.mustShowError(this.enterprisePersonForm, controlName);
    }

    public hasError(controlName: string, errorCode: string): any {
      return this.formToolService.hasError(this.enterprisePersonForm, controlName, errorCode);
    }

}
