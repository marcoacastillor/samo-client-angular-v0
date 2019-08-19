import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEye, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
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
  faTrash = faTrash;
  faEdit = faEdit;

  success = false;
  message = '';

  lstClients: ServiceEnterprise[] = [];
  selectedObject: ServiceEnterprise = new ServiceEnterprise;

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

  public onSelect(serviceEnterprise: ServiceEnterprise){
    this.selectedObject = serviceEnterprise;
  }

  public deleteObject(){
    this.serviceEnterprise.delete$(this.selectedObject.pk_id_service_enterprise).subscribe(
      () => {
        this.loadEnterpriseClient();
        this.success = true;
        this.message = 'Se elimina el registro correctamente';
      }
    )
  }

}
