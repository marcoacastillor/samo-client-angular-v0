import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faSave, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { Parameter } from 'src/app/shared/models/parameter';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { PositionService } from 'src/app/shared/services/position.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { tap } from 'rxjs/operators';
import { Position } from 'src/app/shared/models/position';
import { Person } from 'src/app/shared/models/person';
import * as moment from 'moment';
import { Employee } from 'src/app/shared/models/employee';

@Component({
  selector: 'app-modal-employee-form',
  templateUrl: 'modal-employee-form.component.html',
  styles: []
})
export class ModalEmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  
  faSave = faSave;
  faCalendar = faCalendar;

  type_id = environment.type_ids;
  
  lstClients: Person[] = [];
  
  @Input() public fk_id_enterprise: number;
  @Input() public lstParametersEmployee: Parameter[];
  @Input() public lstPositions: Position[];
  @Input() public employee: Employee;
  
  @Output() public create = new EventEmitter<Employee>();
  @Output() public update = new EventEmitter<Employee>();

  lastkeydown1 = 0;

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    private personService: PersonService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.employee)
    {
      if(changes.employee.currentValue != changes.employee.previousValue)
      {
        this.initForm();
      }
    }
  }

  private initForm(){
    this.employeeForm = this.fb.group({
      person: this.fb.group({
        pk_id_person: [this.employee.fk_id_person],
        type_id: [this.employee.type_id,Validators.required],
        number_id: [this.employee.number_id,Validators.required],
        names: [this.employee.names,Validators.required],
        last_names: [this.employee.last_names,Validators.required],
        address: [this.employee.address,Validators.required],
        phone: [this.employee.phone,Validators.required],
      }),
      enterprise_person: this.fb.group({
        pk_id_enterprise_person: [this.employee.pk_id_enterprise_person],
        fk_id_position: [this.employee.fk_id_position, Validators.required],
        date_register: [this.employee.date_register, Validators.required],
        state: ['Activo']
      }),
    })
  }

  onFindClient(filter: any){
    let idClient = (<HTMLInputElement>document.getElementById('filterClient')).value;
    this.lstClients = [];

    if (idClient.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.personService.getPersonsByIdFilter$(idClient).subscribe(
          lstClients => {
            this.lstClients = lstClients;
          },
        )
      }
    }
  }

  selectClient(person: Person){
    this.lstClients = [];
    this.employeeForm.get('person').patchValue({
      type_id: person.type_id,
      number_id: person.number_id,
      names: person.names,
      last_names: person.last_names,
      address: person.address,
      phone: person.phone
    })
  }

  public createEmployee(){
    this.employeeForm.get('enterprise_person').patchValue({
      date_register: moment(this.employeeForm.get('enterprise_person').value.date_register).format('YYYY-MM-DD'),
    });
    this.create.emit(this.employeeForm.value);
  }

  public updateEmployee(){
    this.employeeForm.get('enterprise_person').patchValue({
      date_register: moment(this.employeeForm.get('enterprise_person').value.date_register).format('YYYY-MM-DD'),
    });
    this.update.emit(this.employeeForm.value);
  }
  
  /**
  * Funciones para verificar si los formularios son obligatorios o no.
  */

  public getErrors(controlName: string, controlNameChild: string): any {
    return this.formToolService.getErrorsChild(this.employeeForm, controlName, controlNameChild);
  }

  public mustShowError(controlName: string, controlNameChild: string) {
    return this.formToolService.mustShowErrorChild(this.employeeForm, controlName, controlNameChild);
  }

  public hasError(controlName: string, controlNameChild: string, errorCode: string): any {
    return this.formToolService.hasErrorChild(this.employeeForm, controlName, controlNameChild, errorCode);
  }

}
