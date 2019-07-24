import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { environment } from 'src/environments/environment';

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
  //fk_id_enterprise: number = 0;
  enterprise: Enterprise = new Enterprise;
  
  constructor(
    private enterpriseService: EnterpriseService,
    private globalStoreService: GlobalStoreService
  ) { }

  ngOnInit() {
    this.loadAllOwners();
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
        this.enterpriseService.getByType$(environment.enterprise_provider).subscribe(
          list_owners => this.lstOwners = list_owners
        )   
      }
    )
  }

  public updateEnterprise(enterprise: Enterprise){
    this.enterpriseService.update$(enterprise).subscribe(
      () => {
        this.enterprise = new Enterprise;
        this.enterpriseService.getByType$(environment.enterprise_provider).subscribe(
          list_owners => this.lstOwners = list_owners
        )   
      }
    )
  }

  public deleteEnterprise(){
    this.enterpriseService.delete$(this.enterprise.pk_id_enterprise).subscribe(
      () => {
        this.enterpriseService.getByType$(environment.enterprise_provider).subscribe(
          list_owners => this.lstOwners = list_owners
        )   
      }
    )
  }

}
