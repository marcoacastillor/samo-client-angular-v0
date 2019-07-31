import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { environment } from 'src/environments/environment';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { Parameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-provider-list',
  templateUrl: 'provider-list.component.html',
  styles: []
})
export class ProviderListComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;

  lstProviders: Enterprise[] = [];
  activeUser: User = new User;
  fk_id_enterprise: number = 0;
  enterprise: Enterprise = new Enterprise;

  parameterList: Parameter[] = [];
  
  constructor(
    private enterpriseService: EnterpriseService,
    private globalStoreService: GlobalStoreService,
    private parameterService: ParameterService
  ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.loadAllProviders();
  }

  private loadAllProviders(){
    this.fk_id_enterprise = this.activeUser.fk_id_enterprise;
    this.enterpriseService.getByType$(environment.enterprise_provider).subscribe(
      list_providers => this.lstProviders = list_providers
    )
  }

  public selectEnterprise(enterprise:Enterprise){
    this.enterprise = enterprise
  }

  public createEnterprise(enterprise: Enterprise){
    this.enterpriseService.store$(enterprise).subscribe(
      () => {
        this.enterprise = new Enterprise;
        this.enterpriseService.getByType$(environment.enterprise_provider).subscribe(
          list_providers => this.lstProviders = list_providers
        )   
      }
    )
  }

  public updateEnterprise(enterprise: Enterprise){
    this.enterpriseService.update$(enterprise).subscribe(
      () => {
        this.enterprise = new Enterprise;
        this.enterpriseService.getByType$(environment.enterprise_provider).subscribe(
          list_providers => this.lstProviders = list_providers
        )   
      }
    )
  }

  public deleteEnterprise(){
    this.enterpriseService.delete$(this.enterprise.pk_id_enterprise).subscribe(
      () => {
        this.enterpriseService.getByType$(environment.enterprise_provider).subscribe(
          list_providers => this.lstProviders = list_providers
        )   
      }
    )
  }

  public loadParametersEnterprise(){
    this.parameterService.getByCodeCategory$(environment.regimen).subscribe(
      lst_parameters => this.parameterList = lst_parameters
    )
  }

}
