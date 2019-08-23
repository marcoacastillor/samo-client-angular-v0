import { Component, OnInit } from '@angular/core';
import { Parameter } from 'src/app/shared/models/parameter';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FinancialReportService } from 'src/app/shared/services/financial-report.service';
import * as moment from 'moment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';


@Component({
  selector: 'app-statement-income-show',
  templateUrl: 'statement-income-show.component.html',
  styles: []
})
export class StatementIncomeShowComponent implements OnInit {
  reportForm: FormGroup;

  faSearch = faSearch;
  faCalendar = faCalendar;

  activeUser: User = new User;
  lstParameters: Parameter[] = [];
  report: any = null;

  public dateInit: string;
  public dateEnd: string;
  public consolidate_day: number = environment.consolidate_day;

  constructor(
    private globalStoreService: GlobalStoreService,
    private financialReportService: FinancialReportService,
    private formToolService: FormToolsService,
    private fb: FormBuilder,
    ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.dateEnd = moment().add().format('YYYY-MM-DD');
    this.dateInit = moment().add(-this.consolidate_day,'days').format('YYYY-MM-DD');
    this.initUpdForm(this.dateInit,this.dateEnd);
    this.getDataByPeriod();
  }

  public getDataByPeriod(){
    this.financialReportService.getResultsByPeriodAndEnterprise$(moment(this.reportForm.value.from_date).format('YYYY-MM-DD'),moment(this.reportForm.value.to_date).format('YYYY-MM-DD'),this.activeUser.fk_id_enterprise).subscribe(
      report => this.report = report
    )
  }

  private initUpdForm(dateInit: string, dateEnd: string) {
    this.reportForm = this.fb.group({
      from_date: [dateInit],
      to_date: [dateEnd],
    });
  }

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.reportForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.reportForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.reportForm, controlName, errorCode);
  }
}
