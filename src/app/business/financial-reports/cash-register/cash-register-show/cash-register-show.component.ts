import { Component, OnInit } from '@angular/core';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { FinancialReportService } from 'src/app/shared/services/financial-report.service';
import { User } from 'src/app/shared/models/user';
import * as moment from 'moment';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-cash-register-show',
  templateUrl: 'cash-register-show.component.html',
  styles: []
})
export class CashRegisterShowComponent implements OnInit {
  report: any = null;
  activeUser: User = new User;

  actual_date = moment().format('YYYY-MM-DD');
  lstDates = [];

  constructor(
    private globalStoreService: GlobalStoreService,
    private financialReportService: FinancialReportService,
    ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.getDataByDateAndEnterprise(this.actual_date,this.activeUser.fk_id_enterprise);
    this.loadDates();
  }

  private loadDates(){
    let j = 0;
    for (let i = 5; i >= 0 ; i--) {
      this.lstDates[j] =  moment().add(-i,'days').format('YYYY-MM-DD');
      j++;
    }
  }

  private getDataByDateAndEnterprise(actual_date:string, id_enterprise:number){
    this.actual_date = actual_date;
    this.financialReportService.getCashFlowByDateAndEnterprise$(actual_date,id_enterprise).subscribe(
      report => this.report = report
    );
  }

  public getClassSelected(date_report:string){
    if(date_report == this.actual_date){
      return 'card border border-primary bg-success';
    }
    else{
      return 'card border border-primary';
    }
    
  }
}
