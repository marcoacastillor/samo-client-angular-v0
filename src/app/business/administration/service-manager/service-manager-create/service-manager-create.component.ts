import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faThList, faSave, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { ServiceEnterpriseService } from 'src/app/shared/services/service-enterprise.service';
import { TypeServiceService } from 'src/app/shared/services/type-service.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { TypeService } from 'src/app/shared/models/type-service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { Parameter } from 'src/app/shared/models/parameter';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { ActivatedRoute } from '@angular/router';
import { ServiceEnterprise } from 'src/app/shared/models/service-enterprise';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-service-manager-create',
  templateUrl: 'service-manager-create.component.html',
  styles: []
})
export class ServiceManagerCreateComponent implements OnInit {
  serviceEnterpriseForm: FormGroup;
  id_enterprise_service = '';

  faThList = faThList;
  faSave = faSave;
  faCalendar = faCalendar;

  enterpriseList: Enterprise[] = [];
  servicesList: TypeService[] = [];
  stateList: Parameter[] = [];
  serviceEnterprise: ServiceEnterprise = new ServiceEnterprise;

  serviceSelected: TypeService = new TypeService;

  success = false;
  message = '';
  
  constructor(
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private enterpriseService: EnterpriseService,
    private typeService: TypeServiceService,
    private formToolService: FormToolsService,
    private serviceEnterpriseService: ServiceEnterpriseService,
    private parameterService: ParameterService
  ) { }

  ngOnInit() {
    this.initForm();
    let id = this.activateRoute.snapshot.params['id']
    this.id_enterprise_service = id;
    if(id == 'new'){
      this.serviceEnterprise = new ServiceEnterprise();
    }
    else{
      this.serviceEnterpriseService.show$(parseInt(id)).pipe(
        tap((serviceEnterprise:ServiceEnterprise) => this.loadTypeServiceBySize(serviceEnterprise.reference_enterprise.split(':')[2])),
        tap((serviceEnterprise:ServiceEnterprise) => this.serviceEnterprise = serviceEnterprise),
        tap(() => this.initForm())
      ).subscribe()
    }
    this.loadEnterpriseOwners();
    this.loadParameters();
  }

  private loadParameters(){
    this.parameterService.getByCodeCategory$(environment.state_service).subscribe(
      lst_states => this.stateList = lst_states
    )
  }

  private loadEnterpriseOwners(){
    this.enterpriseService.getAllByType$(environment.enterprise_owner).subscribe(
      lst_enterprise => this.enterpriseList = lst_enterprise
    )
  }

  loadServiceByEnterprise(){
    let enterprise = (<HTMLInputElement>document.getElementById('enterpriseSelected')).value;
    if(enterprise.length > 0)
    {
      this.loadTypeServiceBySize(enterprise.split(':')[2]);
    }
  }

  private loadTypeServiceBySize(size:string){
    this.typeService.getBySizes$(size).subscribe(
      lst_type_service => this.servicesList = lst_type_service
    )
  }

  private initForm(){
    this.serviceEnterpriseForm = this.fb.group({
      pk_id_service_enterprise: [this.serviceEnterprise.pk_id_service_enterprise],
      reference_enterprise: [this.serviceEnterprise.reference_enterprise,Validators.required],
      fk_id_type_service: [this.serviceEnterprise.fk_id_type_service,Validators.required],
      date_init_service: [this.serviceEnterprise.date_init_service,Validators.required],
      date_end_service: [this.serviceEnterprise.date_end_service],
      days_service: [this.serviceEnterprise.days_service],
      state_service: [this.serviceEnterprise.state_service,Validators.required],
      balance_service: [this.serviceEnterprise.balance_service,Validators.required],
      observation: [this.serviceEnterprise.observation]
    })
  }

  private getTypeService(id:number){
    const resultado = this.servicesList.filter( type_service => type_service.pk_id_type_service === id);
    this.serviceSelected = resultado[0];
  }

  public onFindValuesByService(){
    let id_type_service = (<HTMLInputElement>document.getElementById('typeServiceSelected')).value;
    if(id_type_service.length > 0)
    {
      this.getTypeService(parseInt(id_type_service));
      if(this.serviceSelected.type_service == 'MENSUAL'){
        this.serviceEnterpriseForm.patchValue(
          {
            days_service: 30,
            balance_service: this.serviceSelected.value_service
          }
        )
      }
      if(this.serviceSelected.type_service == 'ANUAL'){
        this.serviceEnterpriseForm.patchValue(
          {
            days_service: 365,
            balance_service: this.serviceSelected.value_service
          }
        )
      }
      if(this.serviceSelected.type_service == 'PROPIETARIO'){
        this.serviceEnterpriseForm.patchValue(
          {
            days_service: 36500,
            balance_service: this.serviceSelected.value_service
          }
        )
      }
    }
  }

  public saveServiceEnterprise(){
    this.serviceEnterpriseForm.patchValue({
      date_init_service: moment(this.serviceEnterpriseForm.value.date_init_service).format('YYYY-MM-DD')
    })
    this.serviceEnterpriseService.store$(this.serviceEnterpriseForm.value).subscribe(
      () => {
        this.success = true;
        this.message = 'Se crea un registro correctamente';
        this.serviceEnterpriseForm.reset();
        this.serviceSelected = new TypeService;
      }
    )
  }

  updateServiceEnterprise(){
    this.serviceEnterpriseForm.patchValue({
      date_init_service: moment(this.serviceEnterpriseForm.value.date_init_service).format('YYYY-MM-DD')
    })
    this.serviceEnterpriseService.update$(this.serviceEnterpriseForm.value).subscribe(
      () => {
        this.success = true;
        this.message = 'Se actualiza el registro correctamente';
      }
    )
  }

  /**
  * Funciones para verificar si los formularios son obligatorios o no.
  */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.serviceEnterpriseForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.serviceEnterpriseForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.serviceEnterpriseForm, controlName, errorCode);
  }

}
