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
  public postitionList: Parameter[] = [];
  public laboralStateList: Parameter[] = [];

  constructor(
    private personService: PersonService,
    private userService: UserService,
    private globalStoreService: GlobalStoreService,
    private parameterService: ParameterService,
    private enterpriseService: EnterpriseService
  ) { }

  ngOnInit() {
    this.user = this.globalStoreService.getUser();
    this.setDataNewPerson();

    this.loadEmployees(this.user.fk_id_enterprise);
    this.loadTypeIds();
    this.loadLaboralState();
    this.loadPosition();
  }

  private setDataNewPerson(){
    this.person = new Person;
    this.person.enterprise = new Enterprise;
    this.person.enterprise_person = new EnterprisePerson;
    this.person.enterprise_person.rol_enterprise = environment.rol_client;
    this.person.enterprise_person.fk_id_enterprise = this.user.fk_id_enterprise;
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
  private loadPosition(){
    this.parameterService.getByCodeCategory$(environment.positions_person).subscribe(
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
      switchMap((person: Person): Observable<Enterprise> => this.enterpriseService.show$(person[0].enterprise_person.fk_id_enterprise)),
      tap(this.loadEnterprise)
    ).
    subscribe()
  }

  private loadPerson = (person: Person): void => {
    this.person = person[0];
  }

  private loadEnterprise = (enterprise: Enterprise): void => {
    this.person.enterprise = enterprise[0];
  }
  
  public onSearch(filter: string){
    this.personService.searchEmployeeByFilter$(filter,this.user.fk_id_enterprise).subscribe(
      clients => {
        this.clientList = clients[0];
      }
    );
  }

  public onCreate(person: Person){
    this.personService.store$(person).subscribe(
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
    this.personService.update$(person).subscribe(
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
      switchMap((enterprisePerson: EnterprisePerson): Observable<any> => this.userService.inactiveUserByPerson$(enterprisePerson[0].fk_id_person)),
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
