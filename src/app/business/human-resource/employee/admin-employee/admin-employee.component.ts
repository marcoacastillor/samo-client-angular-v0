import { Component, OnInit } from '@angular/core';
import { Results } from 'src/app/shared/models/results';
import { User } from 'src/app/shared/models/user';
import { Person } from 'src/app/shared/models/person';
import { Parameter } from 'src/app/shared/models/parameter';
import { PersonService } from 'src/app/shared/services/person.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { EnterprisePerson } from 'src/app/shared/models/enterprise-person';
import { environment } from 'src/environments/environment';
import { tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { UserService } from 'src/app/shared/services/user.service';
import { PositionService } from 'src/app/shared/services/position.service';
import { Position } from 'src/app/shared/models/position';

@Component({
  selector: 'app-admin-employee',
  templateUrl: 'admin-employee.component.html',
  styles: []
})
export class AdminEmployeeComponent implements OnInit {
  showClient: boolean = false;
  public clientList: Results = new Results();

  public actualPg: number = 0;
  public regPerPg: number = 5;

  public user: User = new User;
  public person: Person = new Person;
  
  public typesIdList: Parameter[] = [];
  public postitionList: Position[] = [];
  public laboralStateList: Parameter[] = [];
  public salaryTypeList: Parameter[] = [];

  constructor(
    private personService: PersonService,
    private userService: UserService,
    private globalStoreService: GlobalStoreService,
    private parameterService: ParameterService,
    private enterpriseService: EnterpriseService,
    private positionService: PositionService
  ) { }

  ngOnInit() {
    this.user = this.globalStoreService.getUser();
    this.setDataNewPerson();

    this.loadEmployees(this.user.fk_id_enterprise);
    this.loadTypeIds();
    this.loadLaboralState();
    this.loadPosition();
    this.loadSalaryTypeList();
  }

  private loadSalaryTypeList(){
    this.parameterService.getByCodeCategory$(environment.salary_type).subscribe(
      salaryTypes => this.salaryTypeList = salaryTypes
    )
  }

  private setDataNewPerson(){
    this.person = new Person;
    this.person.enterprise = new Enterprise;
    this.person.enterprise_person = new EnterprisePerson;
    this.person.enterprise_person.state = environment.state_rol_person_active;
  }

  private loadLaboralState(){
    this.parameterService.getByCodeCategory$(environment.laboral_state).subscribe(
      laboralState => this.laboralStateList = laboralState
    )
  }

  private loadTypeIds(){
    this.parameterService.getByCodeCategory$(environment.type_ids).subscribe(
      ids => this.typesIdList = ids
    );
  }
  //
  private loadPosition(){
    this.positionService.getByEnterpsie$(this.user.fk_id_enterprise).subscribe(
      ids => this.postitionList = ids
    );
  }


  private loadEmployees(id_enterprise: number){
    this.personService.getEmployeesByEnterpriseRs$(id_enterprise).subscribe(
      clients => {
        this.clientList = clients[0];
      }
    );
  }
  
  public onSelectShow(pk_id_person: number){
    this.showClient = true;
    this.showInfoClient(pk_id_person);
  }

  public onSelectUpdate(pk_id_person: number){
    this.showClient = false;
    if(pk_id_person == -1){
      this.setDataNewPerson();
    }
    else{
      this.showInfoClient(pk_id_person);
    }
  }

  private showInfoClient(pk_id_person: number){
    this.personService.show$(pk_id_person).pipe(
      tap(this.loadPerson),
      switchMap((person: Person): Observable<Enterprise> => this.enterpriseService.show$(person.enterprise_person.fk_id_enterprise)),
      tap(this.loadEnterprise)
    ).
    subscribe()
  }

  private loadPerson = (person: Person): void => {
    this.person = person;
  }

  private loadEnterprise = (enterprise: Enterprise): void => {
    this.person.enterprise = enterprise;
  }
  
  public onSearch(filter: string){
    this.personService.searchEmployeeByFilter$(filter,this.user.fk_id_enterprise).subscribe(
      clients => {
        this.clientList = clients;
      }
    );
  }

  public onCreate(person: Person){
    this.personService.createEmployee$(person).subscribe(
      person => 
      { 
        this.person = person;
        this.person.enterprise_person = new EnterprisePerson;
        this.person.enterprise = new Enterprise;

        this.loadEmployees(this.user.fk_id_enterprise);
      }
    );
  }

  public onUpdate(person: Person){
    this.personService.updateEmployee$(person).subscribe(
      person => 
      { 
        this.person = person;
        this.person.enterprise_person = new EnterprisePerson;
        this.person.enterprise = new Enterprise;
        
        this.loadEmployees(this.user.fk_id_enterprise);
      }
    );
  }

  public onInactivate(id:number){
    this.personService.inactivate$(id).pipe(
      switchMap((enterprisePerson: EnterprisePerson): Observable<any> => this.userService.inactiveUserByPerson$(enterprisePerson.fk_id_person)),
    ).subscribe(this.onSuccess,this.onError);
  }

  /*
  * ------------------------------------------
  * Funciones validación de resultado
  * ------------------------------------------
  */
 private onSuccess = () => {
  this.globalStoreService.dispatchUserMessage('200', ' Se ejecutó exitosamente, la operación ');
  this.loadEmployees(this.user.fk_id_enterprise)
  }

  private onError = (error: any) => {
    this.globalStoreService.dispatchUserMessage(error.status, error.statusText + ' : ' + error.error.error);
  }


}
