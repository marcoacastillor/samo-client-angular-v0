import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
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
  faSearch = faSearch;

  lastkeydown1 = 0;

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

  public getOrdersByEnterprise(id_enterprise: number){
    this.operationService.getAllByTypeAndEnterprise$(environment.sales, id_enterprise).subscribe(
      lstOrders => this.lstOrders = lstOrders
    )
  }

  onFindOderByProvider(filter: any){
    let nameProvider = (<HTMLInputElement>document.getElementById('nameProvider')).value;
    this.lstOrders = [];
    
    if (nameProvider.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.operationService.getByNameProviderAndTypeAndEnterprise$(nameProvider,environment.sales,this.activeUser.fk_id_enterprise).subscribe(
          lst_orders => {
            this.lstOrders = lst_orders;
          }
        )
      }
    }
    else{
      this.getOrdersByEnterprise(this.activeUser.fk_id_enterprise);
    }
  }

  onFindOrderByDate(filter: any){
    let dateOperation = (<HTMLInputElement>document.getElementById('dateOperation')).value;
    this.lstOrders = [];
    
    if (dateOperation.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.operationService.getByDateOperationAndTypeAndEnterprise$(dateOperation,environment.sales,this.activeUser.fk_id_enterprise).subscribe(
          lst_orders => {
            this.lstOrders = lst_orders;
          }
        )
      }
    }
    else{
      this.getOrdersByEnterprise(this.activeUser.fk_id_enterprise);
    }
  }

  onFindOrderByPaymentType(filter: any){
    let paymentType = (<HTMLInputElement>document.getElementById('paymentType')).value;
    this.lstOrders = [];
    
    if (paymentType.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.operationService.getByPaymentTypeAndTypeAndEnterprise$(paymentType,environment.sales,this.activeUser.fk_id_enterprise).subscribe(
          lst_orders => {
            this.lstOrders = lst_orders;
          }
        )
      }
    }
    else{
      this.getOrdersByEnterprise(this.activeUser.fk_id_enterprise);
    }
  }

  onFindOderByNumberInvoice(filter: any){
    let numberInvoice = (<HTMLInputElement>document.getElementById('numberInvoice')).value;
    this.lstOrders = [];
    
    if (numberInvoice.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.operationService.getByNumberInvoiceTypeAndTypeAndEnterprise$(numberInvoice,environment.sales,this.activeUser.fk_id_enterprise).subscribe(
          lst_orders => {
            this.lstOrders = lst_orders;
          }
        )
      }
    }
    else{
      this.getOrdersByEnterprise(this.activeUser.fk_id_enterprise);
    }
  }

}
