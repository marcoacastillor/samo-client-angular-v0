import { Component, OnInit } from '@angular/core';
import { faThList, faAddressCard, faUserCheck, faServer, faFileSignature, faFolderOpen, faFolderPlus, faFilePrescription } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/shared/models/person';
import { EnterprisePerson } from 'src/app/shared/models/enterprise-person';
import { LaboralCondition } from 'src/app/shared/models/laboral-condition';
import { WorkerNews } from 'src/app/shared/models/worker-news';
import { PayingEmployee } from 'src/app/shared/models/paying-employee';
import { PersonService } from 'src/app/shared/services/person.service';
import { EnterprisePersonService } from 'src/app/shared/services/enterprise-person.service';
import { LaboralConditionService } from 'src/app/shared/services/laboral-condition.service';
import { PayingEmployeeService } from 'src/app/shared/services/paying-employee.service';
import { WorkerNewService } from 'src/app/shared/services/worker-new.service';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Parameter } from 'src/app/shared/models/parameter';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { PositionService } from 'src/app/shared/services/position.service';
import { Position } from 'src/app/shared/models/position';

@Component({
  selector: 'app-employee-show',
  templateUrl: 'employee-show.component.html',
  styles: []
})
export class EmployeeShowComponent implements OnInit {
  faThList = faThList;
  faAddressCard = faAddressCard;
  faUserCheck = faUserCheck;
  faServer = faServer;
  faFileSignature = faFileSignature;
  faFolderOpen = faFolderOpen;
  faFolderPlus = faFolderPlus;
  faFilePrescription = faFilePrescription;

  id_person: number;
  person: Person = new Person;
  enterprisePerson: EnterprisePerson = new EnterprisePerson;
  laboralCondition: LaboralCondition = new LaboralCondition;
  workerNews: WorkerNews[] = [];
  paymentsEmployee: PayingEmployee[] = [];
  allEnterprisePerson: EnterprisePerson[] = [];

  //parametros para información personal
  //cargar parámetros para la creación del empleado
  //tipos de id; tipos de salario; tipo de contrato; porcentajes parafiscales
  type_id           = environment.type_ids;
  type_salary       = environment.salary_type;
  type_contract     = environment.contract_type;
  type_worker_new   = environment.type_worker_new;

  categories      = {'categories' : [this.type_salary,this.type_contract]};
  categories_news = {'categories' : [this.type_worker_new]};

  positionsList: Position[] = [];
  personalParametersList: Parameter[] = [];
  laboralConditionParametersList: Parameter[] = [];
  workerNewsParameterList: Parameter[] = [];

