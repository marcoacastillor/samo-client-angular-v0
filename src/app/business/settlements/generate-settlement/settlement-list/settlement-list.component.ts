import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CuttingPeriod } from 'src/app/shared/models/cutting-period';
import { CuttingPeriodService } from 'src/app/shared/services/cutting-period.service';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';

@Component({
  selector: 'app-settlement-list',
  templateUrl: 'settlement-list.component.html',
  styles: []
})
export class SettlementListComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faEye = faEye;
  faTrash = faTrash;

  user: User = new User;

  lstPeriods: CuttingPeriod[] = [];

  success = false;
  message = '';

  constructor(
    private globalStoreService: GlobalStoreService,
    private cuttingPeriodService: CuttingPeriodService
  ) { }

  ngOnInit() {
    this.user = this.globalStoreService.getUser();
    this.loadCuttingPeriodByEnterprise(this.user.fk_id_enterprise)
  }

  private loadCuttingPeriodByEnterprise(id:number){
    this.cuttingPeriodService.getAllByEnterprise$(id).subscribe(
      list_periods => this.lstPeriods = list_periods
    )
  }

}
