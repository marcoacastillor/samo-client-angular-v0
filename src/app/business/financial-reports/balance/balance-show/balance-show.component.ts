import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/models/user';
import { Parameter } from 'src/app/shared/models/parameter';
import { environment } from 'src/environments/environment';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { FinancialReportService } from 'src/app/shared/services/financial-report.service';
import * as moment from 'moment';

@Component({
  selector: 'app-balance-show',
  templateUrl: 'balance-show.component.html',
  styles: []
})
export class BalanceShowComponent implements OnInit {
  reportForm: FormGroup;
  faSearch = faSearch;
  faCalendar = faCalendar;

  activeUser: User = new User;
  lstParameters: Parameter[] = [];
  report: any = null;

  public dateInit: string;
  public dateEnd: string;
  public consolidate_day: number = environment.consolidate_day;

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
    this.financialReportService.getBalanceByPeriodAndEnterprise$(this.from_date,this.to_date,this.activeUser.fk_id_enterprise).subscribe(
      report => this.report = report
    )
  }
}
