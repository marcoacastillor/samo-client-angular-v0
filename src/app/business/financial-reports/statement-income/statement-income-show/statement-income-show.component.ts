import { Component, OnInit } from '@angular/core';
import { Parameter } from 'src/app/shared/models/parameter';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FinancialReportService } from 'src/app/shared/services/financial-report.service';
import * as moment from 'moment';


@Component({
  selector: 'app-statement-income-show',
  templateUrl: 'statement-income-show.component.html',
  styles: []
})
export class StatementIncomeShowComponent implements OnInit {
  faSearch = faSearch;
  activeUser: User = new User;
  lstParameters: Parameter[] = [];
  report: any = null;

  from_date = '';
  to_date = '';

  constructor(
    private globalStoreService: GlobalStoreService,
    private financialReportService: FinancialReportService
    ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
  }

  public getDataByPeriod(forms:any){
    this.from_date = moment(forms.from_date).format('YYYY-MM-DD');
    this.to_date = moment(forms.to_date).format('YYYY-MM-DD');
    this.financialReportService.getResultsByPeriodAndEnterprise$(this.from_date,this.to_date,this.activeUser.fk_id_enterprise).subscribe(
      report => this.report = report
    )
  }
}
