import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { faPlusCircle, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Operation } from 'src/app/shared/models/operation';
import { User } from 'src/app/shared/models/user';
import { OperationService } from 'src/app/shared/services/operation.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-order-detail',
  templateUrl: 'list-order-detail.component.html',
  styles: []
})
export class ListOrderDetailComponent implements OnInit {
  faSearch = faSearch;
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
    this.operationService.getAllByTypeAndEnterprise$(environment.purchase, id_enterprise).subscribe(
      lstOrders => this.lstOrders = lstOrders
    )
  }
}
