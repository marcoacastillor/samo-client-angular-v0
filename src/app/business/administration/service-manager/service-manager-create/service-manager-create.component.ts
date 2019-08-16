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

@Component({
  selector: 'app-service-manager-create',
  templateUrl: 'service-manager-create.component.html',
  styles: []
})
export class ServiceManagerCreateComponent implements OnInit {
  serviceEnterpriseForm: FormGroup;

  faThList = faThList;
  faSave = faSave;
  faCalendar = faCalendar;

  enterpriseList: Enterprise[] = [];
  servicesList: TypeService[] = [];
  stateList: Parameter[] = [];

  serviceSelected: TypeService = new TypeService;

  success = false;
  message = '';
  
  constructor(
    private fb: FormBuilder,
    private enterpriseService: EnterpriseService,
    private typeService: TypeServiceService,
    private formToolService: FormToolsService,
    private serviceEnterpriseService: ServiceEnterpriseService,
    private parameterService: ParameterService
  ) { }

  ngOnInit() {
    this.initForm();
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
      this.typeService.getBySizes$(enterprise.split(':')[2]).subscribe(
        lst_type_service => this.servicesList = lst_type_service
      )
    }
  }

  private initForm(){
    this.serviceEnterpriseForm = this.fb.group({
      pk_id_service_enterprise: [''],
      reference_enterprise: ['',Validators.required],
      type_service: ['',Validators.required],
      fk_id_type_service: ['',Validators.required],
      date_init_service: ['',Validators.required],
      date_end_service: [''],
      days_service: [''],
      state_service: ['',Validators.required],
      observation: ['']
    })
  }

  public onFindValuesByService(){
    let enterprise = (<HTMLInputElement>document.getElementById('typeServiceSelected')).value;
    if(enterprise.length > 0)
    {
      let serviceSelected = this.servicesList[enterprise];
      this.serviceSelected = serviceSelected;

      if(serviceSelected.type_service == 'MENSUAL'){
        this.serviceEnterpriseForm.patchValue(
          {
            days_service: 30,
            fk_id_type_service: serviceSelected.pk_id_service_enterprise
          }
        )
      }
      if(serviceSelected.type_service == 'ANUAL'){
        this.serviceEnterpriseForm.patchValue(
          {
            days_service: 365,
            fk_id_type_service: serviceSelected.pk_id_service_enterprise
          }
        )
      }
      if(serviceSelected.type_service == 'PROPIETARIO'){
        this.serviceEnterpriseForm.patchValue(
          {
            days_service: '',
            fk_id_type_service: serviceSelected.pk_id_service_enterprise
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
