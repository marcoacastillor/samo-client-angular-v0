import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import { ServiceEnterpriseService } from 'src/app/shared/services/service-enterprise.service';
import { ServiceEnterprise } from 'src/app/shared/models/service-enterprise';

@Component({
  selector: 'app-service-manager-list',
  templateUrl: 'service-manager-list.component.html',
  styles: []
})
export class ServiceManagerListComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faEye = faEye;

  lstClients: ServiceEnterprise[] = [];

  constructor(
    private serviceEnterprise: ServiceEnterpriseService
  ) { }

  ngOnInit() {
    this.loadEnterpriseClient();
  }

  private loadEnterpriseClient(){
    this.serviceEnterprise.getAll$().subscribe(
      lst_enterprises => this.lstClients = lst_enterprises
    )
  }

}
