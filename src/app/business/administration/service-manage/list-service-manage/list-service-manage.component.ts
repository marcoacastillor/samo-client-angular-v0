import { Component, OnInit, Input } from '@angular/core';
import { ServiceEnterprise } from 'src/app/shared/models/service-enterprise';
import { faEye, faTrashAlt, faBan, faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-service-manage',
  templateUrl: 'list-service-manage.component.html',
  styles: []
})
export class ListServiceManageComponent implements OnInit {
  @Input() public serviceEnterpriseList: ServiceEnterprise[];

  faEye = faEye;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  fasFaBan = faBan;
  faPlusCircle = faPlusCircle;
  
  constructor() { }

  ngOnInit() {
  }

  public onNew() {
    console.log('llegó new..');
  }

  public viewServiceManage(pk_id_service_manage: number) {
    console.log('llegó view..');
  }

  public updateServiceManage(pk_id_service_manage: number) {
    console.log('llegó update..');
  }

  public deleteServiceManage(pk_id_service_manage: number) {
    console.log('llegó delete..');
  }

}
