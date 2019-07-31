import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { environment } from 'src/environments/environment';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { Parameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-owner-list',
  templateUrl: 'owner-list.component.html',
  styles: []
})
export class OwnerListComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;

  lstOwners: Enterprise[] = [];
  enterprise: Enterprise = new Enterprise;

  parameterList: Parameter[] = [];

  success = false;
  message = '';
  
  constructor(
    private enterpriseService: EnterpriseService,
    private globalStoreService: GlobalStoreService,
    private parameterService: ParameterService
  ) { }

  ngOnInit() {
    this.loadAllOwners();
  }

  public newEnterprise(){
    this.enterprise = new Enterprise;
  }

  private loadAllOwners(){
    this.enterpriseService.getByType$(environment.enterprise_owner).subscribe(
      list_owners => this.lstOwners = list_owners
    )
  }

  public selectEnterprise(enterprise:Enterprise){
    this.enterprise = enterprise
  }

  public createEnterprise(enterprise: Enterprise){
    this.enterpriseService.store$(enterprise).subscribe(
      () => {
        this.enterprise = new Enterprise;
        this.enterpriseService.getByType$(environment.enterprise_owner).subscribe(
          list_owners => {
            this.lstOwners = list_owners;
            this.success = true;
            this.message = 'Se crea empresa satisfactoriamente.';
          }
        )   
      }
    )
  }

  public updateEnterprise(enterprise: Enterprise){
    this.enterpriseService.update$(enterprise).subscribe(
      () => {
        this.enterprise = new Enterprise;
        this.enterpriseService.getByType$(environment.enterprise_owner).subscribe(
          list_owners => {
            this.lstOwners = list_owners;
            this.success = true;
            this.message = 'Se actualiza empresa satisfactoriamente.';
          }
        )   
      }
    )
  }

  public deleteEnterprise(){
    this.enterpriseService.delete$(this.enterprise.pk_id_enterprise).subscribe(
      () => {
        this.enterpriseService.getByType$(environment.enterprise_owner).subscribe(
          list_owners => {
            this.lstOwners = list_owners;
            this.success = true;
            this.message = 'Se elimina empresa satisfactoriamente.';
          }
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