  success = false;
  message = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private personService: PersonService,
    private enterprisePersonService: EnterprisePersonService,
    private laboralConditionService: LaboralConditionService,
    private payingEmployeeService: PayingEmployeeService,
    private workerNewsService: WorkerNewService,
    private parameterService: ParameterService,
    private positionService: PositionService
  ) { }

  ngOnInit() {
    this.id_person = this.activateRoute.snapshot.params['id'];
    this.getLaboralDetailActive(this.id_person);
  }

  private getLaboralDetailActive(id_person: number){
    this.personService.show$(id_person).pipe(
      tap((person:Person) => {
        this.person = person;
      }),
      tap((person:Person) => {
        this.enterprisePersonService.getAllInfoByPerson$(person.pk_id_person).subscribe(
          enterprise_laborals => this.allEnterprisePerson = enterprise_laborals
        )
      }),
      switchMap((person:Person) => this.enterprisePersonService.getActiveInfoByPerson$(person.pk_id_person)),
      tap((enterprise_person: EnterprisePerson) => {
        this.enterprisePerson = enterprise_person
      }),
      tap((enterprise_person: EnterprisePerson) => {
        this.laboralConditionService.getInfoByEnterprisePerson$(enterprise_person.pk_id_enterprise_person).subscribe(
          laboral_condition => this.laboralCondition = laboral_condition
        )
      }),
      tap((enterprise_person: EnterprisePerson) => {
        this.workerNewsService.getInfoByEnterprisePerson$(enterprise_person.pk_id_enterprise_person).subscribe(
          worker_news => this.workerNews = worker_news
        )
      }),
      tap((enterprise_person: EnterprisePerson) => {
        this.payingEmployeeService.getInfoByEnterprisePerson$(enterprise_person.pk_id_enterprise_person).subscribe(
          payments_employee => this.paymentsEmployee = payments_employee
        )
      })
    ).subscribe()
  }

  public getLaboralDetailByContract(id_contract: number){
    this.enterprisePersonService.show$(id_contract).pipe(
      tap((enterprise_person: EnterprisePerson) => {
        this.enterprisePerson = enterprise_person
      }),
      tap((enterprise_person: EnterprisePerson) => {
        this.laboralConditionService.getInfoByEnterprisePerson$(enterprise_person.pk_id_enterprise_person).subscribe(
          laboral_condition => this.laboralCondition = laboral_condition
        )
      }),
      tap((enterprise_person: EnterprisePerson) => {
        this.workerNewsService.getInfoByEnterprisePerson$(enterprise_person.pk_id_enterprise_person).subscribe(
          worker_news => this.workerNews = worker_news
        )
      }),
      tap((enterprise_person: EnterprisePerson) => {
        this.payingEmployeeService.getInfoByEnterprisePerson$(enterprise_person.pk_id_enterprise_person).subscribe(
          payments_employee => this.paymentsEmployee = payments_employee
        )
      })
    ).subscribe()
  }

  public inactiveContract(id: number){
    this.enterprisePersonService.inactivateContract$(id).pipe(
      tap(() => {
        this.enterprisePersonService.show$(id).subscribe(
          enterprise_person => this.enterprisePerson = enterprise_person
        )
      }),
      tap((enterprise_person: EnterprisePerson) => {
        this.enterprisePersonService.getAllInfoByPerson$(enterprise_person.fk_id_person).subscribe(
          enterprise_laborals => this.allEnterprisePerson = enterprise_laborals
        )
      }),
    ).subscribe(() => 
      {
        this.success = true;
        this.message = 'Se inactivo contrato correctamente.';
      }
    )
  }

  /**
   * inicio información personal
   */
  public loadPersonalParameters(){
    this.parameterService.getByCodeCategory$(this.type_id).subscribe(
      parameters => this.personalParametersList = parameters
    )
  }

  public updatePersonal(person:Person){
    this.personService.update$(person).subscribe(
      person => {
        this.person = person;
        this.success = true;
        this.message = 'Se actualizó información laboral, correctamente.';
      }
    )
  }

  /**
   * fin información personal
   */
  public loadContractParameters(){
    this.positionService.getByEnterpsie$(this.enterprisePerson.fk_id_enterprise).subscribe(
      position_list => this.positionsList = position_list
    )
  }

  public updateEnterprisePerson(enterprisePerson:EnterprisePerson)
  {
    this.enterprisePersonService.update$(enterprisePerson).subscribe(
      enterprise_person => {
        this.enterprisePersonService.getActiveInfoByPerson$(enterprise_person.fk_id_person).subscribe(
          enterprise_person => {
            this.enterprisePerson = enterprise_person;
            this.success = true;
            this.message = 'Se actualizó información de contrato, correctamente.';
          }
        )
      }
    )
  }

  /**
   * Condiciones laborales
   */
  public loadLaboralConditionParameters(){
    this.parameterService.getByMultipleCodeCategory$(this.categories).subscribe(
      parameters_list => this.laboralConditionParametersList = parameters_list
    )
  }

  
  public createLaboralCondition(laboralCondition:LaboralCondition)
  {
    this.laboralConditionService.create$(laboralCondition).subscribe(
      laboral_condition => {
        this.laboralConditionService.getInfoByEnterprisePerson$(laboral_condition.fk_id_enterprise_person).subscribe(
          laboral_condition => {
            this.laboralCondition = laboral_condition;
            this.success = true;
            this.message = 'Se creó información de condiciones laborales, correctamente.';
          }
        );
      }
    )
  }

  public updateLaboralCondition(laboralCondition:LaboralCondition)
  {
    this.laboralConditionService.update$(laboralCondition).subscribe(
      laboral_condition => {
        this.laboralConditionService.getInfoByEnterprisePerson$(laboral_condition.fk_id_enterprise_person).subscribe(
          laboral_condition => {
            this.laboralCondition = laboral_condition;
            this.success = true;
            this.message = 'Se actualizó información de condiciones laborales, correctamente.';
          }
        );
      }
    )
  }
/**
   * Información parámetros tipos de novedad
   */
  public loadWorkerNewsParameter(){
    this.parameterService.getByMultipleCodeCategory$(this.categories_news).subscribe(
      parameter_worker_new => {
        console.log(parameter_worker_new);
        this.workerNewsParameterList = parameter_worker_new;
      }
    )
  } 

  public createWorkerNews(worker_mews: WorkerNews){
    this.workerNewsService.create$(worker_mews).subscribe(
      () => this.workerNewsService.getInfoByEnterprisePerson$(this.enterprisePerson.pk_id_enterprise_person).subscribe(
        worker_news => {
          this.workerNews = worker_news;
          this.success = true;
          this.message = 'Se creó novedad para el trabajador.';
        }
      )
    )
  }
}