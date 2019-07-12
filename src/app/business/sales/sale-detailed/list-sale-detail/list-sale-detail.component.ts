import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import { Operation } from 'src/app/shared/models/operation';
import { User } from 'src/app/shared/models/user';
import { OperationService } from 'src/app/shared/services/operation.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-sale-detail',
  templateUrl: 'list-sale-detail.component.html',
  styles: []
})
export class ListSaleDetailComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faEye = faEye;

  lstOrders: Operation[] = [];
  activeUser: User = new User();

  constructor(
    private operationService: OperationService,
    private globalStoreService: GlobalStoreService
  ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.getOrdersByEnterprise(this.activeUser.fk_id_enterprise);
  }

  private getOrdersByEnterprise(id_enterprise: number){
    this.operationService.getAllByTypeAndEnterprise$(environment.sales, id_enterprise).subscribe(
      lstOrders => this.lstOrders = lstOrders
    )
  }

}
