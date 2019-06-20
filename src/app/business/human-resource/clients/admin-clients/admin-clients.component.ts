import { Component, OnInit } from '@angular/core';
import { Results } from 'src/app/shared/models/results';
import { PersonService } from 'src/app/shared/services/person.service';
import { environment } from 'src/environments/environment';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { User } from 'src/app/shared/models/user';
import { Person } from 'src/app/shared/models/person';
import { Parameter } from 'src/app/shared/models/parameter';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { EnterprisePerson } from 'src/app/shared/models/enterprise-person';
import { tap, switchMap } from 'rxjs/operators';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Observable } from 'rxjs';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';

@Component({
  selector: 'app-admin-clients',
  templateUrl: 'admin-clients.component.html',
  styles: []
})
export class AdminClientsComponent implements OnInit {
  showClient: boolean = false;
  public clientList: Results = new Results();

  public actualPg: number = 0;
  public regPerPg: number = 5;

  public user: User = new User;
  public person: Person = new Person;
  
  public typesIdList: Parameter[] = [];

  constructor(
    private personService: PersonService,
    private globalStoreService: GlobalStoreService,
    private parameterService: ParameterService,
    private enterpriseService: EnterpriseService
  ) { }

  ngOnInit() {
    this.user = this.globalStoreService.getUser();
    this.setDataNewPerson();

    this.loadClients(this.user.fk_id_enterprise);
    this.loadTypeIds();
  }

  private setDataNewPerson(){
    this.person = new Person;
    this.person.enterprise = new Enterprise;
    this.person.enterprise_person = new EnterprisePerson;
    this.person.enterprise_person.state = environment.state_rol_person_active;
    this.person.enterprise_person.salary = 0;
  }

  private loadTypeIds(){
    this.parameterService.getByCodeCategory$(environment.type_ids).subscribe(
      ids => this.typesIdList = ids
    );
  }

  private loadClients(id_enterprise: number){
    this.personService.getClientsByEnterprise$(id_enterprise).subscribe(
      clients => {
        this.clientList = clients;
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
    ).
    subscribe()
  }

  private loadPerson = (person: Person): void => {
    this.person = person;
  }

  public onSearch(filter: string){
    this.personService.searchClientsByFilter$(filter,this.user.fk_id_enterprise).subscribe(
      clients => {
        this.clientList = clients;
      }
    );
  }

  public onCreate(person: Person){
    this.personService.createPerson$(person).subscribe(
      person => 
      { 
        this.person = person;
        this.person.enterprise_person = new EnterprisePerson;
        this.person.enterprise = new Enterprise;
        
        this.loadClients(this.user.fk_id_enterprise);
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

        this.loadClients(this.user.fk_id_enterprise);
      }
    );
  }

}
