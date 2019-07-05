import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Operation } from 'src/app/shared/models/operation';
import { OperationService } from 'src/app/shared/services/operation.service';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-order-detail',
  templateUrl: 'main-order-detail.component.html',
  styles: []
})
export class MainOrderDetailComponent implements OnInit {
  list = true;
  show = false;
  new = false;

  operation: Operation = new Operation();
  lstOrders: Operation[] = [];
  activeUser: User = new User();
  fk_id_enterprise = 0;
  
  constructor(
    private utilService: UtilsService,
    private operationService: OperationService,
    private globalStoreService: GlobalStoreService
  ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.fk_id_enterprise = this.activeUser.fk_id_enterprise;
    this.getOrdersByEnterprise();
  }

  //Obtiene listado de ordenes de compra por empresa
  private getOrdersByEnterprise(){
    this.operationService.getAllByTypeAndEnterprise$(environment.purchase, this.fk_id_enterprise).subscribe(
      lstOrders => this.lstOrders = lstOrders
    )
  }

  onViewList(flag: boolean){
    this.list = flag;
    this.show = false;
    this.new = false;
  }

  onSelectOrder(operation: Operation){
    this.operation = operation;
    if(operation.pk_id_operation){
      this.show = true;
      this.list = false;
      this.new = false;
    }
    else{
      this.new = true;
      this.show = false;
      this.list = false;
    }
  }



/*
* ------------------------------------------
* Funciones visualización
* ------------------------------------------
*/
public getClassList() {
  return this.utilService.getClassList(this.list);
}

public getClassShow() {
  return this.utilService.getClassShow(this.show);
}

public getClassNew() {
  return this.utilService.getClassShow(this.new);
}

}
