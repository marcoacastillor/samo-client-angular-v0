import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { tap } from 'rxjs/operators';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/shared/services/person.service';
import { ParameterConfig } from 'src/app/shared/models/parameter-config';
import { ParameterConfigService } from 'src/app/shared/services/parameter-config.service';
import { PositionService } from 'src/app/shared/services/position.service';
import { Position } from 'src/app/shared/models/position';
import { faUserTag, faUserCheck, faCogs, faWrench, faEye, faEdit, faTrash, faIndustry, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { Parameter } from 'src/app/shared/models/parameter';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/shared/models/employee';

@Component({
  selector: 'app-enterprise-show',
  templateUrl: 'enterprise-show.component.html',
  styles: []
})
export class EnterpriseShowComponent implements OnInit {
  faEye = faEye;
  faTrash= faTrash;
  faUserTag = faUserTag;
  faUserCheck = faUserCheck;
  faCogs = faCogs;
  faWrench = faWrench;
  faEdit = faEdit;
  faIndustry = faIndustry;
  faAddressCard = faAddressCard;
  
  user: User = new User;
  enterprise: Enterprise = new Enterprise;
  position: Position = new Position;
  parameterConfig: ParameterConfig = new ParameterConfig;
  employee: any = new Person;

  lstEmployee: Person[] = [];
  lstParametersConfig: ParameterConfig[] = [];
  lstPositions: Position[] = [];

  lstParametersEnterprise: Parameter[] = [];
  lstParametersEmployee:Parameter[] = [];

  //parametros para empresas
  regimen    = environment.regimen;
  size       = environment.size_enterprise;
  
  categories      = {'categories' : [this.regimen,this.size]};

  //tipos para trabajador
  type_id = environment.type_ids;
  categories_employee      = {'categories' : [this.type_id]};

  success = false;
  message = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private globalStoreService: GlobalStoreService,
    private enterpriseService: EnterpriseService,
    private personService: PersonService,
    private parameterConfigService: ParameterConfigService,
    private positionService: PositionService,
    private parameterService: ParameterService
    ) { }

  ngOnInit() {
    if(this.activateRoute.snapshot.params['id'] == 'owner'){
      this.user = this.globalStoreService.getUser();
      this.loadInfoByEnterprise(this.user.fk_id_enterprise);
    }
    else{
      this.loadInfoByEnterprise(this.activateRoute.snapshot.params['id']);
    }
  }

  private loadInfoByEnterprise(id_enterprise: number){
    this.enterpriseService.show$(id_enterprise).pipe(
      tap((enterprise: Enterprise) => { 
        this.enterprise = enterprise; 
      }),
      tap((enterprise: Enterprise) => {
        this.personService.getActiveEmployeesByEnterprise$(enterprise.pk_id_enterprise).subscribe(
          persons => this.lstEmployee = persons
        )
      }),
      tap((enterprise:Enterprise) => {
        this.parameterConfigService.getByEnterprise$(enterprise.pk_id_enterprise).subscribe(
          parameters => this.lstParametersConfig = parameters
        )
      }),
      tap((enterprise:Enterprise) => {
        this.positionService.getByEnterpsie$(enterprise.pk_id_enterprise).subscribe(
          positions => this.lstPositions = positions
        )
      })
    ).subscribe()
  }

  /**
   * funciones para empresa
   */
  public loadParametersEnterprise(){
    this.success = false;
    this.parameterService.getByMultipleCodeCategory$(this.categories).subscribe(
      parameters => this.lstParametersEnterprise = parameters
    )
  }

  public updateEnterprise(enterprise: Enterprise){
    this.enterpriseService.update$(enterprise).subscribe(
      enterprise => {
        this.enterprise = enterprise;
        this.success = true;
        this.message = 'Se actualizó información de emrpresa, satisfactoriamente.';
      }
    )
  }

  /**
   * funciones para empresa
   */
  public newPosition(){
    this.position = new Position;
  }

  public selectPosition(position:Position){
    this.position = position
  }

  public updatePosition(position:Position){
    this.positionService.update$(position).subscribe(
      () => {
        this.positionService.getByEnterpsie$(this.enterprise.pk_id_enterprise).subscribe(
          positions => {
            this.success = true;
            this.lstPositions = positions;
            this.message = 'Se actualiza un cargo, satisfactoriamente.';
          }
        )
      }
    )
  }

  public createPosition(position:Position){
    this.positionService.store$(position).subscribe(
      () => {
        this.positionService.getByEnterpsie$(this.enterprise.pk_id_enterprise).subscribe(
          positions => {
            this.success = true;
            this.lstPositions = positions;
            this.message = 'Se crea un cargo, satisfactoriamente.';
          }
        )
      }
    )
  }

  public deletePosition(){
    this.positionService.delete$(this.position.pk_id_position).subscribe(
      () => {
        this.positionService.getByEnterpsie$(this.enterprise.pk_id_enterprise).subscribe(
          positions => {
            this.success = true;
            this.lstPositions = positions;
            this.message = 'Se elimina un cargo, satisfactoriamente.';
          }
        )
      }
    )
  }

  /**
   * Funciones parámetros de empresa
   */
  public selectParameter(parameter: ParameterConfig){
    this.parameterConfig = parameter
  }

  public createParametersConfig(){
    this.parameterConfigService.createAllsParamsBytype$(environment.parameters_enterprises, this.enterprise.pk_id_enterprise).subscribe(
      () => {
        this.parameterConfigService.getByEnterprise$(this.enterprise.pk_id_enterprise).subscribe(
          parameters => {
            this.lstParametersConfig = parameters;
            this.success = true;
            this.message = 'Se crean parámetros, satisfactoriamente.';
          })
      }
    )
  }

  public updateParameterConfig(parameter: ParameterConfig){
    this.parameterConfigService.update$(parameter).subscribe(
      () => {
        this.parameterConfigService.getByEnterprise$(this.enterprise.pk_id_enterprise).subscribe(
        parameters => {
          this.lstParametersConfig = parameters;
          this.success = true;
          this.message = 'Se actualiza valor del parámetro, satisfactoriamente.';
        })
      }
    )
  }

  /**
   * Funciones parámetros de empleado
   */
  public loadParametersEmployee(){
    this.employee = new Employee;
    this.parameterService.getByMultipleCodeCategory$(this.categories_employee).pipe(
      tap((parametersLst: Parameter[]) => {
         this.lstParametersEmployee = parametersLst
      }),
    ).subscribe()
  }

  public selectEmployee(employee: any){
    this.employee = employee;
  }

  public saveEmployee(laboralInfo: any){
    this.personService.createEmployee$(laboralInfo).subscribe(
      () => {
        this.personService.getEmployeesByEnterprise$(this.enterprise.pk_id_enterprise).subscribe(
          employees => {
            this.lstEmployee = employees;
            this.success = true;
            this.message = 'Se crea correctamente el empleado';
          }
        )
      }
    )
  }

  public deleteEmployee(){
    this.personService.deleteLaboralInfo$(this.employee.pk_id_person).subscribe(
      () => {
        this.personService.getEmployeesByEnterprise$(this.enterprise.pk_id_enterprise).subscribe(
          employees => {
            this.success = true;
            this.lstEmployee = employees;
            this.message = 'Se elimina un trabajador, satisfactoriamente.';
          }
        )
      }
    )
  }

  public updateEmployee(laboralInfo:any){
    this.personService.updateEmployee$(laboralInfo).subscribe(
      () => {
        this.personService.getEmployeesByEnterprise$(this.enterprise.pk_id_enterprise).subscribe(
          employees => {
            this.success = true;
            this.lstEmployee = employees;
            this.message = 'Se actualiza un trabajador, satisfactoriamente.';
          }
        )
      }
    )
  }
}
